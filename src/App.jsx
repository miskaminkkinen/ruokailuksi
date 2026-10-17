
import {Routes, Route, NavLink } from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap'
import Recipes from './pages/Recipes'
import UserDetails from './pages/UserDetails'
import SavedRecipes from './pages/SavedRecipes'

function App() {
  return(
  <>
  <Navbar bg = "primary" data-bs-theme = "dark">
    <Container>
      <Navbar.Brand className='fw-bold'>Ruokailuksi</Navbar.Brand>
      <Nav className='gap-4 ms-auto-gap-4'>
        <Nav.Link as = {NavLink} to = "/" end> Reseptit </Nav.Link>
        <Nav.Link as = {NavLink} to = "/reseptit"> Luo reseptejä </Nav.Link>
        <Nav.Link as = {NavLink} to = "/tiedot"> Omat tiedot </Nav.Link>
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
