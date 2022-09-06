import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Pagination, PaginationItem} from '@material-ui/lab'
import useStyles from "../styles";
import { Link } from "react-router-dom";
import { getPosts
 } from "../actions/postActions";

export const Paginate = ({page}) => {
  const {numberOfPages} = useSelector((posts) => posts)
    const classes = useStyles()
    const dispatch = useDispatch()
   


    useEffect(() => {
      if(page) dispatch(getPosts(page))
    }, [page,dispatch]);
    
  return (
      <Pagination
      classes={{ul:classes.ul}}
      count={numberOfPages}
      variant="outlined"
      color="primary"
      page={Number(page) || 1 }
      renderItem={(item) => (
<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
      )}
      />
  )
};
