import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Pagination, PaginationItem} from '@material-ui/lab'
import useStyles from "../styles";
import { Link } from "react-router-dom";
import { getPosts
 } from "../actions/postActions";

export const Paginate = ({page}) => {
    const classes = useStyles()
    const dispatch = useDispatch()


    useEffect(() => {
      if(page) dispatch(getPosts(page))
    }, [page]);
    
  return (
      <Pagination
      classes={{ul:classes.ul}}
      count={5}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
<PaginationItem {...item} component={Link} to={`/post?page=${1}`}/>
      )}
      />
  )
};
