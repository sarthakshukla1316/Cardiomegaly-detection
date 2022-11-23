import React, { useState } from 'react'

const Diagnose = () => {
    const [shortBreath, setShortBreath] = useState(false);
    const [skippedHeart, setSkippedHeart] = useState(false);
    const [swelling, setSwelling] = useState(false);
    const [fatigue, setFatigue] = useState(false);
    const [weightLoss, setWeightLoss] = useState(false);
    const [dizziness, setDizziness] = useState(false);
    const [abdominalBloating, setAbdominalBloating] = useState(false);
    const [fainting, setFainting] = useState(false);

    const openFileInput = (e) => {
        document.getElementById("xrayImg").click();

        console.log(e.target.files);
    }

    const fetchFile = async (e) => {
        console.log(e.target.files[0]);
    }

    return (
        <div className='flex mt-2 items-center flex-col'>

            <h1 className='text-[32px] border-b-2 mb-6 border-black py-2'>Symptoms for Cardiomegaly</h1>

            <div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setShortBreath(!shortBreath)} value={shortBreath} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900">
                        Shortness of breath, especially while lying flat
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setSkippedHeart(!skippedHeart)} value={skippedHeart} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900">
                        Waking up short of breath
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setSwelling(!swelling)} value={swelling} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900">
                        Irregular heart rhythm (arrhythmia)
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setFatigue(!fatigue)} value={fatigue} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900">
                        Swelling (edema) in the belly or in the legs
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setWeightLoss(!weightLoss)} value={weightLoss} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900">
                        Chest pain
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setDizziness(!dizziness)} value={dizziness} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900">
                        Discomfort in other areas of the upper body, including one or both arms, the back, neck, jaw, or stomach
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setAbdominalBloating(!abdominalBloating)} value={abdominalBloating} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900">
                        Severe shortness of breath
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setFainting(!fainting)} value={fainting} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900">
                        Fainting
                    </label>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center mt-6'>

                <div onClick={(e) => openFileInput(e)} className='border-2 cursor-pointer border-gray-400 rounded-2xl px-40 py-24 m-6'>
                    <h3 className='text-[22px] font-500'>Drop Digital X-Ray Chest Test</h3>
                </div>

                <input type="file" onChange={(e) => fetchFile(e)} name="" id="xrayImg" style={{ display: 'none' }} />
            </div>

            <button class="bg-[#68AC5D] hover:bg-[#9dde93] my-6 text-white font-semibold py-2 mt-4 px-16 border text-[20px] rounded">
                Generate Report
            </button>

        </div>
    )
}

export default Diagnose