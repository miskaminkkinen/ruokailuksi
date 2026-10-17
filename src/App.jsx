
import {Routes, Route, NavLink, Link } from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap'
import Recipes from './pages/Recipes'
import TdeeCalc from './pages/TdeeCalc'
import SavedRecipes from './pages/SavedRecipes'


function App() {
  return(
  <>
  <Navbar bg = "primary" data-bs-theme = "dark" expand = "md">
    <Container>
      <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
      <img
       src = {`${import.meta.env.BASE_URL}food-svgrepo-com.svg`}
       alt = ""
       height="32"
       className='me-2'
       />
      Ruokailuksi</Navbar.Brand>

      <Navbar.Toggle aria-controls="main-nav" />

      <Navbar.Collapse id = "main-nav" >
      <Nav className='gap-4 ms-auto-gap-4'>
        <Nav.Link as = {NavLink} to = "/" end> Reseptit </Nav.Link>
        <Nav.Link as = {NavLink} to = "/reseptit"> Luo reseptejä </Nav.Link>
        <Nav.Link as = {NavLink} to = "/tdee"> TDEE Laskuri </Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  <Container className = "py-4">
    <Routes>
      <Route path="/" element = {<SavedRecipes />} />
      <Route path="/reseptit" element = {<Recipes />} />
      <Route path="/tdee" element = {<TdeeCalc />} />
    </Routes>
  </Container>

<footer className="text-center text-muted small py-4">
  Ravintotiedot: <a href="https://world.openfoodfacts.org" target="_blank" rel="noreferrer">Open Food Facts</a> (ODbL)
</footer>
  </>
  )
}

export default App
