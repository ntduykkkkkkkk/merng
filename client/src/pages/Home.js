import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { Grid, Loader, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';

function Home() {
    const { loading, data: { getPosts : posts }} = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext);
    return (
        <Grid columns={3} divided>
            <Grid.Row className="page-title">
                <h1>Recently Post</h1>
            </Grid.Row>   
            <Grid.Row>
                { user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
            </Grid.Row>            
            <Grid.Row>
                {loading ? (
                    <Loader active>
                        Loading
                    </Loader>
                ) : (
                    <Transition.Group>
                        {
                            posts && posts.map(post => (
                                <Grid.Column key={post.id} style= {{ marginBottom: 20 }}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))}
                        }
                    </Transition.Group>
                )}
            </Grid.Row>                      
        </Grid>
    )
}

export default Home;