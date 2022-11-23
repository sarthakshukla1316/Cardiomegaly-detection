import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/banner.jpeg';

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <div className='flex mt-4 items-center'>
                <div className='w-1/2 flex flex-col justify-center items-center'>
                    <h1 className='text-[32px] border-b-2 border-black py-2'>Cardiomegaly Detection</h1>
                    <div className=''></div>

                    <p className='max-w-xl p-6 text-justify text-gray-600 text-[20px]'>
                        Cardiomegaly (sometimes megacardia or megalocardia) is a medical condition in which the heart is enlarged. As such, it is more commonly referred to simply as "having an enlarged heart". It is usually the result of underlying conditions that make the heart work harder, such as obesity, heart valve disease, high blood pressure (hypertension), and coronary artery disease. Cardiomyopathy is also associated with cardiomegaly.
                    </p>

                    <p className='max-w-xl p-6 text-justify text-gray-600 text-[20px]'>An enlarged heart (cardiomegaly) isn't a disease, but rather a sign of another condition. The term "cardiomegaly" refers to an enlarged heart seen on any imaging test, including a chest X-ray. Other tests are then needed to diagnose the condition that's causing the enlarged heart.</p>
                </div>

                <div className='w-1/2 p-5 h-full'>
                    <img src="https://img.lovepik.com/photo/50064/0806.jpg_wh300.jpg" className='w-280 h-[400px] object-cover rounded-2xl' alt="" />
                    {/* <img src={banner} className='w-280 h-[550px] object-cover rounded-2xl' alt="" /> */}
                </div>
            </div>
        </div>
    )
}

export default Home