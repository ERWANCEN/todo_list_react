import { Route, Routes } from 'react-router'

import './App.css'

import Todo from './components/todo/Todo'
import Template from './components/nav-link/Template'
import Nothing from './components/requete/Nothing'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Template/>}>
        <Route path='/todo' element={<Todo/>} />
      </Route>
      <Route path='*' element={<Nothing/>} />
    </Routes>
  )
}

export default App
