import './App.css'
import { NavLink, Route, Redirect } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Header from './components/Header'

function App() {
  return (
    <div>
      <Header></Header>
      <div className='row'>
        <div className='col-xs-2 col-xs-offset-2'>
          <div className='list-group'>
            <NavLink className='list-group-item' to='/about'>
              About
            </NavLink>
            <NavLink className='list-group-item' to='/home'>
              Home
            </NavLink>
          </div>
        </div>
        <div className='col-xs-6'>
          <div className='panel'>
            <Route component={About} path='/about'></Route>
            <Route component={Home} path='/home'></Route>
            <Redirect to='/home'></Redirect>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
