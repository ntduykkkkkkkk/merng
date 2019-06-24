import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gpl from 'graphql-tag';
import { Grid, Loader } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const FETCH_POSTS_QUERY = gpl`
query getPosts {
    getPosts {
      id
      body
      createdAt
      username
      comments{
        id
        username
        createdAt
        body
      }
      likes{
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
}
`

function Home() {
    const { loading, data: { getPosts : posts }} = useQuery(FETCH_POSTS_QUERY);
    return (
        <Grid columns={3} divided>
            <Grid.Row className="page-title">
                <h1>Recently Post</h1>
            </Grid.Row>               
            <Grid.Row>
                {loading ? (
                    <Loader active>
                        Loading
                    </Loader>
                ) : (
                    posts && posts.map(post => (
                            <Grid.Column key={post.id} style= {{ marginBottom: 20 }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                )}
            </Grid.Row>                      
        </Grid>
    )
}


export default Home;