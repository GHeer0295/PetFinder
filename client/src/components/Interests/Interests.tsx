import React, { useState, useEffect } from 'react';
import ReactModal from "react-modal";
import { FiMessageSquare } from "react-icons/fi";
import { IconContext } from "react-icons";
import "./Interests.css"
import { getUserProfile } from '../../services/profileService';
import { useNavigate } from 'react-router';

interface PostData {
    postId: string;
    title: string;
    desc: string;
    province: string;
    city: string;
    petName: string;
    speciesName: string;
    petImage: { data: ArrayBufferLike };
    imageURL: string;
}

const Interests: React.FC = () => {
    const [interests, setInterests] = useState<PostData[]>([]);
    const [curPost, setCurPost] = useState<PostData | null>(null);
    const [openModal, setOpenModal] = useState(false);
    let navigate = useNavigate();


    const getInterestList = async () => {
        const data = await fetch('/api/interests').then(res => res.json());
        if (data.length > 0) {
            const imagedData = data.map((item: PostData) => {
                let imageURL: string;
                if (item.petImage && item.petImage.data) {
                    const unit8Array = new Uint8Array(item.petImage.data);
                    const blob = new Blob([unit8Array], {type: 'image/png'});
                    imageURL = URL.createObjectURL(blob);
                } else {
                    // Default placeholder image URL
                    imageURL = "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D";
                }
                return { ...item, imageURL };
            });
            setInterests(imagedData);
        }
    }

    useEffect(() => {
        getInterestList();
    }, [])

    const handleOpenModal = (post: PostData) => {
        setCurPost(post);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleClick = async () => {
        const postID = curPost?.postId;
        let curUser = await getUserProfile("");
        const userId = curUser[0].userId!;

        try {
            const result: any = await fetch(`/api/post/${postID}`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                },
            });

            if(!result.ok) {
                throw new Error("Unable to get User from post");
            }

            const data  = await result.json();
            console.log(data);

            const obj = {
                toUser: data,
                senderId: userId
            }

            const createMessage = await fetch(`/api/conversations/user/create-conversation`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(obj)
            });

            if(!createMessage.ok) {
                throw new Error("unable to create message");
            }

            navigate("/message");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="interests-container">
            <h1 className="interests-title">Interested Posts</h1>
            <ul className="interests-list">
                {interests.map((post, index) => (
                    <li key={index} onClick={() => handleOpenModal(post)}>
                        <img className="li-image" src={post.imageURL} alt="img"/>
                        <span className="li-span">{post.petName}</span>
                    </li>
                ))}
            </ul>
            <ReactModal
                className="modal-content"
                overlayClassName="modal-overlay"
                isOpen={openModal}
                contentLabel="Modal"
                onRequestClose={() => handleCloseModal()}
            >
                <div>
                    <div className='message-button'>
                        <IconContext.Provider value={{ color: "black", size: "35px" }}>
                            <a onClick={handleClick}>
                                <div>
                                    <FiMessageSquare />
                                </div>
                            </a>
                        </IconContext.Provider>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='flex flex-row flex-wrap w-full p-10'>
                            <div className='basis-full flex justify-center mt-3'>
                                <img id="petImage" className='rounded-full w-64 h-64 object-cover border-4 hover:shadow-md' src={curPost?.imageURL}></img>
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
            </ReactModal>
        </div>
    );
}

export default Interests;