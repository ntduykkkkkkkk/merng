import React from 'react'
import { Button, Card, Image, Label, Icon } from 'semantic-ui-react'
import monment from 'moment';
import { Link } from 'react-router-dom';

function likePost(){
    console.log("Like")
}

function commentOnPost(){
    console.log("comment")
}

function PostCard({post: {body, id, username, createdAt, likeCount, commentCount, likes}}){
    return (
        <Card fluid>
            <Card.Content>
                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{monment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button as='div' labelPosition='right' onClick={likePost}>
                <Button color='teal' basic>
                    <Icon name='heart' />
                </Button>
                <Label as='a' basic color='teal' pointing='left'>
                    {likeCount}
                </Label>
            </Button>
            <Button as='div' labelPosition='right' onClick={commentOnPost}>
                <Button color='blue' basic>
                    <Icon name='comment' />
                </Button>
                <Label as='a' basic color='teal' pointing='left'>
                    {commentCount}
                </Label>
            </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard;