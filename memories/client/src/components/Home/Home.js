import React, {  useState } from 'react'

import Container from '@mui/material/Container'
import { Form } from '../form/Form'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Grow from '@mui/material/Grow'
import { Posts } from '../posts/Posts'
import {  getPostsBySearch } from '../../actions/postActions'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
import {Paginate} from '../Pagination'
import {TextField, Button} from '@mui/material'
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input'


function useQuery(){
  return new URLSearchParams(useLocation().search);
}

export const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery')
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  

  


const searchPost = () => {
  if(search.trim() || tags){
    //dispatch
    dispatch(getPostsBySearch({search, tags:tags.join(',')}));
    history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
  }else{
    history.push('/');
  }
}

const handleKeyPress = (e) => {
if(e.keyCode === 13){
  //search
  searchPost();
}
}

const handleAdd = (tag) => setTags([...tags, tag]);
const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete ));



  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          className={classes.gridContainer}
          justify='space-between'
          alignItems='stretch' 
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={3}>
          <div className={classes.appBarSearch} position='static' color='inherit' elevation={6}>
          <TextField name='search' variant='outlined' label='Search Memories' fullWidth value={search}
          onKeyPress={handleKeyPress}
           onChange={(e) => setSearch(e.target.value)}/>
           <ChipInput
           style={{margin:'10px 0'}}
           value={tags}
           onAdd={handleAdd}
           onDelete={handleDelete}
           label='Search by Tags'
           variant='outlined'/>
           <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
          </div>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
           {
             (!searchQuery && !tags.length) && (

              <Paper elevation={6} className={classes.pagination}>
            <Paginate  page={page}/>
            </Paper>
             )
           }
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}
