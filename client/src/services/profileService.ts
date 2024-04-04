const API_URL = 'http://localhost:8080/api/profile/'

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    age: number | string,
    province: string,
    city: string,
    address: string,
    description: string
}

export async function getUserProfile() {
    const res = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
        }
    }) 
    
    if (!res.ok) {
        throw new Error("Could not receive profile")
    }

    return res.json() as Promise<User[]>
}

export async function updateUserProfile(data: User) {
    const auth_res = await fetch(API_URL, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    }) 

    if (!auth_res.ok) {
        throw new Error("Unable to update user information")
    }

    console.log(auth_res)
}