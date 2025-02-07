- [ ] add readme.md
- [x] add dev_readme.md - how to init nextjs project etc.

- [x] rename 'v0 App' ("Create Next App") -> 'Planline'

- [x] change default tick count to 10 or 50

- [x] add a new dev slider - timeline vertical size.

## Bugs
- Days view is still broken.
  - [ ] add a new 'hour' zone - but don't switch to it or show it in buttons. Use for sub-ticks only.
- Labels overlap each other
- Zones positions are broken
- Why does 'dark mode' switch only timeline view block?
- For some crazy reason, Year, Quarter and Month ticks are misaligned.. Troubleshoot and fix.

## Ideas for big components

- Add scale preset buttons (day, month, week etc) - 
  - Clearly write that current buttons chage tick axes, not scale. Put them separately


## Roadmap what I am doing

- [x] 0) dev switcher for timeline component width?
- [x] 0.1) fix dark mode switcher
  - [x] cleanup old switcher
  - [ ] make colors nicer -  "bg-gray-900 text-white" : "bg-white text-black"}`}> was good
  - [x] consider making it a switcher again?
- 1) Zones -> show.
- 2) Switch to log scale
- 3) Fix zones (events) locations
- 4) Auto-switch ticks
- 5) improve events style: set opacity ±80% by deafult. Add rounded corners. Add shadow, border.