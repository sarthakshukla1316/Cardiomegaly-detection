import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../components/Checkbox'
import PatientDetails from '../components/PatientDetails'

const Home = () => {
    const navigate = useNavigate();
    const [shortBreath, setShortBreath] = useState(false);
    const [skippedHeart, setSkippedHeart] = useState(false);
    const [swelling, setSwelling] = useState(false);
    const [fatigue, setFatigue] = useState(false);
    const [weightLoss, setWeightLoss] = useState(false);
    const [dizziness, setDizziness] = useState(false);
    const [abdominalBloating, setAbdominalBloating] = useState(false);
    const [none, setNone] = useState(false);

    const openFileInput = (e) => {
        document.getElementById("xrayImg").click();

        console.log(e.target.files);
    }

    const fetchFile = async (e) => {
        console.log(e.target.files[0]);
    }
    
    return (
        <div className='flex flex-col justify-center items-center mt-20'>
            <h1 className='text-[32px] border-b-2 border-black py-2'>X-Ray Chest Upload for Cardiomegaly</h1>
            <div className=''></div>

            <p className='max-w-4xl p-6 text-justify text-[18px]'>
                Note: Chest X-ray images help see the condition of the lungs and heart. If the heart is enlarged on an X-Ray, other tests will usually be needed to find the cause. A useful measurement on X-Ray is the cardio-thoracic ratio, which is the transverse diameter of the heart, compared with that of the thoracic cage. These diameters are taken from PA chest x-rays using the widest point of the chest and measuring as far as the lung pleura, not the lateral skin margins.
            </p>

            <div onClick={(e) => openFileInput(e)} className='border-2 cursor-pointer border-gray-400 rounded-2xl px-40 py-24 m-6'>
                <h3 className='text-[22px] font-500'>Drop Digital X-Ray Chest Test</h3>
            </div>

            <input type="file" onChange={(e) => fetchFile(e)} name="" id="xrayImg" style={{ display: 'none' }} />
        </div>
    )
}

export default Home