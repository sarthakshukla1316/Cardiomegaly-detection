import React, { useEffect, useState } from 'react'
import { getUser, updateProfile } from '../http';
import { NotificationManager } from 'react-notifications';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

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
            if(data.gender)
                setGender(data.gender);
        }
        getUserDetails();
    }, []);

    const handleUpdate = async () => {
        try {
            if(!name || !email || !height || !weight || !age || !gender) {
                setError('All fields are required !');
                return;
            }
            if(height < 0 || weight < 0 || age < 1) {
                setError('Invalid details !');
                return;
            }
            const { data } = await updateProfile({ name, email, height, weight, age, gender });
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
                {
                    error && <span className='text-red-500 text-[16px]'>{error}</span>
                }
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
                    <input onChange={(e) => setEmail(e.target.value)} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white cursor-not-allowed focus:border-gray-500" id="grid-last-name" value={email} type="email" placeholder="Doe" disabled />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        Height ( cm )
                    </label>
                    <input onChange={(e) => setHeight(e.target.value)} value={height} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="" min="1" max="400" />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                            Weight ( kg )
                        </label>
                        <input onChange={(e) => setWeight(e.target.value)} value={weight} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="" min="1" max="400" />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                            Age
                        </label>
                        <input onChange={(e) => setAge(e.target.value)} value={age} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="" min="1" max="200" />
                    </div>

                    <div class="w-full md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Gender
                        </label>
                        <input onChange={(e) => setGender(e.target.value)} class="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" value={gender} type="text" placeholder="Male" />
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