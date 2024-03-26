import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import BusinessProfile from './pages/BusinessProfile'
import EditBusinessProfile from './pages/EditBusinessProfile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute';


export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />} >
          <Route path="/business-profile" element={<BusinessProfile />} />
          <Route path="/edit-business-profile" element={<BusinessProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App