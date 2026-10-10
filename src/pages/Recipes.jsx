import { useState } from "react";
import {searchProduct, fetchProduct} from "../utils/api.js";



function Recipes(){
    const[loading, setLoading] = useState(false);
    const[query, setQuery] = useState('');
    const[results, setResults] = useState([]);
    const[error, setError] = useState(null);

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
                </li>

            ))}
        </ul>


    </div>
    );

}

export default Recipes

