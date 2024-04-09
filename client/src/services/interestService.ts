const API_URL = '/api/interests/'

export interface LikePost {
    postId: string;
}

export async function like(data: LikePost) {
    const res = await fetch(API_URL + 'like', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    }) 

    if (!res.ok) {
        throw new Error("Unable to Like Post.")
    }
}