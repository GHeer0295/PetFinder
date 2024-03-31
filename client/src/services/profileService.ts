const API_URL = 'http://localhost:8080/api/profile/'


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

    console.log("Authentication successful")
}
