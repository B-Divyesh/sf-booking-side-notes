import './styles.css';
import { dailyBrief, eventDateKey, formatDay, formatTime, localDateKey, parseIcs, validateImport, type AppData, type CalendarEvent, type ReminderStatus, type SideNote } from './domain';
import { loadData, saveData } from './db';
import { captureLicenseFromUrl, checkoutUrl, initialLicenseState, restoreLicense, verifyLicense, type LicenseState } from './license';

const app = document.querySelector<HTMLDivElement>('#app')!;
let data: AppData = { version: 1, events: [], notes: [] };
let selectedDate = new URL(location.href).searchParams.get('day') === 'today'
  ? localDateKey()
  : localDateKey();
let editingId: string | null = null;
let license: LicenseState = initialLicenseState(captureLicenseFromUrl());
let pendingMessage = '';
let updatingApp = false;
const quickPhrases = ['Call back', 'Confirm access details', 'Check supplier timing', 'Send follow-up'];

const esc = (value: string | undefined) => (value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]!);
const uid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function eventsForDay(): CalendarEvent[] {
  return data.events.filter((event) => eventDateKey(event) === selectedDate).sort((a, b) => a.start.localeCompare(b.start));
}

function notesForDay(): SideNote[] {
  return data.notes.filter((note) => note.date === selectedDate).sort((a, b) => {
    if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
    return (a.anchorTime || '99:99').localeCompare(b.anchorTime || '99:99');
  });
}

function eventName(id?: string): string {
  return data.events.find((event) => event.id === id)?.summary ?? '';
}

function appointmentMarkup(event: CalendarEvent): string {
  const noteCount = notesForDay().filter((note) => note.eventId === event.id).length;
  return `<li class="appointment">
    <div class="time-rail" aria-hidden="true"></div>
    <div class="appointment-time"><time datetime="${esc(event.start)}">${esc(formatTime(event.start))}</time>${event.end ? `<span>to ${esc(formatTime(event.end))}</span>` : ''}</div>
    <div class="appointment-copy">
      <h3>${esc(event.summary)}</h3>
      ${event.location ? `<p class="location"><span aria-hidden="true">⌖</span> ${esc(event.location)}</p>` : ''}
      <p class="note-count">${noteCount} side ${noteCount === 1 ? 'note' : 'notes'} · does not block time</p>
    </div>
    <button class="button ghost compact add-for-event" data-event-id="${esc(event.id)}">Add side note<span class="sr-only"> for ${esc(event.summary)}</span></button>
  </li>`;
}

function noteMarkup(note: SideNote, index: number): string {
  const linked = eventName(note.eventId);
  const reminderLabel = note.reminder === 'due' ? 'Reminder due' : note.reminder === 'acknowledged' ? 'Reminder sent' : '';
  return `<li class="note-card ${note.completed ? 'is-complete' : ''}">
    <label class="check-wrap">
      <input class="note-check" data-note-id="${note.id}" type="checkbox" ${note.completed ? 'checked' : ''}>
      <span class="custom-check" aria-hidden="true"></span>
      <span class="sr-only">Mark “${esc(note.text)}” ${note.completed ? 'not done' : 'done'}</span>
    </label>
    <span class="map-pin" aria-hidden="true"><span>${index + 1}</span></span>
    <div class="note-body">
      <div class="note-meta">
        <span>${esc(note.anchorTime || 'Any time')}</span>
        ${linked ? `<span>${esc(linked)}</span>` : '<span>General</span>'}
        ${reminderLabel ? `<button class="reminder-status status-${note.reminder}" data-reminder-id="${note.id}" title="Change reminder status">${reminderLabel}</button>` : ''}
      </div>
      <p>${esc(note.text)}</p>
      <span class="completion-label">${note.completed ? 'Done' : 'Open'}</span>
    </div>
    <div class="note-actions">
      <button class="icon-button edit-note" data-note-id="${note.id}" aria-label="Edit ${esc(note.text)}" title="Edit note">✎</button>
      <button class="icon-button delete-note" data-note-id="${note.id}" aria-label="Delete ${esc(note.text)}" title="Delete note">×</button>
    </div>
  </li>`;
}

