import './index.css'

import { applyMiddleware, compose, createStore } from 'redux'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDom from 'react-dom'
import { ThemeProvider } from '@mui/styles'
import postReducer from './reducers/postReducer'
import thunk from 'redux-thunk'

let theme = createTheme()
theme = responsiveFontSizes(theme)

const store = createStore(postReducer, compose(applyMiddleware(thunk)))

ReactDom.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
