# Reflection

## Overview

This midterm project was a challenging but valuable experience. I built a
note-taking app using Node.js, Express, MongoDB, and EJS. The most important
lesson I learned is that starting with authentication first was the right
decision, as Carlos (our instructor) recommended.

## What I Learned

**1. Authentication is the hardest part**

At first, I thought the CRUD operations (Create, Read, Update, Delete) would
be the hardest. But authentication was the real challenge. Understanding
Passport.js, serializeUser, deserializeUser, and how sessions work took me a
lot of time. I had to read the official Passport documentation more than once.

**2. Small mistakes cause big problems**

I made many small mistakes that took me a long time to fix. For example:
- I typed `reguire` instead of `require`
- I named a folder `view` instead of `views`
- I wrote `name=" username"` (with an extra space) in an HTML form

These small mistakes taught me to check every character carefully, and to
use the browser's Developer Tools for debugging.

**3. Filtering by user is critical**

The requirement "each user should only see their own notes" was very important.
I learned to always filter by `user: req.user._id` in every database query.
This is a simple line, but it is essential for security.

**4. The importance of reading error messages carefully**

At the beginning, when I saw a long error message in the terminal, I would
get worried. But by the end, I learned to read the error carefully. Usually,
the error tells you exactly what the problem is, and in which file and line.

## Challenges

**Challenge 1: Passport Configuration**

The `passportConfig.js` file was confusing at first. I did not understand why
we needed both `serializeUser` and `deserializeUser`. After reading the
documentation and asking questions, I understood that:
- `serializeUser` saves only the user ID in the session
- `deserializeUser` gets the full user object back in each request

**Challenge 2: Route Organization**

At first, I put all my routes in `index.js`. But as the project grew, the
file became messy. I learned to separate routes into `routes/auth.js` and
`routes/notes.js`. This made the code much cleaner.

**Challenge 3: Form Field Names**

I learned the hard way that Passport expects specific field names
(`username` and `password`). When I wrote a space in `name=" username"`,
the form was submitting an empty value, and I did not understand why
Passport was failing. It took me a long time to find this mistake.

## What I Would Do Differently

If I started over, I would:

1. **Start with authentication first** — which is what I did, but I would
   tell other students to do the same. Adding authentication to a finished
   app is much harder.

2. **Test each feature before moving on** — sometimes I wrote multiple
   features and then tested them all at once, which made debugging harder.

3. **Use partials in EJS** — I did not use partials in this project, but
   I learned about them and I would use them to avoid repeating HTML code.

4. **Commit to Git more often** — I should have made small commits after
   each working feature, instead of one big commit at the end.

## Tools I Used

- **Class recordings and transcripts** — to review what Carlos explained
  in class
- **Official documentation** for Passport, Express, and Mongoose
- **AI tools** — for clarifying concepts and finding typos in the code
- **Postman** — for sending test requests directly to the `/notes` and
  `/register` endpoints while building them, before the front-end forms
  were ready, learned from the instructor's example

## Conclusion

This project taught me that building a full-stack application is not just
about writing code. It is about understanding how different parts work
together: routes, controllers, models, views, sessions, and databases.
I feel much more confident now about Node.js and Express than I was at the
beginning of this unit.
