import React, { useEffect, useState } from 'react';
import "./Post.css"

type AdoptionPost = {
    desc: string,
    title: string,
    city: string,
    province: string
}

const Post: React.FC = () => {
    const [posts, setPosts] = useState<Array<AdoptionPost>>([])
    const [curPost, setCurPost] = useState<AdoptionPost>();
    const [user, setUser] = useState<string>('');

    useEffect(() => {
        const getPosts = async() => {
            console.log(user);
            const res = await fetch(`http://localhost:8000/api/post/user/05fe263c-82a8-4a33-a2de-66aa02250706`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                },
            });

            if(!res.ok) {
                throw new Error("Unable to get user posts");
            }

            const data = await res.json()
            setPosts(data);
        }

        getPosts();
    }, [])

    const handleClick = (post: AdoptionPost) => {
        const postContainer: HTMLElement | null = document.getElementById("content");
        if(postContainer) {
            while (postContainer.firstChild) {
                postContainer.removeChild(postContainer.firstChild);
            }

            const titleElement: HTMLHeadingElement = document.createElement('h2');
            titleElement.textContent = post.title;

            const cityElement: HTMLParagraphElement = document.createElement('p');
            cityElement.textContent = `City: ${post.city}`;

            const descElement: HTMLParagraphElement = document.createElement('p');
            descElement.textContent = `Description: ${post.desc}`;

            const provinceElement: HTMLParagraphElement = document.createElement('p');
            provinceElement.textContent = `Province: ${post.province}`;

            postContainer.appendChild(titleElement);
            postContainer.appendChild(cityElement);
            postContainer.appendChild(descElement);
            postContainer.appendChild(provinceElement);
        }
    }

    return (
        <div>
             <div className="sidebar">
                <ul>
                    {posts.map((post) => (
                        <li onClick={() => {handleClick(post)}}>{post.title}</li>
                    ))}
                </ul>
            </div>

            <div className="main-content" id="main-content">
                <div id='content'>
                    <h2>{curPost?.title}</h2>
                    <p>{curPost?.city}</p>
                    <p>{curPost?.desc}</p>
                    <p>{curPost?.province}</p>
                </div>
            </div>
        </div>
    )
}

export default Post;
