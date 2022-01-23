import React from 'react';
import {Pagination, PaginationItem} from '@material-ui/lab'
import useStyles from "../styles";
import { Link } from "react-router-dom";

export const Paginate = () => {
    const classes = useStyles()
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
