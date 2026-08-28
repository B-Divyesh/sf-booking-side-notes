# Demo sandbox

Open `/?demo=1` or `/demo` for a one-click sample day with three appointments
and three realistic side notes. The first phone screen shows a linked
appointment and side note. The banner says “Demo — sample data, nothing is
saved.” **Reset demo** restores the shipped sample. **Start for real** deletes
the demo database and opens the ordinary workspace.

Demo state is stored only in IndexedDB database `booking-side-notes-demo`, store
`local-data`, key `demo:state-v1`. Real state uses the separate
`booking-side-notes` database and `state-v1` key. Demo never reads or writes the
real database. The service worker precaches `/demo`, so the sample is available
offline after the first visit.
