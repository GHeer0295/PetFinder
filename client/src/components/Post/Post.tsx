import React, { useEffect, useState } from 'react';
import { User, getUserProfile } from "../../services/profileService";
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
        const getUser = async () => {
            let res = await getUserProfile();
            setUser(res[0].uid)
        }

        getUser();
    }, [])

    useEffect(() => {
        const getPosts = async() => {
            const res = await fetch(`http://localhost:8000/api/post/user/${user}`, {
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
    }, [user])

    const handleClick = (post: AdoptionPost) => {
        setCurPost(post);
        const postContainer: HTMLElement | null = document.getElementById("content");
        if(postContainer) {
            postContainer.style.display = "block"
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

            <div id='content' style={{display: "none"}}>
                <div className='flex justify-center items-center'>
                    <div className='flex flex-row flex-wrap w-1/2'>
                        <div className='basis-full flex justify-center mt-3'>
                            <img className='rounded-full w-64 h-64 object-cover border-4 hover:shadow-md' src='https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'></img>
                        </div>
                        <div className='basis-full mt-3'>
                            <p className='font-bold'>Title:</p>
                            <p>{curPost?.title}</p>
                        </div>
                        <div className='basis-1/2 mt-3'>
                            <p className='font-bold'>Description:</p>
                            <p>{curPost?.desc}</p>
                        </div>
                        <div className='basis-1/2 mt-3'>
                            <p className='font-bold'>City:</p>
                            <p>{curPost?.city}, {curPost?.province}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;
