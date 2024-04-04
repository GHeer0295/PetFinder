const API_URL = 'http://localhost:8080/api/auth/'

export type NewUser = {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    province: string,
    address: string,

    city: string,
    age: number | string,
}

export type User = {
    username: string,
    password: string
}
  
export async function register(data: NewUser) {
    const auth_res = await fetch(API_URL + 'register', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    }) 

    if (!auth_res.ok) {
        throw new Error("Unable to create new user")
    }

    console.log(auth_res)
}

export async function login(data: User) {
    const auth_res = await fetch(API_URL + 'login', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    }) 

    if (!auth_res.ok) {
        throw new Error("Unable to login")
    }

    console.log(auth_res)
}

export async function isLoggedIn() {
    const res = await fetch(API_URL + 'isLoggedIn', {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
        }
    }) 
    
    if (!res.ok) {
        throw new Error("User is not authenticated")
    }

    console.log("Authentication successful")
}

export async function logout() {
    const res = await fetch(API_URL + 'logout', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        }
    }) 

    if (!res.ok) {
        throw new Error("Logout unsuccessful")
    }

    document.cookie = "nsession" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log("Logout successful")
}
