import React, { useContext } from 'react'
import { Button, Card, Image, Label, Icon } from 'semantic-ui-react'
import monment from 'moment';
import { Link } from 'react-router-dom';
import gpl from 'graphql-tag';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

function commentOnPost(){
    console.log("comment")
}

function PostCard({post: {body, id, username, createdAt, likeCount, commentCount, likes}}){
    const { user } = useContext(AuthContext)
    return (
        <Card fluid>
            <Card.Content>
                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{monment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <LikeButton user={user} post={{ id, likes, likeCount }}/>
            <Button as='div' labelPosition='right' onClick={commentOnPost} post={`post/${id}`}>
                <Button color='blue' basic>
                    <Icon name='comment' />
                </Button>
                <Label basic color='teal' pointing='left'>
                    {commentCount}
                </Label>
            </Button>
            { user && user.username === username && (
                <Button color='red' floated="right" style={{margin: 0}}>
                    <Icon name='trash' />
                </Button>
            )}
            
            </Card.Content>
        </Card>
    )
}

const DELETE_POST_MUTATION = gpl`
    mutation deletePost($postID: String!){
        deletePost(postID: $postID){
            id
            username
            body
            createdAt
            likes{
                id
                username
                createdAt
            }
            comments{
                id
                username
                body
                createdAt
            }
            likeCount
            commentCount
        }
    }
`
export default PostCard;