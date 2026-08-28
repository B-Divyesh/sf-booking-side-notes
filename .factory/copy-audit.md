# Copy audit

Audited 2026-08-28. Hyphenated terms and file extensions count as one word.
No sentence exceeds 22 words. No supplied banned marketing word appears.

## Home first screen

| Text | Words | Result |
| --- | ---: | --- |
| Keep side notes beside appointments | 5 | Job headline |
| For small appointment businesses that need callbacks and access details without changing bookable time. | 14 | Audience and change |
| Opens a sample day with appointments and side notes. | 9 | Action result |
| Stored on this device | 4 | `local-no-upload` |
| Works offline after the first visit | 6 | `offline-after-first-visit` |
| No purchase required | 3 | `no-purchase-required` |
| Appointments stay on your calendar. | 5 | `calendar-unchanged` |
| Side notes stay here. | 4 | `local-no-upload` |

## Demo first screen

| Text | Words | Result |
| --- | ---: | --- |
| Demo — sample data, nothing is saved | 6 | Required sandbox banner |
| Try edits freely in this separate sample workspace. | 8 | Demo explanation |
| Try a sample appointment day | 5 | Demo job headline |
| Review one appointment and its side note, then edit anything below. | 11 | Used-state instruction |
| Appointment | 1 | Record label |
| Side note beside it | 4 | Association label |
| 1 side note · bookable time unchanged | 7 | `calendar-unchanged` |
| Reminder due / Reminder acknowledged | 2 / 2 | State text |
| Mark reminder acknowledged / Mark reminder due | 3 / 3 | Result-naming actions |

The exact demo disclosure stays visible while the sample workspace remains
editable. Reset and exit controls remain beside it at 390px.

## Workspace and explanation

| Text | Words | Result |
| --- | ---: | --- |
| No appointments yet | 3 | Empty state |
| Import an appointment day | 4 | Empty-state action |
| Choose an .ics calendar export. | 5 | Next step |
| We keep its ID, name, start and end times, and location on this device. | 14 | `minimal-calendar-fields` |
| No side notes yet | 4 | Empty state |
| Add a callback, access detail, follow-up, or delay. | 8 | Next step |
| A side note stays beside the day without changing bookable time. | 11 | `calendar-unchanged` |
| Keep the day clear in three steps | 7 | Process heading |
| Import appointments. Choose an .ics calendar export. | 2 / 5 | Step one |
| Add side notes. Link a callback or access detail to an appointment. | 3 / 10 | Step two |
| Print or export. Take a plain daily brief or backup file with you. | 3 / 11 | Step three |
| It does not change your calendar. | 6 | `calendar-unchanged` |
| It does not send notifications. | 5 | `no-notifications` |
| It stores appointment details and side notes in this browser. | 10 | `local-no-upload` |
| Print the daily brief or download a plain-text copy. | 9 | `daily-brief` |
| Export appointments and side notes as one backup file. | 9 | `backup-export` |
| Importing a backup asks before it replaces data on this device. | 11 | `backup-restore` |

## Editor, feedback, and errors

| Text | Words | Result |
| --- | ---: | --- |
| This creates no calendar event and does not change bookable time. | 11 | `calendar-unchanged` |
| For example: “Call before arrival; side gate code is in the job sheet.” | 13 | Concrete example |
| This only shows a due status. | 6 | Reminder boundary |
| This app sends no notifications. | 5 | `no-notifications` |
| Side note saved. Bookable time did not change. | 3 / 6 | Action feedback |
| This backup is not valid JSON. | 6 | Specific error |
| Choose a Booking Side Notes backup exported by this app. | 10 | Recovery step |
| This backup does not have the expected format. | 8 | Specific error |

Controls use verbs that name the UI result. The visible quick actions are
“Start callback note,” “Start access note,” “Start supplier note,” and “Start
follow-up note.” All Save, Add, Import, Export, Print, Reset, Start, Mark,
Update, Edit, Delete, Cancel, and Close labels identify their result.

## README

All prose sentences are 22 words or fewer. The former terms
“appointment-linked,” “day-level,” “JSON backup,” “runtime CDN dependencies,”
“manifest MIME type,” and “appointment instances” are absent. The README uses
“for one appointment or the whole day,” “backup file,” “loads no third-party
files,” “app manifest,” and “each appointment you need.”

## Terminology

| Concept | One term |
| --- | --- |
| Imported calendar record | appointment |
| Local work item | side note |
| Capacity | bookable time |
| Source boundary | does not change your calendar |
| Portable data | backup |
| Note without an appointment | for the whole day |
| Note whose appointment was removed | unlinked side note |
| Reminder value | reminder status |

“0 minutes blocked” appears only in the measured capacity status and exported
daily brief.

## Catalog

“Keep side notes beside appointments without changing bookable time.” has nine
words and 67 characters. It starts with a verb and contains no banned term.
