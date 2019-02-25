import { db } from "../pgAdaptor";
import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import { UserType, PostType, AllPosts } from "./types";

const RootQuery = new GraphQLObjectType({
  // entry point into the data
  name: "RootQueryType",
  type: "Query",
  fields: {
    //this is the name we querry to
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM posts WHERE id=$1`;
        const values = [args.id];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM users WHERE id=$1`;
        const values = [args.id];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args) {
        const query = `SELECT * FROM posts`;
        return db
          .multi(query)
          .then(res => res[0])
          .catch(err => err);
      }
    }
  }
});

exports.query = RootQuery;