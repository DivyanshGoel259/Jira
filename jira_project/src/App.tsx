import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Hero } from './pages/Hero/Hero'
import { Signup } from './pages/auth/Signup/Signup'
import { Signin } from './pages/auth/Signin/Signin'
import { Header } from './components/Header'
import { RequireAuth } from './RequireAuth'
import { OnBoarding } from './pages/onboarding/OnBoarding'
import { NotFoundPage } from './pages/Error/404Page'
import { Organization } from './pages/organization/Organization'

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
          <Route path='/onboarding' element={<RequireAuth><OnBoarding/></RequireAuth>} />
          <Route path='/organization/:orgId' element={<RequireAuth><Organization/></RequireAuth>} />
          <Route path='*' element={<NotFoundPage/>} /> 

        </Routes>
        
      </BrowserRouter>

    </>
  )
}

export default App
