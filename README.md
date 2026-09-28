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
2. git clone https://github.com/YOUR_USERNAME/notes-app.git


2. Install dependencies:
   npm install

3. Create a `.env` file in the root directory with the following variables:
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/notes-app
   SESSION_SECRET=any_secret_string_here

4. Start the server:
   node index.js

5. Open your browser at:
   http://localhost:3000

## Project Structure
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

## Routes

### Auth Routes
- `GET /register` - Show register page
- `POST /register` - Create new user
- `GET /login` - Show login page
- `POST /login` - Login user
- `GET /logout` - Logout

### Notes Routes (require login)
- `GET /notes` - Show all my notes
- `GET /notes/new` - Show form to create a note
- `POST /notes` - Save new note
- `GET /notes/:id/edit` - Show form to edit note
- `POST /notes/:id` - Save edited note
- `POST /notes/:id/delete` - Delete note

## Notes

- All passwords are hashed using bcrypt before saving
- Each user can only see and edit their own notes
- The app uses sessions to keep users logged in



## Author
ABDEL MOEZ MOHAMMED

Circuit Stream-Software Development Bootcamp