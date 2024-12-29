import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './assets/bootstrap-5.3.3/dist/css/bootstrap.min.css'
import './assets/bootstrap-5.3.3/dist/js/bootstrap.min.js'
import Navbar from './components/navbar/Navbar.jsx'
import Home from './components/home/Home.jsx'
import Todo from './components/todo/Todo.jsx'
import TodoDetail from './components/todo/TodoDetail.jsx'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/todo' element={<Todo/>}/>
        <Route path='/todo/detail/:id' element={<TodoDetail/>}/>
      </Routes>
    </Router>
  )
}

export default App
