# Demo sandbox

Open `/?demo=1` or `/demo` for a one-click sample day with three appointments
and three realistic side notes. The first phone screen shows a linked
appointment and side note. The banner says “Demo — sample data, nothing is
saved.” It stays at the top of the viewport while the sample workspace is
editable. **Reset demo** restores the shipped sample. **Start for real**
deletes the demo database and opens the ordinary workspace.

Demo state is stored only in IndexedDB database `booking-side-notes-demo`, store
`local-data`, key `demo:state-v1`. Real state uses the separate
`booking-side-notes` database and `state-v1` key. Demo never reads or writes the
real database. The wordmark, browser Back or Forward to a non-demo page,
Privacy, Terms, and Start for real clear the demo database before the next page
loads. Returning to `/demo` starts the original sample again. The service worker
precaches `/demo`, so the sample is available offline after the first visit.
