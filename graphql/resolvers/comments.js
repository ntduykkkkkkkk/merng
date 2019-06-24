const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Mutation: {
        createComment: async(_, { postID, body }, context) => {
            const user = checkAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors:{
                        body: 'Comment must not be empty'
                    }
                })
            }
            const post = await Post.findById(postID);
            if (post) {
                post.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            }else {
                throw new UserInputError('Post does not found')
            }
        },
        deleteComment: async(_, { postID, commentId}, context) => {
            const user = checkAuth(context);

            const post = await Post.findById(postID);
            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId);
                if(post.comments[commentIndex].username === user.username){
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }else{
                    throw new AuthenticationError('Action does not allowed')
                }
            }else{
                throw new UserInputError('Post does not found')
            }
        },
        likePost: async(_ , { postID }, context) => {
            const user = checkAuth(context);
            const post = await Post.findById(postID);
            if(post){
                if(post.likes.find((like) => like.username === user.username)){
                    // Post already likes, unlike it
                    post.likes = post.likes.filter((like) => like.username !== user.username)
                }else{
                    post.likes.push({
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })
                }
                await post.save();
                
                return post;
            }else{
                throw new UserInputError('Post does not found')
            }
        }
    }
}