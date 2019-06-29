import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { useMutation } from '@apollo/react-hooks';
import gpl from 'graphql-tag';

function PostForm(){
    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY, data
            });
            values.body='';
        }
    })

    function createPostCallback(){
        createPost();
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create New Post</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Say Something..."
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error = { error ? true : false}
                />     
                <Button type="Submit" color="teal">
                    Submit
                </Button>              
            </Form.Field>
        </Form>
        {error && (
            <div className="ui error message" style={{marginBottom: 20}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
        </>
    )
}

const CREATE_POST_MUTATION = gpl`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            username
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

export default PostForm;