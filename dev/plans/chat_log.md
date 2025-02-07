# Life Timeline Web App

## Core Features
- **Linear Timeline View**
  - Continuous timeline (not a grid)
  - Zoom in/out with Ctrl + mousewheel
- **Event Creation**
  - "Add Event" button
  - *(Optional)* Click and drag on the timeline’s X-axis to set duration
- **Event Details**
  - Start/End dates (date only)
  - Color, Name, Type
- **User Management**
  - User authentication
  - Persist events per user

## Inspirations
- Contrast with traditional calendar grids (e.g., Google Calendar)
- Web demos with smooth time/space scrolling via mousewheel

Also, tell me which env variables I need to set up

1) Breaks

The code returns the following error:
```
Error fetching events: {"code":"42P01","details":null,"hint":null,"message":"relation \"public.events\" does not exist"}

  at fetchEvents (/components/Timeline)
```
Revise the code to address the error.

2) Great! The main vision looks fine.

Now:
a) by default - we should be zoomed onto months, or possibly even weeks
b) let's add 4 buttons to switch labels on x axis: year, month, week, day
c) each (point - year, month, week, day) on axis should go with its own axis tick.
d) the view should go both ways.
In the center, not start - today.

Let's add a separate document called something like "accepted by client.md" 
And add all those requirements there (as well as the main ones listed in the first prompt)

Each requirement should be a VERY SIMPLE AND SHORT ONE LINE POINT LIKE THIS:
- [ ] center timeline on today
- [ ] 4 axis label buttons

1) let's add a slider for zoom level (so BOTH mouse scroll zoom AND slider work and are synchronized

2) zoom is now centered on the left of the screen - it should be centered in the middle (so when i zoom - things 

3) ticks are broken:
Now when i select 'month' view I see "Apr Apr Apr Apr ... Apr May May ..."
Instead what I meant was - when I switch the display modes between month and year and week - there is now ONE TICK PER ENTITY (so one week - one tick)

4) For some reason there is a finite amount of ticks. So I can zoom out so that I reach it.
And that amount is... underwhelming.


5) maybe I should create somethign in supabase project? Manually? Give me instructions, stop trying to fix it with code. 
The code returns the following error:
```
Error fetching events: {"code":"42P01","details":null,"hint":null,"message":"relation \"public.events\" does not exist"}

  at fetchEvents (/components/Timeline)
```
Revise the code to address the error.

6) remember to add those requirements to the 'accepted by client' md file (you are NOT allowed to mark anything as accepted in that file - only I do that)

7) let's add buttons "go left" and "go right" that navigate back and forward in the timeline

8) Bonus feature: "switch" Ticks should also have marks from one level up (so when we reach jan of new year - year is labeled there as well. But ONLY for jan).

great!

I accept the following features:
- zoom is centered in the middle
- add slider for zoom

A small note:
For each section please add the features meantioned in a new header in "accepted by client".md - e.g. "iteration 1, 2, 3..."

New issues that I see:
1) Slider works, but the limits are off
- minimal zoom is not far enough. 
- maximal zoom is too close - there are no ticks left on a screen. 
2) There's something broken with amount of ticks
- there is only... one tick for the 'day' zoom level??

3) the database is still completely broken. Notiing works.
The code returns the following error:
```
Error adding event: {}
  at handleSubmit (/components/AddEventButton)
```
Please write me instructions how to set up a database in a separate database_setup_instructions.md file

New features I want:
1) Event type should actually be a selection, stored in database
2) there are defaut event types:
- vacation / trip (should be 2?)
- sick
- guests
- event (?)
3) Users can add new event types

4) there are default colours for each event type

5) I tricked you: actually, zoom levels should auto-switch as we zoom, not be controlled by buttons.

6) I haven't yet been able to add any events, so I don't know how it looks now.
But.
I want to have something called 'event zones' which 
Zones can be above and below the timeline. 
I imagine zones like (-2, -1, 1, 2)
For example -1 would be for background bad things - sickness etc.
1 - for background good things - family visits
2 - for actual events I am doing (trips etc)
-2 - for everything else?


1) keep the buttons for tick switching: but make it synchronized with the auto-switching feature
2) auto-switching values are off. Correct them so that it switches from months to years,  weeks to months, days to weeks  LATER (so there is a full year of months - 12 months - on the screen - when auto-switch to year happens. Currently it switches when there's like... 2 months) 
3) the minimal and maximal zoom values are off.
Specifically - the minimal. 
Currently only 1 year fits on the screen with minimal zoom. Target is 100 years.


1)  let's add one more zoom level
type TimeUnit = 'day' | 'week' | 'month' | 'year' | 'decade'

const ZOOM_LEVELS = [
  { scale: 0.003, unit: 'decade' },  // ~100 years
  { scale: 0.03, unit: 'year' },   // ~10 years
  { scale: 0.36, unit: 'month' },  // ~1 year

2) something is wrong with the slider.
Is it... linear?
let's make it logarithmic.
Also please display slider value.

1) And database still not works. For example 'add event'

The code returns the following error:
```
Error adding event: {"code":"42501","details":null,"hint":null,"message":"new row violates row-level security policy for table \"events\""}

  at handleSubmit (/components/AddEventButton)
```
Revise the code to address the error.

I think our sql setup query sets access for admin only?
But is our 'anonymous env key' actually for that access level?

2) you forgot to add previous feature requests to the 'accepted by client'.md

