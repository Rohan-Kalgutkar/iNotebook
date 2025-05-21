
require('dotenv').config();

const connectToMongo=require('./db');

const express = require('express')

connectToMongo();
var cors=require('cors')

const app = express()
const port = 5001



app.use(cors())


app.use(express.json());
//Available Routes
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))


 
app.get('/', (req, res) => {
  res.send('Hello Rohan!')
})

app.listen(port, () => {
  console.log(`iNotebook Backend app listening on port ${port}`)
  console.log(`iNotebook Backend app listening at http://localhost:${port}`)
})



///Commented Code


// const connectToMongo = require('./db');
// const express = require('express');

// // Connect to MongoDB
// connectToMongo();

// const app = express();
// // Using port 5000
// const port = 5001;

// // --- Add this logging middleware HERE ---
// // This middleware will run for *every* incoming request, before any other middleware or routes.
// app.use((req, res, next) => {
//     console.log(`--- Incoming Request: ${req.method} ${req.originalUrl} ---`);
//     // Pass the request to the next middleware or route handler
//     next();
// });
// // --- End of logging middleware ---


// // Middleware to parse JSON bodies from incoming requests
// app.use(express.json());

// // Available Routes
// // Mount auth routes at /api/auth
// app.use('/api/auth', require('./routes/auth'));

// // Mount notes routes at a DIFFERENT, logical path: /api/notes
// app.use('/api/notes', require('./routes/notes'));


// // Basic root route - responds to GET requests at the root URL '/'
// app.get('/', (req, res) => {
//   res.send('Hello Rohan!');
// });

// // Start the server and listen on the specified port
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
//   console.log(`Example app listening at http://localhost:${port}`);
// });
