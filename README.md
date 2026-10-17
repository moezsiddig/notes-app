# Notes App

A simple note-taking app where users can register, login, and manage their own notes.

Built with Node.js, Express, MongoDB, and EJS for my Software Development Bootcamp midterm project.

## Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS (view engine)
- Passport.js (for login)
- bcryptjs (for password hashing)

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/moezsiddig/notes-app.git
   cd notes-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. A `.env` file is already included in this repository with the required environment variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/notes-app
   SESSION_SECRET=any_secret_string_here
   ```

   > **Note:** A working `.env` file is included in this repository as requested by
   > the instructor, to allow direct grading without extra setup. In a real-world
   > project this file would be excluded via `.gitignore`, with only
   > `.env.example` shared publicly.

4. Start the server:
   ```
   node index.js
   ```

5. Open your browser at:
   ```
   http://localhost:3000
   ```

## Project Structure

```
notes-app/
📁 config/
   📄 connectionDB.js
📁 models/
   📄 User.js
   📄 Note.js
📁 public/
   📁 css/
      📄 style.css
📁 routes/
   📄 auth.js
   📄 notes.js
📁 views/
   📁 notes/
      📄 index.ejs
      📄 new.ejs
      📄 edit.ejs
   📁 partials/
      📄 header.ejs
      📄 footer.ejs
      📄 login.ejs
      📄 register.ejs
📄 .env
📄 .env.example
📄 .gitignore
📄 index.js
📄 passportConfig.js
📄 package.json
📄 README.md
📄 REFLECTION.md
```

## API Endpoints

This app is server-rendered (EJS), so successful requests respond with an HTML
page (`render`) or a `302` redirect rather than JSON. Validation errors are
returned by re-rendering the same form with an `error` message.

### Auth Routes

#### `GET /register`
Renders the registration page.

#### `POST /register`
Creates a new user account.

**Request body (form-encoded):**
```json
{ "username": "string (min 3 chars)", "password": "string (min 6 chars)" }
```
**Response (success):** `302` redirect to `/login`
**Response (error):** re-renders `register` with one of:
`All fields are required` · `Username must be at least 3 characters` ·
`Password must be at least 6 characters` · `Username already exists`

#### `GET /login`
Renders the login page.

#### `POST /login`
Authenticates a user via Passport's local strategy.

**Request body (form-encoded):**
```json
{ "username": "string", "password": "string" }
```
**Response (success):** `302` redirect to `/notes`, session cookie set
**Response (error):** re-renders `login` with an authentication error message

#### `GET /logout`
Ends the session. **Response:** `302` redirect to `/login`

### Notes Routes
All routes below require an authenticated session (`checkAuth` middleware) and
only ever read or modify notes owned by `req.user`.

#### `GET /notes`
Lists the logged-in user's notes, newest first.
**Response (success):** renders `notes/index` with `{ notes, user }`
**Response (error):** renders `notes/index` with `{ notes: [], error: "Something went wrong" }`

#### `GET /notes/new`
Renders the "create note" form.

#### `POST /notes`
Creates a new note for the logged-in user.

**Request body (form-encoded):**
```json
{ "title": "string", "content": "string" }
```
**Response (success):** `302` redirect to `/notes`
**Response (error):** re-renders `notes/new` with `{ error: "All fields are required" }`

#### `GET /notes/:id/edit`
Renders the edit form for one of the user's own notes.
**Response:** renders `notes/edit` with `{ note }`, or redirects to `/notes` if not found/not owned

#### `POST /notes/:id`
Updates a note's `title` and `content`.

**Request body (form-encoded):**
```json
{ "title": "string", "content": "string" }
```
**Response:** `302` redirect to `/notes` (on success, missing fields, or error)

#### `POST /notes/:id/delete`
Deletes a note owned by the logged-in user.
**Response:** `302` redirect to `/notes`

### Data Models

**User**
```json
{ "username": "String, required, unique", "password": "String, required (bcrypt hash)" }
```

**Note**
```json
{
  "title": "String, required",
  "content": "String, required",
  "user": "ObjectId, required (ref: User)",
  "createdAt": "Date (auto, via timestamps)",
  "updatedAt": "Date (auto, via timestamps)"
}
```

## Notes

- All passwords are hashed using bcrypt before saving
- Each user can only see and edit their own notes
- The app uses sessions to keep users logged in

## Author

ABDEL MOEZ MOHAMMED

Circuit Stream — Software Development Bootcamp

**Live repository:** https://github.com/moezsiddig/notes-app