3) let's have the settings in config.yaml file?
Specifically:
- zoom levels auto-switch borders
- default event types

4) You removed color from 'add event'. That's not what I wanted. Instead each event type has deafult color, but we can override if we want

5) Bonus feature: can we add 'crayon-like' stylization for some events? 
So I want the event rectangle be drawm fancy

6) currently the event type dropdown menu in add event is empty for some reason...
I guess because database still not works?

Zoom levels are still a bit off.
1) Can we add the new 'dev' settings menu
How I imagine it:
- there's a 'dev settings' button
- If we click that button - a new menu with settings appears (collapse / unfold)

2) And there add a new feature - slider + text entry - 'zoom levels scale' which is a multiplier for all zoom levels

3) Also, while we're at it: 
let's add a 'num ticks' parameter that controls how many x axis ticks are populated

4) let's tweak the scale and config
- add min and max scale values to the config
Defaults:
max scale: 1.
min scale: 0.0001

1 -> days
~0.1  (1/7) -> weeks
etc..

5) you didn't get me: 
- if we change scale
- but if we change ZOOM (click on buttons - day, week etc) - scale SHOULD NOT change. Only the ticks on the axis.

----
New ideas I have
1) for 'scale' slider value - I don't want to show a number, instead I want to show a 'calculaion on a number', specifically - how much time we see on the screen. So it should be something like '50 years' or '2 weeks' - let's write a function that calculates 
2) Dark mode switcher.
3)

a) 
Can we break our timeline.tsx into components?
It feels already too big at this point.
Should we make a separate folder for that?
b) 
you forgot to add features to accepted_by_client again???
c) something is broken.. :( 
```
Error: The file "/config.yaml" cannot be found (imported in "/components/Timeline"). Make sure the file or alias exists in the correct location.
```

1) you forgot to update imports
The code returns the following error:
```
Error: The file "/components/Timeline" cannot be found (imported in "/app/page"). Make sure the file or alias exists in the correct location.
```
Revise the code to address the error.
2) you misinterpreted my words:
- you should not have marked stuff as accepted in accepted by client. I didn't approve that.
instead you should have added all new requested features i meantioned in each message above.
(into separate iteration sections)

The code returns the following error:
```
Error: The file "/config/timeline.yaml" cannot be found (imported in "/components/timeline/Timeline"). Make sure the file or alias exists in the correct location.
```
Revise the code to address the error.

Does next.js require somethign special to include resource files?


1) Let's add 'today' button that moves us to current date
2) Dark mode switches... not everything
3) after clicking 'add event' button - it doesn't close the menu..
4) dev settings pane appears on top. of the screen and moves whole app down
Instead I would like it to exist in a separate plane, hovering above whole app, independently

Bugs
a) the zones are too large vertically. Make them smaller.
b) 'day' ticks are broken:
there's only one day tick for some reason...
Other ticks are fine, don't change them
c) ticks appear on top of the plot instead of in the middle on the axis
d) I still see 0 options in the 'event type' dropdown menu.

Meta:
1) ADD ALL THE COMMENTS IN abc.md (accepted by client) as points - each in their own 'iteration'

Features:
1) zone 0 events should be ON TOP of the axis
2) Ok, this works, but let's improve visual style for the events.
- add shadow

3) So, let's do the following: 
for each tick mode the +1 level ticks and -1 level ticks also appear
Example:
if we're in 'week' mode - 'day' ticks appear too, but unlabeled.
'month' ticks appear in bold.

4) I want to

a) Accepted:
- ticks bugs is fixed and now on top of axis.
- sub-ticks are displayed correctly (e.g. months when looking at years)

b) add these to new 'abc.md':
1) make default event type - 'event'
2) zones should be in reversed order in dropdown menu in 'add new event')
3) Default name - 'new event' or something

c) New requested features:
1) Main new feature: add events by clicking on timeline.
Or more specifically- select time interval by clicking, dragging the pointer.
2) our calculation for 'scale value -> visible time period is off. 
- can we use screen size? let's write a function that calculates that.
3) let's add new zoom level 'quarters'. 
4) I want a nicer event style, specifically:
- rounded corners
- opacity (add % slider to dev settings)

5) I want a complete rework of our event placement strategy.
- First of all, if zone has events - I want it sublty highlighted (and a light opaque text with zone name)
- dynamic zone sizes, to fit in the events in it vertically without overlapping.

d) bugs
1) days ticks are still broken. 
Is this because the sub-level of days is missing or what?
on 'weeks' zoom mode i can see days. But on days - can't see. There's only a single date. Is that because of 
2) our bold and non-bold ticks overlap. Can we make bold ones further from the 
3) did our 'auto-switch-zoom-level-based-on-scale' feature got disabled?
let's add these flags points to our dev settings menu:
- auto-switch zoom level from scale
- auto-switch scale based on zoom level
- auto-update tick count based on scale

4) MAIN PROBLEM CURRENTLY: our app is too long vertically and doesn't fit into screen. Can we make it smaller?
5) mini-bug, you moved zone 0 to be on top of axis - but you didin't adjust

Add the above thing to todo.md as a new section

Then create a file workalong.md. Then when working on each feature - write to workalong.md A SMALL NOTE - e.g. 'started working on feature ..., chainging files ...'


let me be more clear. for now. reduce it to like 50vh instead of 100vh.

at the same time - make the timeline component to be full-screen. And all the buttons and everything - in it / on top of it - i don't care.