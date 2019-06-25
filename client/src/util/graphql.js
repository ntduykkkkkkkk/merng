import gpl from 'graphql-tag';

export const FETCH_POSTS_QUERY = gpl`
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