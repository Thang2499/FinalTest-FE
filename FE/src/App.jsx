import './index.css'
import './App.css'
import { useState } from 'react'
import { Routes,Route, Outlet, Link } from 'react-router-dom'
import Teacher from './teacher'
import Nav from './nav'
import JobPosition from './jobPosition'



function App() {

  return (
    <>
    <h3 className='Title'>School System</h3>
    <div className='flex'>
    <Nav/>
    <div className='w-90'>
     <Routes>
      <Route path='/teacher' element={<Teacher/>}/>
      <Route path='/jobPosition' element={<JobPosition/>}/>
    </Routes>
    </div>
    </div>
    </>
  )
}

export default App
