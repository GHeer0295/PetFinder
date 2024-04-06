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