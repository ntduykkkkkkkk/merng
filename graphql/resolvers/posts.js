const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');
const { AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postID }, context){
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postID);
                if(post){
                    return post;
                }
                else{
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context){
            const user = checkAuth(context);
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            })
            return post;
        },
        async deletePost(_, { postID }, context){
            const user = checkAuth(context);
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                const post = await Post.findById(postID)
                if(post){
                    if(user.username === post.username){
                        post.delete();
                        return posts;
                    }else{
                        throw new AuthenticationError('Action does not allow')
                    }
                }else{
                    throw new AuthenticationError('Post not found')
                }    
            } catch (err) {
                throw new Error(err)
            }
            
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
}