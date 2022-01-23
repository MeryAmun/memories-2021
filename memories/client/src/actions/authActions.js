import * as api from '../api/index.js'

import { AUTH, LOGOUT } from '.././constants/actionTypes'

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)

    dispatch({ type: AUTH, payload: data })
    localStorage.setItem('profile', JSON.stringify(data))

    history.push('/')
  } catch (error) {
    console.log(error)
  }
}

export const signout = (history) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT })
    localStorage.clear()
    history.push('/')
  } catch (error) {
    console.log(error)
  }
}

export const google = (result, token, history) => async (dispatch) => {
  try {
    dispatch({ type: AUTH, payload: { result, token } })
    localStorage.setItem('profile', JSON.stringify(result, token))

    history.push('/')
  } catch (error) {
    console.log(error)
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)

    dispatch({ type: AUTH, data })

    history.push('/')
  } catch (error) {
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  }
}
