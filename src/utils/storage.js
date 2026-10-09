const PROFILE_KEY = 'userProfile'

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