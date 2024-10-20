# All the Practice information

1. **part_5_6**
<ul>
<li>Basics of ejs setting as view engine</li>
<li>common middlewares</li>
<li>Dynamic route</li>
</ul>

2. **part_7**
<ul>
<li>fs module</li>
<li>maded frontend with ejs</li>
<li>Created Note book website</li>
</ul>

3. **part_10_11**
<ul>
<li>Part_10</li>
<li>What is Database And How its work</li>
<li>Application Server and Database Server</li>
<li>MongoDB Theory Expalnation in Brief</li>
</ul>

<ul>
<li>Part_11</li>
<li>MongoDB with Mongoose</li>
<li>Mongoose Model and Schema</li>
<li>MongoDB CRUD Operation</li>
</ul>

4. **part_12_13**
<ul>
<li>Create DB and Collection in Model</li>
<li>Create Models using Mogoose</li>
<li>Create UserSchema in Models</li>
<li>CRUD Operations</li>
</ul>

5. **part_14**
<ul>
<li>Authentication and Authorization</li>
<li>Cookies</li>
<li>Jwt Token</li>
<li>bcrypt (Password Encryption and Decryption)</li>
<li>Basics of Authantication</li>
</ul>

6. **part_15**
<ul>
<li>Create App for Practice Authentication and Authorization</li>
<li>Create User / Login / Logout</li>
<li>Cookie / Bcrypt / JWT</li>
<li> Server Side with Ejs </li>
</ul>

## 7. **part_16** - New and important Concept

- **Implemented Data Association in MongoDB**:

  - Established relationships between collections using MongoDB's referencing technique.

- **Created Post Model with User ID Reference**:

  - Designed a Post schema that includes a `userId` field, linking each post to the User model via `ObjectId`.

- **Created User Model with Posts Array Reference**:

  - Defined a User schema that contains a `posts` array, storing references to the IDs of the posts created by the user.

## 8. **part_17** - Mini Project: Backend Server with MongoDB, JWT Authentication, and Post Creation

## Project Overview

This backend mini project demonstrates user authentication and post creation using MongoDB as the database. The server handles login and logout with JWT tokens stored in cookies. Users can create posts, and relationships between users and posts are maintained through ObjectID references.

## Features

- **User Authentication**:
  - Login and logout functionality using JWT and cookies for secure authentication.
- **User Model**:

  - Stores user information along with an array of posts references (`ObjectID`).

- **Post Model**:

  - Stores posts created by users, referencing the respective user via `ObjectID`.

- **Profile Picture Upload**

  - Implemented profile picture upload using the `multer` package.
  - Uploaded images are stored in `./public/images/uploads`.

  - The image filename is saved in the `profilepic` field of the User model in the MongoDB database.
