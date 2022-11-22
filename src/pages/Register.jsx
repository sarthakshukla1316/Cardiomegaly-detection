import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from '../http';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setOtp } from '../store/authSlice';
import OtpInput from 'react-otp-input';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showOtp, setShowOtp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [OTP, setOTP] = useState('');

    const { hash } = useSelector((state) => state.auth.otp);

    const handleSubmit = async () => {
        try {
            if(!name || !email || !password || !confirmPassword)
                return;
            if(password !== confirmPassword)
                return;
            
            const response = await sendOtp({ name, email, password, confirmPassword });
            console.log(response);
            const { data } = response;
            console.log(data);
            if(response.status === 200) {
                dispatch(setOtp({ email: data.email, hash: data.hash }));
                setShowOtp(true);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const handleOtp = async () => {
        try {
            if(!email || !OTP)
                return;
            
            const response = await verifyOtp({ otp: OTP, email, hash });
            const { data } = response;
            console.log(response);
            console.log(data);
            if(response.status === 200) {
                dispatch(setAuth(data));
                navigate('/');
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section class="h-screen">
            <div class="px-6 h-full text-gray-800">
                <div
                class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                >
                <div
                    class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                    <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    class="w-full"
                    alt="Sample image"
                    />
                </div>
                <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                    {
                        !showOtp ? (
                            <form>
                            <div class="mb-6">
                                <input
                                    type="text"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="email"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="password"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="password"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div class="flex justify-between items-center mb-6">
                                <div class="form-group form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    id="exampleCheck2"
                                />
                                <label class="form-check-label inline-block text-gray-800" for="exampleCheck2">
                                    Remember me
                                </label>
                                </div>
                                <a href="#!" class="text-gray-800">Forgot password?</a>
                            </div>

                            <div class="text-center lg:text-left">
                                <button
                                    type="button"
                                    class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={() => handleSubmit()}
                                >
                                    Login
                                </button>
                                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                                Don't have an account?
                                <a
                                    href="#!"
                                    class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                >
                                    Register
                                </a>
                                </p>
                            </div>
                            </form>
                        ) : (
                            <form>
                                <div class="mb-6">
                                    {/* <input
                                        type="text"
                                        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Otp"
                                        onChange={(e) => setOTP(e.target.value)}
                                    /> */}
                                    <h3 className='text-gray-700 text-[24px] font-normal'>Enter OTP</h3>
                                    <OtpInput
                                        value={OTP}
                                        onChange={(otp) => setOTP(otp)}
                                        numInputs={6}
                                        containerStyle={{ marginLeft: '-10px' }}
                                        inputStyle={{ border: '1px solid #999', margin: 10, width: '40px', height: '40px' }}
                                    />
                                </div>

                                <div class="flex justify-between items-center mb-6">
                                    <div class="form-group form-check">
                                    <input
                                        type="checkbox"
                                        class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        id="exampleCheck2"
                                    />
                                    <label class="form-check-label inline-block text-gray-800" for="exampleCheck2">
                                        Remember me
                                    </label>
                                    </div>
                                    <a href="#!" class="text-gray-800">Forgot password?</a>
                                </div>

                                <div class="text-center lg:text-left">
                                    <button
                                        type="button"
                                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        onClick={() => handleOtp()}
                                    >
                                        Verify Otp
                                    </button>
                                    <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Don't have an account?
                                    <a
                                        href="#!"
                                        class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                    >
                                        &nbsp;Verify Otp
                                    </a>
                                    </p>
                                </div>
                        </form>
                        )
                    }
                </div>
                </div>
            </div>
        </section>
    )
}

export default Register