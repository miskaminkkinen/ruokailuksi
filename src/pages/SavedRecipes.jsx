import { loadRecipe } from "../utils/storage"



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
                        <p>Kalorit: {recipe.macros.calories} kcal</p>
                        <p>Proteiini: {recipe.macros.protein} </p>
                        <p>Hiilihydraatit: {recipe.macros.carbs} </p>
                        <p>Rasva: {recipe.macros.fats}</p>
                    </li>
                ))}
            </ul>


        </div>
    )
}

export default SavedRecipes