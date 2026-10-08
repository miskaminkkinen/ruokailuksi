export function calculateBMR(weight, height, age, sex){
    let bmr;

    if(sex === 'male'){
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    else{
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    return Math.round(bmr);
}

export const ACTIVITY_FACTORS = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
}

export function calculateTDEE(bmr, activityLevel){
    const factor = ACTIVITY_FACTORS[activityLevel];
    const tdee = bmr * factor;
    return Math.round(tdee);
}

export const CALORIE_GOALS = {
    lose : -500,
    maintain : 0,
    gain: 500,
}

export function calculateMacros(tdee, weight, goal){
    const calories = tdee + CALORIE_GOALS[goal];
    const protein = weight * 2;
    const fats = weight;
    const carbs = (calories - (protein * 4 + fats * 9))/4;

    return{calories: calories, protein: protein, fats: fats, carbs: Math.round(carbs)}

}
