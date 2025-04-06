# My Awesome JS Project (Nodejs + Express + Mongoose)

## Description

This is a simple JavaScript project using Node.js(a runtime of js) and Express to build a web server and mongoose for store data.

# Link of Data Modelling eraser.io(https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

Great question! Why don’t we use fetch when connecting to MongoDB?

1️⃣ fetch is for HTTP Requests, Not Databases
fetch is used to make HTTP requests to web APIs (e.g., fetch("https://api.example.com/data")).

MongoDB is not an HTTP API—it uses a database driver (mongoose.connect()) to connect.

2️⃣ mongoose.connect() Uses a Direct Database Protocol
MongoDB does not work over HTTP like a REST API.

Instead, it uses the MongoDB protocol (via the mongoose library) to communicate efficiently.

the frontend fetch use try catch and async await and write database in mongoose are same but we dont use fetch in mongoose

🚀 Best Approach? Use Multer to handle file uploads and then upload them to Cloudinary for storage and optimization.

// use nodejs beacuse it make possible to run js code on server side//
Node.js makes JavaScript suitable for backend development by providing:

Access to the file system, databases, and network.

A built-in asynchronous event-driven architecture.

A package manager (NPM - Node Package Manager) to install libraries and other pacakges and it can be consumed by javascript to speed up productivity.
