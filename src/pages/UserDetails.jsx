import { useState, useEffect } from "react";
import { calculateTDEE, calculateBMR, calculateMacros } from "../utils/Calculations";
import { saveProfile, loadProfile } from "../utils/storage";



const DEFAULT_PROFILE ={
    sex: "male",
    weight: "80",
    height: "180",
    age: "30",
    activityLevel: "active",
    goal: "maintain",

}

function UserDetails() {
  const initial = {...DEFAULT_PROFILE, ...loadProfile()}
  const [weight, setWeight] = useState(initial.weight);
  const [height, setHeight] = useState(initial.height);
  const [age, setAge] = useState(initial.age);
  const [sex, setSex] = useState(initial.sex);
  const [activityLevel, setActivityLevel] = useState(initial.activityLevel);
  const [goal, setGoal] = useState(initial.goal);

  useEffect(() => {
    saveProfile({weight, height, age, sex, activityLevel, goal});
  }, [weight, height, age, sex, activityLevel, goal]);
     
  const bmr = calculateBMR(Number(weight), Number(height), Number(age), sex)
  const tdee = calculateTDEE(bmr, activityLevel)
  const macros = calculateMacros(Number(tdee), Number(weight), goal)

  return (
    <>
      <h1>Omat tiedot</h1>
      <div>
        <label htmlFor="weight">Paino (kg)</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="height">Pituus (cm)</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="age">Ikä</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="sex">Sukupuoli</label>
        <select
          id="sex"
          value={sex}
          onChange={(event) => setSex(event.target.value)}
        >
          <option value="male">Mies</option>
          <option value="female">Nainen</option>
        </select>
      </div>

      <div>
        <label htmlFor="goal">Tavoite</label>
        <select
          id="goal"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
        >
          <option value="lose">Pudottaa painoa</option>
          <option value="maintain">Ylläpitää painoa</option>
          <option value="gain">Lisätä painoa</option>
        </select>
      </div>

      <div>
        <label htmlFor="activityLevel">Aktiivisuustaso (krt/vko)</label>

        <select
          id="activityLevel"
          value={activityLevel}
          onChange={(event) => setActivityLevel(event.target.value)}
        >
          <option value="sedentary">Ei liikuntaa</option>
          <option value="light">Liikuntaa 1-2 kertaa viikossa</option>
          <option value="moderate">Liikuntaa 3-5 kertaa viikossa</option>
          <option value="active">Liikuntaa 6-7 kertaa viikossa</option>
          <option value="veryActive">Liikuntaa 8+ kertaa viikossa</option>
        </select>
      </div>

      <p>Perusaineenvaihdunta: {bmr} kcal </p>
      <p>Kulutus: {tdee} kcal </p>
      <p>Kaloritavoite: {macros.calories}, proteiini: {macros.protein}, rasva: {macros.fats}, Hiilihydraatit{macros.carbs}</p>
    </>
  );
}

export default UserDetails;
