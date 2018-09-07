const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLID
} = graphql;

//sample data
const bookList = [
  { id: "1", title: "Half Girlfriend", genre: "Romance novel", authorId: "2" },
  { id: "2", title: "One Indian Girl", genre: "Romance novel", authorId: "2" },
  { id: "3", title: "Revolution 2020", genre: "Romance novel", authorId: "2" },
  {
    id: "4",
    title: "The Blue Umbrella",
    genre: "Literary fiction",
    authorId: "1"
  },
  { id: "5", title: "Delhi is not far", genre: "Fiction", authorId: "1" },
  { id: "6", title: "Road to mussoorie", genre: "Fiction", authorId: "1" },
  {
    id: "7",
    title: "The ministry of atmost Happiness",
    genre: "Fiction",
    authorId: "3"
  },
  {
    id: "8",
    title: "The god of small things",
    genre: "Fiction",
    authorId: "3"
  },
  {
    id: "9",
    title: "Things that can and cannot be said",
    genre: "Biography",
    authorId: "3"
  }
];

const authorList = [
  { id: "1", name: "Ruskin Bond", age: 84 },
  { id: "2", name: "Chethan Bagat", age: 30 },
  { id: "3", name: "Arundhati Roy", age: 56 }
];

const BookType = new GraphQLObjectType({
  name: "BookType",
  desc: "a simple Book type",
  fields: () => ({
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authorList, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  desc: "a simple Author type",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(bookList, { authorId: parent.id });
      }
    }
  })
});

//root queries
const RootQuery = new GraphQLObjectType({
  name: "Rootquery",
  fields: {
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authorList, { id: args.id });
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(bookList, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return bookList;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authorList;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
