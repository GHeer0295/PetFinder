const API_URL = '/api/profile/'

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    age: number | string,
    province: string,
    city: string,
    uid?: string
}

export async function getUserProfile(username: any) {
    const res = await fetch(API_URL + username, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
        },
        credentials: "include"
    }) 
    
    if (!res.ok) {
        throw new Error("Could not receive profile")
    }

    return res.json() as Promise<User[]>
}

export async function updateUserProfile(data: User) {
    const auth_res = await fetch(API_URL, {
        method: "POST",
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