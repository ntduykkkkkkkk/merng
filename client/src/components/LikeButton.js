import React, { useState, Component, useEffect } from 'react';
import { Button, Label, Icon, Modal, Header } from 'semantic-ui-react'
import gpl from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

function LikeButton({user, post: { id, likes, likeCount }}){
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        }else{
            setLiked(false)
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables:{ postID : id}
    })

    const likeButton  = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ): (
            <Button color='yellow' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Modal trigger={<Button color='teal' basic><Icon name='heart' /></Button>} closeIcon>
            <Header icon='archive' content='Required' />
            <Modal.Content>
            <p>
                You Must Be Login To This Action
            </p>
            </Modal.Content>
            <Modal.Actions>
                <Button as={Link} to={`/login`} color='teal' basic>
                    <Icon name='key' /> Navigate To Login Page
                </Button>
            </Modal.Actions>
        </Modal>
        
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gpl `
    mutation likePost($postID: ID!){
        likePost(postID: $postID){
            id
            likes{
                id
                username
                createdAt
            }
            likeCount
        }
    }
`

export default LikeButton;