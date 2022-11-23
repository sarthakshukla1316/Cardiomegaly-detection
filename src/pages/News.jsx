import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import Navbar from '../components/Navbar';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            const { data } = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
            setNews(data.articles);
        }
        getNews();
    }, []);
    
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-[32px] border-b-2 border-black py-2 mb-6'>Health related news</h1>
                {
                    news?.map(ele => (
                        <a href={ele.url} target="_blank" className='flex mb- p-5 w-[70%] cursor-pointer'>
                            <img src={ele.urlToImage || 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2014/7/Microbiology-620x480.jpg'} className='w-64 rounded-lg object-cover' alt="" />
                            <div className='flex-1 p-5'>
                                <h4 className='text-lg font-semibold text-gray-700'>{ele.title}</h4>
                                <p className='text-md text-gray-600 pt-3'>{ele.description}</p>

                                <div className='flex justify-between items-center mt-4'>
                                    <span className='text-md text-gray-400'>{ele.publishedAt}</span>
                                    <span className='text-lg text-gray-500 font-normal'>{ele.author}</span>
                                </div>
                            </div>
                        </a>
                    ))
                }
            </div>
        </>
    )
}

export default News