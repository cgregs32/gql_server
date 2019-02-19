import { db } from "../pgAdaptor";
import { GraphQLObjectType, GraphQLID } from "graphql";
import { UserType, PostType } from "./types";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
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
      }
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
    }
  }
});

exports.query = RootQuery;