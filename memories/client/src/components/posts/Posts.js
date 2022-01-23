import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { Post } from './post/Post'
import React from 'react'
import { useSelector } from 'react-redux'
import useStyles from './styles'

export const Posts = ({ setCurrentId }) => {
  const posts = useSelector((posts) => posts)
  const classes = useStyles()

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
}
