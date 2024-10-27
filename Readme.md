# Comics Book API

This API allows users to manage a comic books. It provides functionalities for listing, filtering, sorting, and updating comic books.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

---

## Project Overview

This is a RESTful API built with Node.js, Express, and MongoDB. It uses Mongoose for data modeling and supports operations like retrieving a list of comic books with pagination, filtering, sorting, and updating specific comic book details.

---

## Features

- **Retrieve Inventory List**: Supports pagination, filtering, and sorting.
- **Update Comic Book Details**: Allows updating individual fields of comic book entries.
- **Add & Delete Book**: Allows to add and delete books in database.
- **Error Handling**: Includes consistent and clear error responses.

---

## Tech Stack

 - ### Packages
      
    <p>
     <img alt="Node.js" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
     <img alt="MongoDb" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
     <img alt="ExpressJS" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
    </p>

  - ### Tools
     
     <p>
       <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
     </p>

---

## Getting Started

Follow these instructions to set up and run the project locally.


### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Himanshuraj2918/Comics-Book_MangoJelly.git

   cd Comics-Book_MangoJelly

   npm install

   npm run dev

## Environment Variables

   Add the following environment variables in a .env file.

```bash
PORT = 3000
      
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.mongodb.net/<DB_NAME>

````
---

## Project Structure

```bash
Comics_Book 
├──📁src
│   ├── 📁controllers
│   │   └── 📄book.controllers.js
│   ├── 📁db
│   │   └── 📄db.js
│   ├── 📁models
│   │   └── 📄book.models.js
│   ├── 📁routes
│   │   └── 📄book.routes.js
│   └── 📁utils
│       ├── 📄app.js
│       ├── 📄constant.js
│       └── 📄index.js
├── 📄package-lock.json
├── 📄package.json
└── 📄.env

````
---

## API Documentation 

## Book

Action | HTTP Request | URI | Purpose
---| --- | --- | --- 
*Add-Book* | `POST` | `/api/v1/book/add-book` | Add books
*Update-Book* | `PATCH` | `api/v1/book/update-book/` | Update books with `bookID`
*Delete-Book* | `DELETE` | `api/v1/book/delete-book/` | Delete books with `bookID`
*Book-Details* | `GET` | `api/v1/book/book-details/` | Get books details with `bookID`
*All-Books* | `GET` | `api/v1/book/all-books/` | Get  all books apply filtering, sorting & pagination




