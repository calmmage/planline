# Event Status feature

Add a new column to the events table: status.

General idea: allows now to distinguish between past and future events, between plans, confirmed plans and happened events.

## Core:
- default statuses:
  - plan / draft
  - confirmed plan / confirmed / organized
  - happened / completed
  - canceled

- option to add custom statuses?

## Visuals:
- Have distinct visual styles for each status.
  - Opacity?
  - Border thickness / style (confirmed - bold, organized - thin, happened - dashed)

## Planning mode?
- displays only confirmed and planned events
- integrates with 3 - unscheduled events component