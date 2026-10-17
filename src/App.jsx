
import {Routes, Route, NavLink, Link } from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap'
import Recipes from './pages/Recipes'
import UserDetails from './pages/UserDetails'
import SavedRecipes from './pages/SavedRecipes'


function App() {
  return(
  <>
  <Navbar bg = "primary" data-bs-theme = "dark">
    <Container>
      <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
      <img
       src = {`${import.meta.env.BASE_URL}food-svgrepo-com.svg`}
       alt = ""
       height="32"
       className='me-2'
       />
      Ruokailuksi</Navbar.Brand>
      <Nav className='gap-4 ms-auto-gap-4'>
        <Nav.Link as = {NavLink} to = "/" end> Reseptit </Nav.Link>
        <Nav.Link as = {NavLink} to = "/reseptit"> Luo reseptejä </Nav.Link>
        <Nav.Link as = {NavLink} to = "/tiedot"> TDEE Laskuri </Nav.Link>
      </Nav>
    </Container>
  </Navbar>

  <Container className = "py-4">
    <Routes>
      <Route path="/" element = {<SavedRecipes />} />
      <Route path="/reseptit" element = {<Recipes />} />
      <Route path="/tiedot" element = {<UserDetails />} />
    </Routes>
  </Container>
  </>
  )
}

export default App
