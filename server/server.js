const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");

//import graphql schema
const qlschema = require("./schema/schema");

//initialize the express instance
const app = express();

//allow cross-origin-resource-sharing
app.use(cors());

//declare the PORT number for the serve to use
const PORT = process.env.port || 8081;

//setup graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: qlschema,
    graphiql: true
  })
);

//handle the routes
app.get("/", (req, res) => {
  res.send(
    "Hello! Welcome to graphql tutorial. Please naviagate to /graphql to make a request"
  );
});

//setup server to listen to port
app.listen(PORT, () => {
  console.log(`now listening on port:${PORT}`);
});
