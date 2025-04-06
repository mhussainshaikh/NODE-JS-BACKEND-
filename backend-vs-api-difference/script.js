// Backend in JavaScript:
// The backend is the server-side of a web application that handles logic, database interactions, and business processes.
// It is responsible for managing data, user authentication, and server logic.
// In JavaScript, Node.js("a js run time environment that uses Google's V8 JavaScript engine") is commonly used for backend development.
// API (Application Programming Interface):
// An API is a set of rules and endpoints that allow communication between different software applications.
// In the context of JavaScript, APIs are created using backend frameworks like Express.js to send and receive data, typically in JSON format.
// APIs allow the frontend (user interface) to communicate with the backend server.
// Key Difference:
// The backend is the whole server-side environment, while the API is just an interface or pathway that allows data exchange between the client (frontend) and the backend server.//

// ✅ Methods That Return a New Array //

//(These do not modify the original array.)//

// map, filter , slice, flat.

///⚡ Methods That Return a Value (Not a New Array) ///

// reduce , find, findIndex, indexOf, includes, some, every, join, concat, toString, valueOf , foreach.

// ✅ Conclusion:

// Use async/await and fetch when retrieving data from an external source, such as a third-party API, database, or another server.
// If the data is generated inside your backend (without fetching from another source), you don’t need fetch or async/await.

// In the frontend, we use async/await and fetch to get data from the backend because the backend provides the API for the frontend to consume.

// Similarly, in the backend, when we create our own API and return data directly, we don’t need async/await or fetch because we are generating the response ourselves.

// However, when the backend needs to get data from a third-party API, we use async/await and fetch, since the data comes from an external source and must be retrieved before sending it to the frontend.

// In a backend API, we use res.status().json() to send data to the frontend.  

// When fetching data from a third-party API in the backend, we use response.json() to parse the response.  We also check if (!response.ok) to ensure accuracy and handle errors properly.  //

// In the frontend, we do not use res.status().json() because it's only rely  for backend responses.  
// Instead, we use try...catch to handle errors and console.log() to debug the response.  
// However, we still use if (!response.ok) to check for errors when fetching data.  
