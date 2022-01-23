import { AppContext, useGlobalContext } from './context'
import React, { useContext } from 'react'

import { FaBars } from 'react-icons/fa'

const Home = () => {
  // const data1 = useContext(AppContext)
  // console.log(data1)
  // using custom hook
  const { openSidebar, openModal } = useGlobalContext()

  return (
    <main>
      <button className='sidebar-toggle' onClick={openSidebar}>
        <FaBars />
      </button>
      <button className='btn' onClick={openModal}>
        show modal
      </button>
    </main>
  )
}

export default Home
