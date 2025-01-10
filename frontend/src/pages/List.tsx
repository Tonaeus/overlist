import React from 'react'
import ListSideBar from '../components/ListSideBar'

const List = () => {
  return (
    <div className='page'>
      <div className='page-side-bar'>
        <ListSideBar/>
      </div>
      <div className='page-content'>
        Content
      </div>
    </div>
  )
}

export default List