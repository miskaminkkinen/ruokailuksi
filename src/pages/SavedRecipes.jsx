import { loadRecipe } from "../utils/storage"
import MacroSummary from "../components/MacroSummary";
import { Form, Card, Row, Col, ListGroup } from "react-bootstrap";



function SavedRecipes(){
    const recipes = loadRecipe();
    
    {recipes.length === 0 && <p>Ei tallennettuja reseptejä</p>}

    return(
        <>
        <h1 className="mb-4">Omat reseptit</h1>
        {recipes.length === 0 && <p className="text-muted">Ei tallennettuja reseptejä</p>}
        <Row>
            {recipes.map((recipe) => (
                <Col md = {4} key = {recipe.id} className = "mb-4">
                    <Card className = "h-100 shadow">
                        <Card.Body>
                            <Card.Title>{recipe.name}</Card.Title>
                            <ul className="small-text-muted mb-3">
                                {recipe.ingredients.map((ingredient => (
                                    <li key={ingredient.product.barcode}>
                                        {ingredient.product.name} {ingredient.grams} g
                                    </li>
                                )))}
                            </ul>
                            <MacroSummary macros = {recipe.macros} caloriesLabel="Kokonaiskalorit"/>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>


        
        </>
    )
}

export default SavedRecipes