import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import { Auth } from './components/Auth/Auth'
import Container from '@mui/material/Container'
import { PostDetails } from './components/PostDetails/PostDetails'
import { Home } from './components/Home/Home'
import { Navbar } from './components/navbar/Navbar'
import React from 'react'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() =>  <Redirect to='/posts'/>} />
           <Route path='/posts' exact component={Home} />
           <Route path='/posts/search' exact component={Home} />
           <Route path='/posts/:id' exact component={PostDetails} />
          <Route path='/auth' exact component={() => (!user ? <Auth/> : <Redirect to='/posts' />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}
export default App
