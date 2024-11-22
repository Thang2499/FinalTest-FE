import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
   <>
      <div className='container-nav'>
      <ul className='nav'>
        <li>Thống kê</li>
        <li>Lớp học</li>
        <li>Học sinh</li>
       <Link to ='/teacher'> <li>Giáo viên</li></Link>
        <Link to='/jobPosition'><li>Vị trí công tác</li></Link>
      </ul>
      </div> 
    </>
  )
}

export default Nav