import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { addReport } from '../http';
import { useReactToPrint } from "react-to-print";
import moment from 'moment';

const Diagnose = () => {
    const [shortBreath, setShortBreath] = useState(false);
    const [skippedHeart, setSkippedHeart] = useState(false);
    const [swelling, setSwelling] = useState(false);
    const [fatigue, setFatigue] = useState(false);
    const [weightLoss, setWeightLoss] = useState(false);
    const [dizziness, setDizziness] = useState(false);
    const [abdominalBloating, setAbdominalBloating] = useState(false);
    const [fainting, setFainting] = useState(false);

    const [file, setFile] = useState(null);
    const [xrayOutput, setXrayOutput] = useState({});
    const [output, setOutput] = useState(false);
    const [imgLink, setImgLink] = useState('');
    const [loading, setLoading] = useState(false);

    const openFileInput = (e) => {
        document.getElementById("xrayImg").click();

        console.log(e.target.files);
    }

    const fetchFile = async (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    const { user } = useSelector(state => state.auth);
    console.log(user, 'user');
    

    const generateReport = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            console.log(file, 'file');
            console.log(formData, 'formdata');
            const config = {
                headers: { 
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data",
                },
            }
            const data = await axios.post('http://d94d-34-173-213-236.ngrok.io/upload', formData, config);
            if(data.status === 200) {
                setXrayOutput(data?.data);
                const imgUrl = data.data.link;
                const lastIndex = imgUrl.lastIndexOf('/');
                const imgId = imgUrl.substring(lastIndex+1);
                setImgLink(`https://drive.google.com/uc?export=view&id=${imgId}`);
                setOutput(true);

                await addReport({ ctr: data?.data.ctr, link: `https://drive.google.com/uc?export=view&id=${imgId}`, analysis: data.data.cardiomegaly === true ? 'Detected' : 'Not detected' })
            }
            console.log(data, 'data img');
        } catch(err) {
            console.log(err);
        }
    }
    console.log(xrayOutput, 'output');

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className='flex mt-2 items-center flex-col'>
            { !output ?
            <>
            <h1 className='text-[32px] border-b-2 mb-6 border-black py-2'>Symptoms for Cardiomegaly</h1>

            <div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox1" type="checkbox" onChange={() => setShortBreath(!shortBreath)} value={shortBreath} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                    <label for="link-checkbox1" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900 cursor-pointer">
                        Shortness of breath, especially while lying flat
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox2" type="checkbox" onChange={() => setSkippedHeart(!skippedHeart)} value={skippedHeart} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                    <label for="link-checkbox2" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900 cursor-pointer">
                        Waking up short of breath
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox3" type="checkbox" onChange={() => setSwelling(!swelling)} value={swelling} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                    <label for="link-checkbox3" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900 cursor-pointer">
                        Irregular heart rhythm (arrhythmia)
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox4" type="checkbox" onChange={() => setFatigue(!fatigue)} value={fatigue} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                    <label for="link-checkbox4" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900 cursor-pointer">
                        Swelling (edema) in the belly or in the legs
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox5" type="checkbox" onChange={() => setWeightLoss(!weightLoss)} value={weightLoss} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                    <label for="link-checkbox5" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900 cursor-pointer">
                        Chest pain
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox6" type="checkbox" onChange={() => setDizziness(!dizziness)} value={dizziness} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                    <label for="link-checkbox6" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900 cursor-pointer">
                        Discomfort in other areas of the upper body, including one or both arms, the back, neck, jaw, or stomach
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox7" type="checkbox" onChange={() => setAbdominalBloating(!abdominalBloating)} value={abdominalBloating} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                    <label for="link-checkbox7" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900 cursor-pointer">
                        Severe shortness of breath
                    </label>
                </div>
                <div className='flex items-center mt-4'>
                    <input id="link-checkbox8" type="checkbox" onChange={() => setFainting(!fainting)} value={fainting} className="w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                    <label for="link-checkbox8" className="ml-6 text-[18px] font-medium text-gray-600 dark:text-gray-900 cursor-pointer">
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

            <button onClick={() => generateReport()} class="bg-[#68AC5D] hover:bg-[#9dde93] my-6 text-white font-semibold py-2 mt-4 px-16 border text-[20px] rounded">
                Generate Report
            </button>
            </> : (
                <>
                <div ref={componentRef} className='p-4'>
                    <h1 className='text-[32px] border-b-2 mb-9 border-black py-2'>Cardiomegaly Diagnosis Report</h1>

                    <div className='w-[750px] flex justify-between space-y-5'>
                        <div className='space-y-2'>
                            <p className='text-lg text-gray-600 font-normal'>Patient Name: {user.name}</p>
                            <p className='text-lg text-gray-600 font-normal'>Age: {user.age}</p>
                            <p className='text-lg text-gray-600 font-normal'>Weight: {user.weight}</p>
                            <p className='text-lg text-gray-600 font-normal'>Height: {user.height}</p>
                        </div>
                        <div className='space-y-2'>
                            <p className='text-lg text-gray-600 font-normal'>Gender: {user.gender}</p>
                            <p className='text-lg text-gray-600 font-normal'>Report Id: #122414</p>
                            <p className='text-lg text-gray-600 font-normal'>Time & Date: {moment(Date.now()).format('MMM Do YY hh:mm A')}</p>
                        </div>
                    </div>

                    <div className='border-b-2 w-[800px] mt-8 border-gray-200'></div>

                    <div className='flex w-[750px] mt-10 justify-between items-center'>
                        <div className='space-y-4'>
                            <h3 className='text-xl font-bold text-gray-800'>Investigations</h3>
                            <p className='text-lg font-semibold text-gray-600'>Cardio Thoracic Ratio ( CTR )</p>
                            <p className='text-lg font-semibold text-gray-600'>Analysis</p>
                        </div>
                        <div className='space-y-4'>
                            <h3 className='text-xl font-bold text-gray-800'>Result</h3>
                            <p className='text-lg font-semibold text-gray-600'>{xrayOutput.ctr || '0.4'}</p>
                            <p className={`text-lg font-semibold ${xrayOutput.cardiomegaly === true ? 'text-red-500' : 'text-green-500'}`}>{xrayOutput.cardiomegaly === true ? 'Detected' : 'Not detected'}</p>
                        </div>
                        <div className='space-y-4'>
                            <h3 className='text-xl font-bold text-gray-800'>Normal Range</h3>
                            <p className='text-lg font-semibold text-gray-600'>0.0 - 0.5</p>
                            <p className='text-lg font-semibold text-gray-600'>-</p>
                        </div>
                    </div>

                    <div className='mt-6 flex justify-center w-150 h-150'>
                        <img src={imgLink} className='object-cover' alt="Image" />
                    </div>

                </div>

                <button onClick={() => handlePrint()} className="mx-auto bg-[#68AC5D] hover:bg-[#9dde93] my-6 text-white font-semibold py-2 mt-4 px-16 border text-[20px] rounded">
                    Download Report
                </button>
                </>
            )
            }

        </div>
    )
}

export default Diagnose