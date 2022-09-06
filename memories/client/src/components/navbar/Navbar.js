import { Link, useHistory, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import decode from 'jwt-decode'
import memoriesLogo from '../images/memories-Logo.png'
import memoriesText from '../images/memories-Text.png'
import { signout } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import useStyles from './style'

export const Navbar = () => {
  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const logout = () => {
    dispatch(signout(history))
    history.push('/')
    setUser(null)
  }

  useEffect(() => {
    const token = user?.token
    //JWT...

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
    //npm install jwt-decode
    setUser(JSON.parse(localStorage.getItem('profile')))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location,user?.token])

  return (
    <AppBar
      className={classes.appBar}
      direction='row'
      position='static'
      color='inherit'
    >
      <Link to='/' className={classes.brandContainer}>
      <img src={memoriesText}   alt='icon' height='45px'/>
        <img src={memoriesLogo}  className={classes.image} alt='icon' height='40px'/>
      
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.portfolio}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
