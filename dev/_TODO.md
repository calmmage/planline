# TODO List

## Security Measures
...

## New Features
1. Add events by clicking on timeline (select time interval by clicking and dragging the pointer)
2. Improve calculation for 'scale value -> visible time period' using screen size
3. Add new zoom level 'quarters'
4. Improve event style:
   - Rounded corners
   - Opacity (add % slider to dev settings)
5. Rework event placement strategy:
   - Subtly highlight zones with events (and add light opaque text with zone name)
   - Implement dynamic zone sizes to fit events vertically without overlapping

## Bugs
1. Fix days ticks in 'days' zoom mode
2. Adjust bold and non-bold ticks to prevent overlap
3. Re-enable or fix 'auto-switch-zoom-level-based-on-scale' feature
4. Add flags to dev settings menu:
   - Auto-switch zoom level from scale
   - Auto-switch scale based on zoom level
   - Auto-update tick count based on scale
5. Adjust zone 0 placement after moving it to be on top of axis

## Main Problem
- App is too long vertically and doesn't fit into screen. Need to make it smaller.

