import { 
  GraphQLObjectType, 
  GraphQLString,
} from "graphql";
import { db } from "../pgAdaptor";

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    joined: { type: GraphQLString },
    last_logged_in: { type: GraphQLString }
  })
});

const PostType = new GraphQLObjectType({
  name: "Post",
  type: "Query",
  fields: () => ({
    id: { type: GraphQLString },
    creator_id: { type: GraphQLString },
    created: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    contents: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        console.log(parent)
        const query = `SELECT * FROM users WHERE id=$1`;
        const values = [parent.creator_id];
        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);

      }
    }
  })
});

exports.UserType = UserType;
exports.PostType = PostType;