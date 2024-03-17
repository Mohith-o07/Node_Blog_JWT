
---

# Blog App

## Overview

This is a simple blog application built using Node.js and Express, with MongoDB as the database. It follows the MVC (Model-View-Controller) architecture and includes basic CRUD (Create, Read, Update, Delete) operations for managing blog posts.

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

- Access the application at `http://localhost:3000`
- Navigate to `/blogs` to view all blogs, create a new blog, and perform CRUD operations.

## Dependencies

- [Express](https://expressjs.com/): Web application framework.
- [Mongoose](https://mongoosejs.com/): MongoDB object modeling for Node.js.
- [Morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware.
- [EJS](https://ejs.co/): Embedded JavaScript templates for rendering views. EJS allows embedding JavaScript code within HTML markup, making it easier to generate dynamic content.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---
