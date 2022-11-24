import React, { useState, useEffect } from 'react';
import { fetchReports } from '../http';
import moment from 'moment';

const PreviousReports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await fetchReports();
            console.log(data, 'reports');
            setReports(data);
        }
        getData();
    }, []);
    
    return (
        <div>
            <div>
                <div className='flex justify-between items-center my-5 mx-10'>
                    <h3 className='text-lg text-gray-800 font-bold'>Report Id</h3>
                    <h3 className='text-lg text-gray-800 pl-24 font-bold'>CTR</h3>
                    <h3 className='text-lg text-gray-800 pr-3 font-bold'>Analysis</h3>
                    {/* <h3 className='text-lg text-gray-800 font-bold'>Image</h3> */}
                    <h3 className='text-lg text-gray-800 font-bold'>Created At</h3>
                </div>
                <div className='border-b-2 mt-5 mb-5 mx-10 border-gray-200'></div>
                {
                    reports?.map(report => (
                        <div className='flex mb-4 mx-10 justify-between items-center'>
                            <p className='text-[18px] text-gray-800 font-semibold'>{report._id}</p>
                            <p className='text-[18px] text-gray-800 font-semibold'>{report.ctr}</p>
                            <p className={`text-[18px] font-semibold ${report.analysis === 'Detected' ? 'text-red-500' : 'text-green-500'}`}>{report.analysis}</p>
                            {/* <img src={report.link} className='h-40 w-40 object-cover' /> */}
                            <p className='text-[18px] text-gray-800 font-semibold'>{moment(report.createdAt).format('MMM Do YY hh:mm A')}</p>
                        </div>
                    ))
                }
            </div>

            <div>

            </div>
        </div>
    )
}

export default PreviousReports