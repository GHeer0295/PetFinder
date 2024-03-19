const API_URL = 'http://localhost:8080/api/auth/'

export type NewUser = {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    age: number | string,
}

export type User = {
    username: string,
    password: string
}
  
export async function register(data: NewUser) {
    try {
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
    catch(err) {
        console.log(err)
    }
}

export async function login(data: User) {
    try {
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
    catch(err) {
        console.log(err)
    }
}
