import { ListGroup } from "react-bootstrap";

 function MacroSummary({macros, caloriesLabel = "Kalorit"}){
    return(
    <ListGroup variant = "flush">               
                <ListGroup.Item className="d-flex-justify-content-between">
                  <span>{caloriesLabel}: </span>
                  <strong>{macros.calories} kcal</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex-justify-content-between">
                  <span>Proteiini: </span>
                  <strong>{macros.protein}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex-justify-content-between">
                  <span>Rasva: </span>
                  <strong>{macros.fats}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex-justify-content-between">
                  <span>Hiilihydraatit: </span>
                  <strong>{macros.carbs}</strong>
                </ListGroup.Item>
              </ListGroup>
    )
}

export default MacroSummary