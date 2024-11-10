import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Hero } from './pages/Hero/Hero'
import { Signup } from './pages/auth/Signup/Signup'
import { Signin } from './pages/auth/Signin/Signin'
import { Header } from './components/Header'

function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <div>
            <Header />
          </div>
        </header>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/sign-in' element={<Signin />} />          
        </Routes>
        
      </BrowserRouter>

    </>
  )
}

export default App
