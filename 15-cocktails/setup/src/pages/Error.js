import { Link } from 'react-router-dom'
import React from 'react'

const Error = () => {
  return (
    <section className='error-page section'>
      <div className='error-container'>
        <h1>Ooops!!! its a deadend </h1>
        <Link to='/' className='btn btn-primary'>
          Back Home
        </Link>
      </div>
    </section>
  )
}

export default Error
