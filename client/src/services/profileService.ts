const API_URL = 'http://localhost:8000/api/profile/'

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    age: number | string,
    province: string,
    city: string,
    uid: string
}

export async function getUserProfile() {
    const res = await fetch(API_URL, {
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
