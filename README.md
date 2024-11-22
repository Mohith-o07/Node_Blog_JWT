
---

# Blog App with JWT Authentication

## Overview

This is a simple blog application built using Node.js and Express, with MongoDB as the database. It follows the MVC (Model-View-Controller) architecture and includes basic CRUD (Create, Read, Update, Delete) operations for managing blog posts. It uses JSON Web Tokens for Authentication. You can also run this project as a Docker container(check "Dockerfile").

## Features

- Signup/login using username and password.
- Create blog
- Update blog
- Delete blog
- View blog(s)
- Rate Limiting

## Project Structure

- **controllers:** Contains the logic for handling different routes and interacting with the database.
  - `blogController.js`: Implements functions for displaying all blogs, blog details, creating a new blog, updating a blog, and deleting a blog.

- **models:** Defines the data structure for a blog using Mongoose schema.
  - `blog.js`: Specifies the schema for the blog model.

- **routes:** Manages the routes for the application.
  - `blogRoutes.js`: Defines routes such as displaying all blogs, creating a new blog, updating a blog, and deleting a blog.

- **styles:** Contains CSS styles for the application.
  - `styles.css`: Provides styling for the application interface.

- **views:** Consists of EJS templates for rendering different pages.
  - **blogs:** Templates for handling blog-related views.
    - `create.ejs`: Form for creating a new blog.
    - `details.ejs`: Template for displaying blog details.
    - `index.ejs`: Template for listing all blogs.
    - `update.ejs`: Template for updating a blog.

  - `404.ejs`, `about.ejs`: Error and about page templates.
  - **partials:**
    - `footer.ejs`, `head.ejs`, `nav.ejs`: Header, footer, and navigation partials.

- **app.js:** Main server file that sets up the Express application, connects to MongoDB, and defines middleware and routes.

- **package.json:** Contains project metadata and dependencies.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up MongoDB: Replace `<username>` and `<password>` in `dbURI` with your MongoDB credentials in `app.js`.
4. Run the application: `npm start`

## Usage
- To spinup the server, create an .env file and add your mongodbURI to connect to the database and a secret_key for signing the token.
- Run the app, and access the application at `http://localhost:3001`
- login/signup using username and password, then you are good to go!
## Dependencies

- [Express](https://expressjs.com/): Web application framework.
- [Mongoose](https://mongoosejs.com/): MongoDB object modeling for Node.js.
- [Morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware.
- [EJS](https://ejs.co/): Embedded JavaScript templates for rendering views. EJS allows embedding JavaScript code within HTML markup, making it easier to generate dynamic content.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Library used to parse HTTP request cookies.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---
