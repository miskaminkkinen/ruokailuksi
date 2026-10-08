import { calculateBMR, calculateTDEE, calculateMacros } from '../utils/Calculations'


const bmr = calculateBMR(80, 180, 25, 'male')

const tdee = (bmr, calculateTDEE(bmr, 'moderate'))
console.log(calculateMacros(tdee, 80, 'maintain'))

function UserDetails(){
    return <h1>Käyttäjätiedot</h1>
}

export default UserDetails
