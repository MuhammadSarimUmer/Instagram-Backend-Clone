# 📸 Instagram Backend Clone

A robust REST API backend for an Instagram-like social media application — built with Node.js, Express, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## ✨ Features

- 🔐 **Authentication & Authorization** — Secure registration and login using `bcrypt` password hashing and JWT stored in HttpOnly cookies
- 🛡️ **Role-Based Access Control** — `user` and `admin` roles; admins can manage all posts, comments, and users
- 👤 **User Profiles & Social Graph** — Follow/unfollow users, view follower and following counts
- 🖼️ **Post Management** — Create, read, update, and delete posts with image uploads via **ImageKit**
- ❤️ **Interactions** — Toggle likes on posts; add, edit, and delete comments
- ✅ **Data Validation** — Request validation on registration using `express-validator`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT, bcrypt, cookie-parser |
| File Uploads | Multer, ImageKit |
| Validation | express-validator |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)
- [ImageKit](https://imagekit.io/) account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/instagram-backend-clone.git
cd instagram-backend-clone

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

---

## 📚 API Reference

### 🔑 Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Register a new user (username, email, password) | ❌ |
| POST | `/login` | Authenticate and set JWT cookie | ❌ |
| GET | `/logout` | Clear the authentication cookie | ❌ |

### 👤 User Routes — `/api/user`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/:username` | Get a user's profile, posts, follower & following counts | ✅ |
| POST | `/follow/:id` | Follow or unfollow a user by ID | ✅ |
| GET | `/search?username=` | Search for users by username | ✅ |
| GET | `/all` | Get all users *(Admin only)* | ✅ Admin |

### 📝 Post Routes — `/api/post`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/create-post` | Create a post (`multipart/form-data`: image + caption) | ✅ |
| POST | `/like-post/:id` | Toggle like on a post | ✅ |
| GET | `/posts` | Get all posts (feed) | ✅ |
| GET | `/post/:id` | Get a single post by ID | ✅ |
| GET | `/posts/:id` | Get all posts by a specific user | ✅ |
| PATCH | `/post/:id` | Update a post's caption *(author or admin)* | ✅ |
| DELETE | `/post/:id` | Delete a post *(author or admin)* | ✅ |

### 💬 Comment Routes — `/api/comment`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/create-comment/:id` | Add a comment to a post | ✅ |
| GET | `/comments/:id` | Get all comments for a post | ✅ |
| GET | `/comment/:id` | Get a single comment by ID | ✅ |
| PATCH | `/comment/:id` | Update a comment *(author only)* | ✅ |
| DELETE | `/comment/:id` | Delete a comment *(author or admin)* | ✅ |

---

## 📁 Project Structure

```
├── .env
├── .gitignore
├── package.json
├── server.js                        # Entry point — connects DB & starts server
└── src/
    ├── app.js                       # Express app setup & route integration
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── comment.controller.js
    │   ├── posts.controller.js
    │   └── user.controller.js
    ├── db/
    │   └── db.js                    # Mongoose connection logic
    ├── middleware/
    │   ├── auth.middleware.js       # JWT validation
    │   └── validation.middleware.js # express-validator arrays
    ├── models/
    │   ├── comment.model.js
    │   ├── posts.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── comment.routes.js
    │   ├── post.routes.js
    │   └── user.routes.js
    └── services/
        └── upload.service.js        # ImageKit integration
```

---

## 🔒 Authentication Flow

1. Register via `POST /api/auth/register`
2. Login via `POST /api/auth/login` — receives a JWT in an **HttpOnly cookie**
3. All protected routes read the cookie automatically
4. Logout via `GET /api/auth/logout` to clear the cookie

---
