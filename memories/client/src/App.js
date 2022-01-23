import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Auth } from './components/Auth/Auth'
import Container from '@mui/material/Container'
import { Home } from './components/Home/Home'
import { Navbar } from './components/navbar/Navbar'
import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}
export default App
