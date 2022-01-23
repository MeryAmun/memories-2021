import React, { useEffect } from 'react'

const Alert = ({type, msg, remAlert,list}) => {

  useEffect(() => {
const timeout = setTimeout(() => {
remAlert();
}, 3000)
return () => clearTimeout(timeout)
  },[list])
  return (
    <p className={`alert alert-${type}`}>
    {msg}
    </p>
  )
}

export default Alert
