import { 
  GraphQLObjectType, 
  GraphQLString,
} from "graphql";

const UserType = new GraphQLObjectType({
  name: "Farts",
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
    contents: { type: GraphQLString }
  })
});

exports.UserType = UserType;
exports.PostType = PostType;