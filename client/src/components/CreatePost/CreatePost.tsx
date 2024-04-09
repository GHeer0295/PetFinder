import { readFile, readFileSync } from 'fs';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { isLoggedIn } from '../../services/authService';
import { getUserProfile } from '../../services/profileService';

type AdoptionPost = {
    desc: string,
    title: string,
    city: string,
    province: string
}

// speciesid, petid, etc set in backend;
type Pet = {
    name: string
    ownerId: string
    age: number | string,
}

type Species = {
    speciesName: string
}

const CreatePost: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [province, setProvince] = useState<string >('');
    const [image, setImage] = useState<File>();
    const [age, setAge] = useState<number | string >('');
    const [species, setSpecies] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [user, setUser] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {

            try {
                let res = await getUserProfile();
                console.log(res[0].uid);
                setUser(res[0].uid)
            } catch(error) {
                console.log(error);
                navigate("/login");
            }
        }

        getUser();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        const newPetUUID = uuidv4();
        const newSpeciesUUID = uuidv4();
        e.preventDefault();

        const data : any = {
            name: name,
            ownerId: user,
            age: age,
            speciesName: species,
            desc: description,
            title: title,
            city: city,
            province: province,
            newPetUUID: newPetUUID,
            newSpeciesUUID: newSpeciesUUID
        }

        try {
            const res = await fetch("http://localhost:8000/api/post/create", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(data)
            });

            if(!res.ok) {
                throw new Error("unable to save pet");
            }

            const imageRes = await fetch(`http://localhost:8000/api/post/image/${newPetUUID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "image/jpeg"
                },
                body: image
            });

            if(!imageRes.ok) {
                throw new Error("unable to save image");
            }

            navigate("/posts");
        } catch(error) {
            console.log(error);
        }
    }

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;

        const petId = uuidv4()
        const newFile = new File([file], petId, {type: file.type});
        setImage(newFile);
      };
    

    return (
        <div className='flex justify-center items-center h-[90vh]'>
            <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                    <label htmlFor='title' className='mb-2 font-semibold text-left block'>Title</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full' 
                        id='title'
                        name='title'
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='name' className='mb-2 font-semibold text-left block'>Name</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='name'
                        name='name'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='age' className='mb-2 font-semibold text-left block'>Age</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='age'
                        name='age'
                        value={age || ''}
                        pattern="[0-9]" 
                        required
                        onChange={(e) => setAge(parseInt(e.target.value))} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='species' className='mb-2 font-semibold text-left block'>Species</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='species'
                        name='species'
                        value={species}
                        required
                        onChange={(e) => setSpecies(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='city' className='mb-2 font-semibold text-left block'>City</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='city'
                        name='city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='province' className='mb-2 font-semibold text-left block'>Province</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='province'
                        name='province'
                        value={province}
                        required
                        onChange={(e) => setProvince(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='mb-2 font-semibold text-left block' htmlFor='description'>Description</label>
                    <textarea 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='description'
                        name='description'
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='mb-2 font-semibold text-left block' htmlFor='image'>Upload Image</label>
                    <input 
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        name='image'
                        required
                        onChange={handleImageChange} />
                </div>
                <button className='bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' type='submit'>Post</button>
            </form>
        </div>
    );
}
export default CreatePost;