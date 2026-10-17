import { useState } from "react";
import { searchProduct, fetchProduct } from "../utils/api.js";
import { calculateRecipeMacros } from "../utils/Calculations.js";
import {
  Modal,
  Button,
  FormLabel,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { saveRecipe, loadRecipe } from "../utils/storage.js";
import MacroSummary from "../components/MacroSummary.jsx";
import { Form, Card, Row, Col, ListGroup } from "react-bootstrap";

function Recipes() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [grams, setGrams] = useState("100");
  const [recipeName, setRecipeName] = useState("");
  const [recipes, setRecipes] = useState(loadRecipe());

  async function handleSearch(code) {
    setLoading(true);
    setError(null);

    try {
      const product = await fetchProduct(code.trim());
      setResults([product]);
    } catch (error) {
      setError("Tuotetta ei löydy!");
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    const alreadyAdded = ingredients.some(
      (ingredient) => ingredient.product.barcode === selected.barcode,
    );

    if (alreadyAdded) {
      setError("Tuote on jo reseptissä");
      setSelected(null);
      return;
    }

    setIngredients([
      ...ingredients,
      { product: selected, grams: Number(grams) },
    ]);
    setSelected(null);
    setGrams("100");
    setError(null);
  }
  function handleRemove(barcode) {
    setIngredients(
      ingredients.filter(
        (ingredient) => ingredient.product.barcode !== barcode,
      ),
    );
  }

  function handleSaveRecipe() {
    if (recipeName.trim() === "" || ingredients.length === 0) {
      setError("Anna reseptille nimi ja lisää ainakin yksi aines");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: recipeName,
      ingredients: ingredients,
      macros: recipeMacros,
    };

    const updated = [...recipes, newRecipe];
    setRecipes(updated);
    saveRecipe(updated);

    setRecipeName("");
    setIngredients([]);
  }
  const recipeMacros = calculateRecipeMacros(ingredients);
  return (
    <>
 <Row>
    <Col md={7}>
      <Card className="mb-4 shadow">
        <Card.Body>
          <Card.Title>Hae tuotteita</Card.Title>
          <Form.Label htmlFor="query">Viivakoodi(löytyy pakkauksesta)</Form.Label>
          <InputGroup className="mb-3">
          <Form.Control
            inputMode = "numeric"
            id="query"
            placeholder="esim. 3017620422003"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        <Button disabled={loading} onClick={() => handleSearch(query)}>
          Hae 
        </Button>
        </InputGroup>

        {loading && <p>Ladataan...</p>}
        {error && <p>{error}</p>}

        <ListGroup classname = "mb-4">
        {results.map((product) => (
          <ListGroup.Item 
          key={product.barcode}
          className="d-flex justify-content-between align-items-center"
          >
            <div>
            <div classname="fw-semibold">
                {product.brand && `${product.brand}: `}{product.name}
            </div>
            <small classname="text-muted">
                {product.kcal} kcal | P {product.protein}| H {product.carbs}| R {product.fats} / 100g
            </small>
            </div>
            <button size = "sm" onClick={() => setSelected(product)}>
              Lisää Reseptiin
            </button>
  
        </ListGroup.Item>
        ))}
        </ListGroup>         
        </Card.Body>
      </Card>
    </Col>
    <Col md={5}>
      <Card className="mb-4 shadow">
        <Card.Body>
          <Card.Title>Oma resepti</Card.Title>
          <ListGroup classname = "mb-4">
            {ingredients.length === 0 && <p className="text-muted">Lisää aineksia hakemalla viivakoodilla.</p>}
        {ingredients.map((ingredient) => (

          <ListGroup.Item 
          key={ingredient.product.barcode}
          className="d-flex justify-content-between align-items-center"
          >
            <div classname="fw-semibold">
                {ingredient.product.brand && `{ingredient.product.brand}: `}{ingredient.product.name}: {ingredient.grams}g
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleRemove(ingredient.product.barcode)}
            >
              Poista
            </Button>
  
        </ListGroup.Item>
        ))}
        <MacroSummary macros = {recipeMacros} caloriesLabel="Kokonaiskalorit"/>

        <Form.Group className="mt-3 mb-3" controlId="recipeName">
        <Form.Label>Reseptin nimi</Form.Label>
          <Form.Control
          value={recipeName}
          onChange={(event) => setRecipeName(event.target.value)}
          placeholder="esim. Kanarisotto"
          />
        </Form.Group>

        <Button className="w-100" onClick={handleSaveRecipe}>
        Tallenna resepti
        </Button>
        </ListGroup>


        
          
        </Card.Body>
      </Card>
    </Col>
  </Row>


      <Modal show={selected !== null} onHide={() => setSelected(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{selected?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="grams">Grammaa (g)</label>
          <input
            type="number"
            id="grams"
            value={grams}
            onChange={(event) => setGrams(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Peruuta
          </Button>
          <Button onClick={handleAdd}>Lisää Reseptiin</Button>
        </Modal.Footer>
      </Modal>
</>
  
    )}

export default Recipes;
