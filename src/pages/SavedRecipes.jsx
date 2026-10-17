import { loadRecipe } from "../utils/storage"
import MacroSummary from "../components/MacroSummary";
import { calculateRecipeMacros } from "../utils/Calculations";



function SavedRecipes(){
    const recipes = loadRecipe();
    
    {recipes.length === 0 && <p>Ei tallennettuja reseptejä</p>}

    return(
        <div>

            <h1>Omat reseptit</h1>
            {recipes.length === 0 && <p>Ei tallennettuja reseptejä</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key = {recipe.id}>
                        <h3>{recipe.name}</h3>
                        <MacroSummary macros = {recipeMacros}/>
                    </li>
                ))}
            </ul>


        </div>
    )
}

export default SavedRecipes