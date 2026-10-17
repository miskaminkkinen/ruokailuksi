import { useState, useEffect } from "react";
import {
  calculateTDEE,
  calculateBMR,
  calculateMacros,
} from "../utils/Calculations";
import { saveProfile, loadProfile } from "../utils/storage";
import { Form, Card, Row, Col, ListGroup } from "react-bootstrap";
import MacroSummary from "../components/MacroSummary";
const DEFAULT_PROFILE = {
  sex: "male",
  weight: "80",
  height: "180",
  age: "30",
  activityLevel: "active",
  goal: "maintain",
};

function UserDetails() {
  const initial = { ...DEFAULT_PROFILE, ...loadProfile() };
  const [weight, setWeight] = useState(initial.weight);
  const [height, setHeight] = useState(initial.height);
  const [age, setAge] = useState(initial.age);
  const [sex, setSex] = useState(initial.sex);
  const [activityLevel, setActivityLevel] = useState(initial.activityLevel);
  const [goal, setGoal] = useState(initial.goal);

  useEffect(() => {
    saveProfile({ weight, height, age, sex, activityLevel, goal });
  }, [weight, height, age, sex, activityLevel, goal]);

  const bmr = calculateBMR(Number(weight), Number(height), Number(age), sex);
  const tdee = calculateTDEE(bmr, activityLevel);
  const macros = calculateMacros(Number(tdee), Number(weight), goal);

  return (
    

      <Row>
        <Col md={6}>
          <Card className="mb-4 shadow" >
            <Card.Body>
              <Card.Title>Omat tiedot</Card.Title>
              <Form onSubmit={(event) => event.preventDefault()}>
                <Form.Group className="mb-3" controlId="weight">
                  <Form.Label>Paino (kg)</Form.Label>
                  <Form.Control
                    type="number"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="height">
                  <Form.Label>Pituus (cm)</Form.Label>
                  <Form.Control
                    type="number"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="age">
                  <Form.Label>Ikä </Form.Label>
                  <Form.Control
                    type="number"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="sex">
                  <Form.Label>Sukupuoli</Form.Label>
                  <Form.Select
                    value={sex}
                    onChange={(event) => setSex(event.target.value)}
                  >
                    <option value="male">Mies</option>
                    <option value="female">Nainen</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="activityLevel">
                  <Form.Label >Aktiivisuus</Form.Label>
                  <Form.Select
                    value={activityLevel}
                    onChange={(event) => setActivityLevel(event.target.value)}
                  >
                    <option value="sedentary">Ei liikuntaa</option>
                    <option value="light">Liikuntaa 1-2 kertaa viikossa</option>
                    <option value="moderate">
                      Liikuntaa 3-5 kertaa viikossa
                    </option>
                    <option value="active">
                      Liikuntaa 6-7 kertaa viikossa
                    </option>
                    <option value="veryActive">
                      Liikuntaa 8+ kertaa viikossa
                    </option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="goal">
                  <Form.Label>Tavoite</Form.Label>
                  <Form.Select
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                  >
                    <option value="maintain">Ylläpitää paino</option>
                    <option value="lose">Pudottaa painoa</option>
                    <option value="gain">Lisätä painoa</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md = {6}>
          <Card>
            <Card.Body>
              <Card.Title>Päivittäinen tarve</Card.Title>
              <ListGroup variant = "flush">
                <ListGroup.Item className="d-flex-justify-content-between">
                  <span>Perusaineenvaihdunta: </span>
                  <strong>{bmr} kcal</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex-justify-content-between">
                  <span>Kulutus: </span>
                  <strong>{tdee} kcal</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex-justify-content-between">
                  <MacroSummary macros = {macros} caloriesLabel="Tavoitekalorit"/>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    
  );
}

export default UserDetails;
