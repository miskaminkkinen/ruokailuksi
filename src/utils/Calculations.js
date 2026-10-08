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
