import { useState } from "react";
import {searchProduct, fetchProduct} from "../utils/api.js";
import { calculateRecipeMacros } from "../utils/Calculations.js";



function Recipes(){
    const[loading, setLoading] = useState(false);
    const[query, setQuery] = useState('');
    const[results, setResults] = useState([]);
    const[error, setError] = useState(null);
    const[ingredients, setIngredients] = useState([])


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

    function handleAdd(product){
        setIngredients([...ingredients, {product: product, grams: 100}]);
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
                    <button onClick={() => handleAdd(product)}>Lisää Reseptiin</button>
                </li>

            ))}
        </ul>   

        <ul> 

            {ingredients.map((ingredient) =>(
                <li key = {ingredient.product.barcode}>
                    {ingredient.product.brand}{ingredient.product.name}{ingredient.grams}
                </li>
            ))}
            
        </ul>

        <p>Kalorit: {recipeMacros.calories} kcal</p>
        <p>Proteiini: {recipeMacros.protein} </p>
        <p>Hiilihydraatit: {recipeMacros.carbs} </p>
        <p>Rasva: {recipeMacros.fats}</p>


    </div>
    );

}

export default Recipes

