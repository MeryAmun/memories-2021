import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import About from './pages/About'
import Error from './pages/Error'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import React from 'react'
import SingleCocktail from './pages/SingleCocktail'

// import pages

// import components

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/cocktail/:id'>
          <SingleCocktail />
        </Route>
        <Route path='/error'>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
