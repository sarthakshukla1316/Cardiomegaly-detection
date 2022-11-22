import React, { useState } from 'react'

const Symptoms = () => {
    const [shortBreath, setShortBreath] = useState(false);
    const [skippedHeart, setSkippedHeart] = useState(false);
    const [swelling, setSwelling] = useState(false);
    const [fatigue, setFatigue] = useState(false);
    const [weightLoss, setWeightLoss] = useState(false);
    const [dizziness, setDizziness] = useState(false);
    const [abdominalBloating, setAbdominalBloating] = useState(false);
    const [none, setNone] = useState(false);

    return (
        <div className='flex mt-16 items-center flex-col'>

            <h1 className='text-[32px] border-b-2 mb-6 border-black py-2'>Symptoms for Cardiomegaly</h1>
            
            <div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setShortBreath(!shortBreath)} value={shortBreath} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-300">
                        Shortness of breath or a raspy voice may occur when physically active or lying flat
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setSkippedHeart(!skippedHeart)} value={skippedHeart} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-300">
                        Skipped heart beats or palpitations (arrhythmia)
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setSwelling(!swelling)} value={swelling} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-300">
                        Swelling of the leg ( edema )
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setFatigue(!fatigue)} value={fatigue} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-300">
                        Fatigue
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setWeightLoss(!weightLoss)} value={weightLoss} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-300">
                        Weight loss around the abdomen
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setDizziness(!dizziness)} value={dizziness} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-300">
                        Dizziness
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setAbdominalBloating(!abdominalBloating)} value={abdominalBloating} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-300">
                        Abdominal bloating
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox" type="checkbox" onChange={() => setNone(!none)} value={none} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-300">
                        None
                    </label>
                </div>
            </div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 mt-4 px-16 border border-blue-700 text-[20px] rounded">
                Next
            </button>


            {/* <div>
                <input id="link-checkbox" type="checkbox" onChange={() => setSymp1(!symp1)} value={symp1} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Discomfort in other areas of upper body, including one or both arms, the back, neck, jaw or stomach
                </label>
            </div>
            <div>
                <input id="link-checkbox" type="checkbox" onChange={() => setSymp1(!symp1)} value={symp1} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Severe shortness of breath
                </label>
            </div>
            <div>
                <input id="link-checkbox" type="checkbox" onChange={() => setSymp1(!symp1)} value={symp1} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Chest pain
                </label>
            </div>
            <div>
                <input id="link-checkbox" type="checkbox" onChange={() => setSymp1(!symp1)} value={symp1} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Fainting
                </label>
            </div>
            <div>
                <input id="link-checkbox" type="checkbox" onChange={() => setSymp1(!symp1)} value={symp1} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    None
                </label>
            </div> */}
        </div>
    )
}

export default Symptoms