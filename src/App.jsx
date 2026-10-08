
import {Routes, Route, NavLink } from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap'
import Recipes from './pages/Recipes'
import UserDetails from './pages/UserDetails'
import WeeklyPlan from './pages/WeeklyPlan'

function App() {
  return(
  <>
  <Navbar bg = "dark" data-bs-theme = "dark">
    <Container>
      <Navbar.Brand>Ruokailuksi</Navbar.Brand>
      <Nav>
        <Nav.Link as = {NavLink} to = "/" end> Viikkosuunnitelma </Nav.Link>
        <Nav.Link as = {NavLink} to = "/reseptit"> Reseptit </Nav.Link>
        <Nav.Link as = {NavLink} to = "/tiedot"> Omat tiedot </Nav.Link>
      </Nav>
    </Container>
  </Navbar>

  <Container className = "py-4">
    <Routes>
      <Route path="/" element = {<WeeklyPlan />} />
      <Route path="/reseptit" element = {<Recipes />} />
      <Route path="/tiedot" element = {<UserDetails />} />
    </Routes>
  </Container>
  </>
  )
}

export default App
