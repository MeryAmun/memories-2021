import React, { useEffect, useState } from 'react'

import Container from '@mui/material/Container'
import { Form } from '../form/Form'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import { Posts } from '../posts/Posts'
import { getPosts } from '../../actions/postActions'
import { useDispatch } from 'react-redux'
import useStyles from './styles'

export const Home = () => {
  const classes = useStyles()
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])

  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justify='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}
