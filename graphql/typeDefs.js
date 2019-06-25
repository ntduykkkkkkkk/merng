const { gql } = require('apollo-server');

module.exports = gql`
    type Posts {
        id: String!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }

    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String! 
    }

    type Like{
        id: ID!
        createdAt: String!
        username: String!
    }

    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
       getPosts: [Posts]
       getPost(postID: ID!): Posts
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Posts!
        deletePost(postID: ID!): [Posts]
        createComment(postID: String!, body: String!): Posts!
        deleteComment(postID: ID!, commentId: ID!): Posts!
        likePost(postID: ID!): Posts!
    }
    type Subscription {
        newPost: Posts!
    }
`