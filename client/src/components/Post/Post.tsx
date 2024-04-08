import React, { useEffect, useState } from 'react';
import { User, getUserProfile } from "../../services/profileService";
import "./Post.css"
import { useNavigate } from 'react-router';
import { IoIosAddCircle } from "react-icons/io";
import { IconContext } from 'react-icons';


type AdoptionPost = {
    desc: string,
    title: string,
    city: string,
    province: string,
    petId: string
}

const Post: React.FC = () => {
    const [posts, setPosts] = useState<Array<AdoptionPost>>([])
    const [curPost, setCurPost] = useState<AdoptionPost>();
    const [user, setUser] = useState<string>('');
    const [image, setImage] = useState<string>('')

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {

            try {
                let res = await getUserProfile();
                setUser(res[0].uid)
            } catch(error) {
                navigate("/login");
            }
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

    const getPetImage = async(post: AdoptionPost) => {
        const petId = post.petId;
        const data = await fetch(`http://localhost:8000/api/post/getimage/${petId}`, {
            method: "GET",
            headers: {
                "Content-Type": "image/jpeg"
            }
        });

        if(!data.ok) {
            console.log("eror");
        }

        const res = await data.json();
        console.log(res);

        if(res[0].petImage) {
            const unit8Array = new Uint8Array(res[0].petImage.data);
            const blob = new Blob([unit8Array], {type: 'image/png'});
            const imageUrl = URL.createObjectURL(blob);
            setImage(imageUrl);
        } else {
            // default image
            setImage("https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D");
        }
    }

    return (
        <div>
            <div className="sidebar">
                <div className='add-button'>
                    <IconContext.Provider value={{ color: "black", size: "35px" }}>
                        <a href="/create-post">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IoIosAddCircle />
                            <a style={{ marginLeft: '5px' }}>New post</a>
                        </div>
                        </a>
                    </IconContext.Provider>
                </div>
                <h1 className="post-header">Your Posts</h1>
                <ul>
                    {posts.map((post) => (
                        <li className="post" onClick={() => {handleClick(post); getPetImage(post)}}>{post.title}</li>
                    ))}
                </ul>
            </div>

            <div id='content' style={{display: "none"}}>
                <div className='flex justify-center items-center'>
                    <div className='flex flex-row flex-wrap w-1/2'>
                        <div className='basis-full flex justify-center mt-3'>
                            <img id="petImage" className='rounded-full w-64 h-64 object-cover border-4 hover:shadow-md' src={image}></img>
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
