## Step 1 - init nextjs project
```bash
npx create-next-app@latest
```

## Step 1.1 - fix location
Nextjs created the project in a subdir (so I got the folder structure plantline/plantline)
- had to fix it: `mv plantline/* ./`
- and then also move + merge .gitignore file

## Step 2 - install shadcn

Reason: need to easily import code from v0.dev
Source: https://www.reddit.com/r/nextjs/comments/1fzs4ji/how_can_i_import_the_project_i_made_from_v0dev_to/

```bash
npx shadcn@latest init
```

Had to use --force option (in interactive setup) because it complained about react 19

Worked fine.

## Step 3 - test run of the dummy site.

```bash
npm run dev
```

Works!
But throws some hydration error - will look into it later.

```
Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

See more info here: https://nextjs.org/docs/messages/react-hydration-error


- data-darkreader-mode="filter"
```

## Step 4 - import our code from v0.dev

- [x] import plans
- [ ] import main deployed code


## Step 4.1 - add semver
`npm install --save-dev semver`

Add to `package.json:`
```json
    "bump": "npm version patch",
```
Now the following commands are available:
```bash
npm run bump
```

## Step 4.2 - setup supabase - done during v0.dev development
- Create org
- Create project
- Create tables using [setup_database.sql](setup_database.sql)

Url:
https://supabase.com/dashboard/project/jullwluxyoiegzzqoazg/settings/api

Copy the db url and anonymous key to .env file
In the sidebar, navigate to Settings → API.
You’ll see your Project URL and the anon public key (labeled as “anon key”).

## Step 5 - write simple blogpost

-  backstory - want to plan travel
-  back back story - was doing life review last year and did a linear timeline view of my life
-  Thought: why have nobody done
-  quickly:
   -  check with gpt-o3-mini
   -  creted a demo with v0.dev - from mobile!
   -  polished a bit
   -  database with supabase
-  look here it is! -> Link to a website deployment. https://v0-life-timeline-app-30k5ab.vercel.app/
- [ ] make a video / gif with website demo

## Step 6 - how do I add the code back to v0.dev?

## Step 7 - copy chat history from v0.dev and add all missing ideas and info