function render(): void {
  const dayEvents = eventsForDay();
  const dayNotes = notesForDay();
  const openCount = dayNotes.filter((note) => !note.completed).length;
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="/" aria-label="Booking Side Notes home">
        <img src="/assets/app-mark.svg" width="40" height="40" alt="">
        <span>Booking Side Notes</span>
      </a>
      <div class="header-status">
        <span id="network-state" class="network-state"><span aria-hidden="true">●</span> ${navigator.onLine ? 'On device' : 'Offline · on device'}</span>
        <button class="button ghost compact" id="jump-data">Data &amp; license</button>
      </div>
    </header>
    <main id="main">
      <section class="hero" aria-labelledby="page-title">
        <div class="hero-copy">
          <p class="eyebrow">A field map for the working day</p>
          <h1 id="page-title">Keep the note.<br><em>Keep the slot open.</em></h1>
          <p class="lede">Import appointments, pin the operational details beside them, and stay bookable. Nothing here changes your calendar availability.</p>
          <div class="hero-proof"><span aria-hidden="true">✓</span><strong>Local by default</strong> — client details stay in this browser.</div>
        </div>
        <figure class="hero-art">
          <picture>
            <source type="image/avif" srcset="/assets/hero-map-480.avif 480w, /assets/hero-map.avif 960w" sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 900px) 48vw, 540px">
            <source type="image/webp" srcset="/assets/hero-map-480.webp 480w, /assets/hero-map.webp 960w" sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 900px) 48vw, 540px">
            <img src="/assets/hero-map.jpg" width="960" height="640" alt="Topographic paper map with orange note flags placed beside an uninterrupted teal route" fetchpriority="high" decoding="async">
          </picture>
          <figcaption>Appointments are the route. Side notes are the flags.</figcaption>
        </figure>
      </section>

      <section class="day-tools" aria-label="Day controls">
        <div class="date-field">
          <label for="day-picker">Working day</label>
          <input id="day-picker" type="date" value="${selectedDate}">
        </div>
        <div class="tool-actions">
          <label class="button secondary file-button" for="ics-file">Import calendar <span class="file-kind">.ics</span></label>
          <input class="visually-hidden-file" id="ics-file" type="file" accept=".ics,text/calendar">
          <button class="button primary" id="add-note">+ Add side note</button>
        </div>
      </section>

      <div class="capacity-banner" role="note">
        <span class="capacity-zero">0</span>
        <span><strong>minutes blocked</strong><br>by ${dayNotes.length} side ${dayNotes.length === 1 ? 'note' : 'notes'}</span>
        <span class="capacity-rule" aria-hidden="true"></span>
        <span>${openCount} open ${openCount === 1 ? 'action' : 'actions'}</span>
      </div>

      <section class="workspace" aria-label="Daily workspace">
        <section class="route-panel" aria-labelledby="route-title">
          <div class="section-heading">
            <div><p class="map-label">Route / ${selectedDate.replaceAll('-', '·')}</p><h2 id="route-title">${esc(formatDay(selectedDate))}</h2></div>
            <span class="count-stamp">${dayEvents.length} ${dayEvents.length === 1 ? 'booking' : 'bookings'}</span>
          </div>
          ${dayEvents.length ? `<ol class="appointment-list">${dayEvents.map(appointmentMarkup).join('')}</ol>` : `
            <div class="empty-state">
              <div class="empty-contours" aria-hidden="true"><span></span><span></span><span></span></div>
              <p class="empty-kicker">Uncharted day</p>
              <h3>No appointments imported for this date</h3>
              <p>Choose an ICS file from your calendar. We retain only the appointment name, time, and location on this device.</p>
              <label class="button secondary" for="ics-file">Choose an ICS file</label>
            </div>`}
        </section>

        <section class="notes-panel" aria-labelledby="notes-title">
          <div class="section-heading">
            <div><p class="map-label">Margin ledger</p><h2 id="notes-title">Side notes</h2></div>
            <span class="count-stamp warm">${openCount} open</span>
          </div>
          ${license.unlocked ? `<div class="quick-strip" aria-label="Trail Kit quick phrases"><span>Quick pin:</span>${quickPhrases.map((phrase) => `<button data-quick="${esc(phrase)}">${esc(phrase)}</button>`).join('')}</div>` : ''}
          ${dayNotes.length ? `<ol class="note-list">${dayNotes.map(noteMarkup).join('')}</ol>` : `
            <div class="empty-state notes-empty">
              <span class="large-pin" aria-hidden="true">+</span>
              <h3>The margin is clear</h3>
              <p>Add a callback, access detail, follow-up, or delay. It will be anchored to the day without occupying a booking slot.</p>
              <button class="button primary" id="empty-add-note">Add the first side note</button>
            </div>`}
        </section>
      </section>

      <section class="brief-actions" aria-labelledby="brief-title">
        <div><p class="map-label">End-of-day sheet</p><h2 id="brief-title">Take the route with you</h2><p>Print a clean daily brief or save a plain-text copy. Data export is always free.</p></div>
        <div class="tool-actions"><button class="button secondary" id="print-brief">Print daily brief</button><button class="button secondary" id="export-brief">Export daily brief</button></div>
      </section>

      <section class="data-section" id="data-license" aria-labelledby="data-title">
        <div class="data-column">
          <p class="map-label">Local archive</p><h2 id="data-title">Your data, in your hands</h2>
          <p>Back up or move every imported appointment and note as one JSON file. Importing a backup replaces the data on this device only after confirmation.</p>
          <div class="tool-actions"><button class="button ghost" id="export-data">Export all data</button><label class="button ghost file-button" for="json-file">Import backup</label><input class="visually-hidden-file" id="json-file" type="file" accept="application/json,.json"></div>
        </div>
        <div class="license-card ${license.unlocked ? 'is-unlocked' : ''}">
          <p class="license-tag">Trail Kit · $12 once</p>
          <h2>${license.unlocked ? 'Trail Kit unlocked' : 'Pin routine notes faster'}</h2>
          <p>${license.unlocked ? 'Quick phrases are ready above your side-note ledger.' : 'Unlock one-tap phrases for callbacks, access checks, suppliers, and follow-ups. The complete note workflow, print, and exports stay free.'}</p>
          ${license.notice ? `<p class="license-notice">${esc(license.notice)}</p>` : ''}
          ${license.unlocked ? '<span class="unlocked-mark">✓ Active on this device</span>' : `<a class="button primary" href="${checkoutUrl()}">Buy Trail Kit — $12</a>`}
          <details>
            <summary>Have a license? Restore it</summary>
            <form id="license-form"><label for="license-token">License token</label><div class="license-row"><input id="license-token" required autocomplete="off"><button class="button secondary" type="submit">Verify</button></div></form>
          </details>
          <p class="fine-print">One-time purchase. Sociobot/Dodo is the merchant of record. Refunds are handled there and revoke the license. <a href="/terms/">Terms</a></p>
        </div>
      </section>
      <pre class="print-brief" aria-hidden="true">${esc(dailyBrief(selectedDate, data))}</pre>
    </main>
    <footer><span>Booking Side Notes · A private field map for your day</span><nav aria-label="Legal"><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav><span>Illustration generated for this product.</span></footer>

    <dialog id="note-dialog" aria-labelledby="dialog-title">
      <form method="dialog" id="note-form">
        <div class="dialog-heading"><div><p class="map-label">Nonblocking marker</p><h2 id="dialog-title">Add a side note</h2></div><button class="icon-button" value="cancel" formnovalidate aria-label="Close note editor">×</button></div>
        <p class="dialog-assurance"><span aria-hidden="true">○</span> This creates no calendar event and blocks no time.</p>
        <label for="note-text">Operational note <span aria-hidden="true">*</span></label>
        <textarea id="note-text" maxlength="500" rows="4" required aria-describedby="note-help"></textarea>
        <p id="note-help" class="field-help">For example: “Call before arrival; side gate code is in the job sheet.”</p>
        ${license.unlocked ? `<div class="dialog-phrases"><span>Quick phrase</span>${quickPhrases.map((phrase) => `<button type="button" data-dialog-quick="${esc(phrase)}">${esc(phrase)}</button>`).join('')}</div>` : ''}
        <div class="form-grid">
          <div><label for="note-time">Anchor time</label><input id="note-time" type="time"></div>
          <div><label for="note-event">Beside appointment</label><select id="note-event"><option value="">General day note</option>${dayEvents.map((event) => `<option value="${esc(event.id)}">${esc(formatTime(event.start))} · ${esc(event.summary)}</option>`).join('')}</select></div>
        </div>
        <label class="reminder-choice" for="note-reminder"><input id="note-reminder" type="checkbox"><span><strong>Needs a reminder</strong><small>Marks it due in the ledger; this app sends no notifications.</small></span></label>
        <div class="dialog-actions"><button class="button ghost" value="cancel" formnovalidate>Cancel</button><button class="button primary" id="save-note" value="default">Save side note</button></div>
      </form>
    </dialog>
    <div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
    <div class="update-toast" id="update-toast" role="status" hidden><span>A fresh map is ready.</span><button class="button secondary compact" id="apply-update">Update app</button></div>
  `;
  bindEvents();
  if (pendingMessage) {
    const message = pendingMessage;
    pendingMessage = '';
    queueMicrotask(() => showToast(message));
  }
}

function showToast(message: string): void {
  const toast = document.querySelector<HTMLDivElement>('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  window.setTimeout(() => { toast.hidden = true; }, 3200);
}

async function persist(message?: string): Promise<void> {
  try { await saveData(data); if (message) pendingMessage = message; }
  catch (error) { pendingMessage = error instanceof Error ? error.message : 'Changes could not be saved.'; }
}

function openEditor(eventId?: string, note?: SideNote): void {
  editingId = note?.id ?? null;
  const dialog = document.querySelector<HTMLDialogElement>('#note-dialog')!;
  dialog.querySelector<HTMLHeadingElement>('#dialog-title')!.textContent = note ? 'Edit side note' : 'Add a side note';
  dialog.querySelector<HTMLTextAreaElement>('#note-text')!.value = note?.text ?? '';
  dialog.querySelector<HTMLInputElement>('#note-time')!.value = note?.anchorTime ?? (eventId ? formatInputTime(data.events.find((event) => event.id === eventId)?.start) : '');
  dialog.querySelector<HTMLSelectElement>('#note-event')!.value = note?.eventId ?? eventId ?? '';
  dialog.querySelector<HTMLInputElement>('#note-reminder')!.checked = note ? note.reminder !== 'none' : false;
  dialog.showModal();
  window.setTimeout(() => dialog.querySelector<HTMLTextAreaElement>('#note-text')!.focus(), 0);
}

function formatInputTime(iso?: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

async function handleNoteSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();
  if (event.submitter instanceof HTMLButtonElement && event.submitter.value === 'cancel') {
    document.querySelector<HTMLDialogElement>('#note-dialog')!.close();
    return;
  }
  const text = document.querySelector<HTMLTextAreaElement>('#note-text')!.value.trim();
  if (!text) return;
  const eventId = document.querySelector<HTMLSelectElement>('#note-event')!.value || undefined;
  const anchorTime = document.querySelector<HTMLInputElement>('#note-time')!.value || undefined;
  const needsReminder = document.querySelector<HTMLInputElement>('#note-reminder')!.checked;
  const old = data.notes.find((note) => note.id === editingId);
  const note: SideNote = {
    id: old?.id ?? uid(), date: selectedDate, eventId, anchorTime, text,
    completed: old?.completed ?? false,
    reminder: needsReminder ? (old?.reminder === 'acknowledged' ? 'acknowledged' : 'due') : 'none',
    updatedAt: new Date().toISOString(),
  };
  data.notes = old ? data.notes.map((item) => item.id === old.id ? note : item) : [...data.notes, note];
  document.querySelector<HTMLDialogElement>('#note-dialog')!.close();
  await persist(old ? 'Side note updated.' : 'Side note pinned without blocking time.');
  render();
}

async function importIcs(file: File): Promise<void> {
  try {
    const imported = parseIcs(await file.text());
    const incomingIds = new Set(imported.map((event) => event.id));
    data.events = [...data.events.filter((event) => !incomingIds.has(event.id)), ...imported];
    selectedDate = eventDateKey(imported[0]);
    await persist(`${imported.length} ${imported.length === 1 ? 'appointment' : 'appointments'} imported. No calendar availability changed.`);
    render();
  } catch (error) { showToast(error instanceof Error ? error.message : 'The calendar could not be imported.'); }
}

function download(filename: string, body: string, type: string): void {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = filename; anchor.click();
  URL.revokeObjectURL(url);
}

function bindEvents(): void {
  document.querySelector<HTMLInputElement>('#day-picker')?.addEventListener('change', (event) => {
    selectedDate = (event.currentTarget as HTMLInputElement).value || localDateKey(); render();
  });
  document.querySelector<HTMLInputElement>('#ics-file')?.addEventListener('change', (event) => {
    const input = event.currentTarget as HTMLInputElement; if (input.files?.[0]) void importIcs(input.files[0]);
  });
  document.querySelector('#add-note')?.addEventListener('click', () => openEditor());
  document.querySelector('#empty-add-note')?.addEventListener('click', () => openEditor());
  document.querySelectorAll<HTMLButtonElement>('.add-for-event').forEach((button) => button.addEventListener('click', () => openEditor(button.dataset.eventId)));
  document.querySelector<HTMLFormElement>('#note-form')?.addEventListener('submit', (event) => void handleNoteSubmit(event));
  document.querySelectorAll<HTMLButtonElement>('[data-dialog-quick]').forEach((button) => button.addEventListener('click', () => {
    const field = document.querySelector<HTMLTextAreaElement>('#note-text')!; field.value = `${button.dataset.dialogQuick}: ${field.value}`; field.focus();
  }));
  document.querySelectorAll<HTMLButtonElement>('[data-quick]').forEach((button) => button.addEventListener('click', () => {
    openEditor(); const field = document.querySelector<HTMLTextAreaElement>('#note-text')!; field.value = `${button.dataset.quick}: `; field.focus();
  }));
  document.querySelectorAll<HTMLInputElement>('.note-check').forEach((input) => input.addEventListener('change', async () => {
    const note = data.notes.find((item) => item.id === input.dataset.noteId); if (!note) return;
    note.completed = input.checked; note.updatedAt = new Date().toISOString(); await persist(note.completed ? 'Marked done.' : 'Reopened.'); render();
  }));
  document.querySelectorAll<HTMLButtonElement>('.edit-note').forEach((button) => button.addEventListener('click', () => {
    const note = data.notes.find((item) => item.id === button.dataset.noteId); if (note) openEditor(undefined, note);
  }));
  document.querySelectorAll<HTMLButtonElement>('.delete-note').forEach((button) => button.addEventListener('click', async () => {
    const note = data.notes.find((item) => item.id === button.dataset.noteId); if (!note) return;
    if (!confirm(`Delete the side note “${note.text}”? This cannot be undone.`)) return;
    data.notes = data.notes.filter((item) => item.id !== note.id); await persist('Side note deleted.'); render();
  }));
  document.querySelectorAll<HTMLButtonElement>('.reminder-status').forEach((button) => button.addEventListener('click', async () => {
    const note = data.notes.find((item) => item.id === button.dataset.reminderId); if (!note) return;
    note.reminder = note.reminder === 'due' ? 'acknowledged' : 'due'; note.updatedAt = new Date().toISOString(); await persist('Reminder status updated.'); render();
  }));
  document.querySelector('#print-brief')?.addEventListener('click', () => window.print());
  document.querySelector('#export-brief')?.addEventListener('click', () => download(`side-notes-${selectedDate}.txt`, dailyBrief(selectedDate, data), 'text/plain'));
  document.querySelector('#export-data')?.addEventListener('click', () => download(`booking-side-notes-backup-${localDateKey()}.json`, JSON.stringify(data, null, 2), 'application/json'));
  document.querySelector<HTMLInputElement>('#json-file')?.addEventListener('change', async (event) => {
    const file = (event.currentTarget as HTMLInputElement).files?.[0]; if (!file) return;
    try {
      const next = validateImport(JSON.parse(await file.text()));
      if (!confirm(`Replace this device’s archive with ${next.events.length} appointments and ${next.notes.length} notes?`)) return;
      data = next; await persist('Backup imported on this device.'); render();
    } catch (error) { showToast(error instanceof Error ? error.message : 'The backup could not be imported.'); }
  });
  document.querySelector('#jump-data')?.addEventListener('click', () => document.querySelector('#data-license')?.scrollIntoView({ behavior: 'smooth' }));
  document.querySelector<HTMLFormElement>('#license-form')?.addEventListener('submit', async (event) => {
    event.preventDefault(); const token = document.querySelector<HTMLInputElement>('#license-token')!.value.trim(); if (!token) return;
    restoreLicense(token); license = { unlocked: false, checking: true }; render(); license = await verifyLicense(true); render();
  });
  document.querySelector('#apply-update')?.addEventListener('click', () => {
    updatingApp = true;
    void navigator.serviceWorker.getRegistration().then((registration) => registration?.waiting?.postMessage({ type: 'SKIP_WAITING' }));
  });
}

function updateNetworkState(): void {
  const el = document.querySelector('#network-state');
  if (el) el.innerHTML = `<span aria-hidden="true">●</span> ${navigator.onLine ? 'On device' : 'Offline · on device'}`;
}

async function registerServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    if (registration.waiting) document.querySelector<HTMLDivElement>('#update-toast')!.hidden = false;
    registration.addEventListener('updatefound', () => {
      const worker = registration.installing;
      worker?.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) document.querySelector<HTMLDivElement>('#update-toast')!.hidden = false;
      });
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (updatingApp) location.reload(); });
  } catch { /* The app remains fully usable when service workers are restricted. */ }
}

async function start(): Promise<void> {
  try { data = await loadData(); }
  catch (error) { app.innerHTML = `<main id="main" class="fatal"><h1>Local storage is unavailable</h1><p>${esc(error instanceof Error ? error.message : 'Check this browser’s privacy settings and reload.')}</p></main>`; return; }
  render();
  addEventListener('online', updateNetworkState); addEventListener('offline', updateNetworkState);
  void registerServiceWorker();
  if (license.checking) { license = await verifyLicense(); render(); }
}

void start();
