import { db } from "../pgAdaptor";
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from "graphql";
import { PostType } from "./types";

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {
        creatorId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO post(creator_id, created, title, description, contents) VALUES ($1, $2, $3, $4, $5) RETURNING title`;
        const values = [
          args.creatorId,
          new Date(),
          args.title,
          args.description,
          args.contents
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;