import { useState } from "react";
import {searchProduct, fetchProduct} from "../utils/api.js";
import { calculateRecipeMacros } from "../utils/Calculations.js";
import { Modal, Button } from "react-bootstrap";
import { saveRecipe, loadRecipe } from "../utils/storage.js";



function Recipes(){
    const[loading, setLoading] = useState(false);
    const[query, setQuery] = useState('');
    const[results, setResults] = useState([]);
    const[error, setError] = useState(null);
    const[ingredients, setIngredients] = useState([]);
    const[selected, setSelected] = useState(null);
    const[grams, setGrams] = useState("100");
    const[recipeName, setRecipeName] = useState("");
    const[recipes, setRecipes] = useState(loadRecipe());


    async function handleSearch(){
    setLoading(true);
    setError(null); 
    

    try {
        const products = await searchProduct(query);
        setResults(products);
    } catch(error){
        setError("Tuotetta ei löydy!")
    } finally {
        setLoading(false);
    }
}

    function handleAdd(){
        const alreadyAdded = ingredients.some((ingredient) => ingredient.product.barcode === selected.barcode );

        if(alreadyAdded){
          setError("Tuote on jo reseptissä")
          setSelected(null)
          return;
        }

        setIngredients([...ingredients, {product: selected, grams: Number(grams)}]);
          setSelected(null);
          setGrams("100")
          setError(null)
        

        
    }
    function handleRemove(barcode){
        setIngredients(ingredients.filter((ingredient) => ingredient.product.barcode !== barcode ));
    }

    function handleSaveRecipe() {
        if(recipeName.trim() === "" || ingredients.length === 0 ){
            setError("Anna reseptille nimi ja lisää ainakin yksi aines")
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

        setRecipeName("")
        setIngredients([])
    }
   const recipeMacros = calculateRecipeMacros(ingredients);
    return(
    <div>
        <h1>Reseptit </h1>
        <label htmlFor = "query">Hae tuotetta</label>
        <input 
        id = "query"
        type = "text"
        value = {query}
        onChange={(event) => setQuery(event.target.value)}
        />

        <button onClick = {handleSearch} disabled = {loading}>Hae</button>    
        {loading && <p>Ladataan...</p>}   
        {error && <p>{error}</p>}

        <ul>
            {results.map((product) => (
                <li key = {product.barcode}>
                    {product.brand && `${product.brand}: `}{product.name}: {product.kcal} kcal: {product.carbs}Hiilihydaatit / 100g {product.protein}: Proteiini / 100g {product.fats}: Rasva / 100g
                    <button onClick={() => setSelected(product)}>Lisää Reseptiin</button>
                </li>

            ))}
        </ul>   

        <ul> 

            {ingredients.map((ingredient) =>(
                <li key = {ingredient.product.barcode}>
                    {ingredient.product.brand}: {ingredient.product.name}: {ingredient.grams} 
                    <Button variant = "outline-danger" size = "sm" onClick={() => handleRemove(ingredient.product.barcode)}>Poista</Button>
                </li>
            ))}
            
        </ul>

        <p>Kalorit: {recipeMacros.calories} kcal</p>
        <p>Proteiini: {recipeMacros.protein} </p>
        <p>Hiilihydraatit: {recipeMacros.carbs} </p>
        <p>Rasva: {recipeMacros.fats}</p>

        <label htmlFor="recipeName">Reseptin nimi</label>
        <input 
        id = "recipeName"
        type = "text"
        value = {recipeName}
        onChange={(event) => setRecipeName(event.target.value)}
        />

        <Button onClick={handleSaveRecipe}>Tallenna</Button>




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
            <Button variant = "secondary" onClick={() => setSelected(null)}>Peruuta</Button>
            <Button onClick = {handleAdd}>Lisää Reseptiin</Button>
        </Modal.Footer>
    </Modal>

    </div>
    );

}

export default Recipes

