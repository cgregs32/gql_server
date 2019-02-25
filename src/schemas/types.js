import { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLList,
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
    last_logged_in: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
      const query = `SELECT * FROM posts WHERE creator_id=$1`;
      const values = [parent.id];
      return db
        .multi(query, values)
        .then(res => res[0])
        .catch(err => err);
      }
    }
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