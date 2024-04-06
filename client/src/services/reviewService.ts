const API_URL = 'http://localhost:8080/api/reviews/'

export type Review = {
    reviewerFirstName: string,
    reviewerLastName: string,
    rating: number,
    desc: string
}

export async function getReviews(username: any) {
    const res = await fetch(API_URL + username, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
        }
    }) 
    
    if (!res.ok) {
        throw new Error("Could not receive user reviews")
    }

    return res.json() as Promise<Review[]>
}

export async function addReview(user: string, data: any) {
    const auth_res = await fetch(API_URL + user, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    }) 

    if (!auth_res.ok) {
        throw new Error("Unable to add review for " + user)
    }

    console.log(auth_res)
}