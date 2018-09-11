const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

//import graphql schema
const qlschema = require("./schema/schema");

//initialize the express instance
const app = express();

//allow cross-origin-resource-sharing
app.use(cors());

//declare the PORT number for the serve to use
const PORT = process.env.port || 8081;

//connect to mongodb db
mongoose
  .connect(
    "mongodb://cibi:mdb123@ds151612.mlab.com:51612/graphql_tt",
    { useNewUrlParser: true }
  )
  .then(res => {
    console.log("connected to mongodb");
  });

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

app.get("/login", (req, res) => {
  res.send("enter iusernsm");
});

//setup server to listen to port
app.listen(PORT, () => {
  console.log(`now listening on port:${PORT}`);
});
