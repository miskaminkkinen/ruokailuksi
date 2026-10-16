const PROFILE_KEY = 'userProfile'
const RECIPE_KEY = 'recipe'

export function saveProfile(profile){
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))

}

export function loadProfile(){
    const saved = localStorage.getItem(PROFILE_KEY)
    if (saved === null){
        return null

    }
    else{
        return JSON.parse(saved)
    }

}

export function saveRecipe(recipe){
    localStorage.setItem(RECIPE_KEY, JSON.stringify(recipe))
}

export function loadRecipe(){
    const saved = localStorage.getItem(RECIPE_KEY)
    if (saved === null){
        return []

    }
    else{
        return JSON.parse(saved)
    }

}