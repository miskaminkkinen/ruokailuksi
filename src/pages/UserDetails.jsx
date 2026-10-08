import { calculateBMR, calculateTDEE } from '../utils/calculations'

const bmr = calculateBMR(80, 180, 25, 'male')

console.log(bmr, calculateTDEE(bmr, 'moderate'))

function UserDetails(){
    return <h1>Käyttäjätiedot</h1>
}

export default UserDetails
