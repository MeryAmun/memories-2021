import React, { useEffect, useState } from 'react'
import { createPost, updatePost } from '../../actions/postActions'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import FileBase from 'react-file-base64'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import useStyles from './styles'

export const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((posts) =>
    currentId ? posts.find((p) => p._id === currentId) : null
  )
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })
  const classes = useStyles()
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentId) {
      dispatch(createPost({ ...postData, name: user?.result?.name }))
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    }
    clear()
  }

  const clear = () => {
    setCurrentId(0)
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? 'Editing' : 'Creating'} a Memory
        </Typography>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          fullWidth
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          fullWidth
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
          fullWidth
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

