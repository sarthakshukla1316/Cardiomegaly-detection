import React, { useEffect, useState } from 'react'
import { getUser, updateProfile } from '../http';
import { NotificationManager } from 'react-notifications';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        const getUserDetails = async () => {
            const { data } = await getUser();
            console.log(data, 'user profile');
            setName(data.name);
            setEmail(data.email);
            if(data.height)
                setHeight(data.height);
            if(data.weight)
                setWeight(data.weight);
            if(data.age)
                setAge(data.age);
        }
        getUserDetails();
    }, []);

    const handleUpdate = async () => {
        try {
            const { data } = await updateProfile({ name, email, height, weight, age });
            if(data.success === true) {
                NotificationManager.success(data.message, 'Success');
                return;
            }
        } catch(err) {
            console.log(err);
        }
    }
    

    return (
        <div className='flex justify-center items-center flex-col h-[60vh]'>
            <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Name
                    </label>
                    <input onChange={(e) => setName(e.target.value)} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" value={name} type="text" placeholder="Jane" />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Email
                    </label>
                    <input onChange={(e) => setEmail(e.target.value)} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" value={email} type="email" placeholder="Doe" />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        Height ( cm )
                    </label>
                    <input onChange={(e) => setHeight(e.target.value)} value={height} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="" />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                            Weight ( kg )
                        </label>
                        <input onChange={(e) => setWeight(e.target.value)} value={weight} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="" />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                            Age
                        </label>
                        <input onChange={(e) => setAge(e.target.value)} value={age} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="" />
                    </div>
                </div>

                </form>

                <button onClick={() => handleUpdate()} className="mx-auto bg-[#68AC5D] hover:bg-[#9dde93] my-6 text-white font-semibold py-2 mt-4 px-16 border text-[20px] rounded">
                    Update profile
                </button>
        </div>
    )
}

export default Profile