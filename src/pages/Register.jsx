import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
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
    const [type, setType] = useState('doctor');
    const [OTP, setOTP] = useState('');
    const [error, setError] = useState('');

    const { hash } = useSelector((state) => state.auth.otp);

    const handleSubmit = async () => {
        try {
            if(!name || !email || !password || !confirmPassword || !type) {
                setError('All fields are required');
                return;
            }
            if(name.includes('<script>')) {
                setError('Invalid name');
                return;
            }
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
            console.log(email.match(validRegex));
                if (!email.match(validRegex)) {
                    setError('Invalid email address!');
                    return;
                }
            if(password !== confirmPassword) {
                setError('Password and Confirm password does not match!');
                return;
            }
            setError('');
            const response = await sendOtp({ name, email, password, confirmPassword, type });
            console.log(response);
            const { data } = response;
            console.log(data);
            if(response.status === 200) {
                dispatch(setOtp({ email: data.email, hash: data.hash }));
                setShowOtp(true);
            }
        } catch(err) {
            setError(err?.response?.data?.message);
            console.log(err);
        }
    }

    const handleOtp = async () => {
        try {
            if(!email || !OTP) {
                setError('All fields are required !');
                return;
            }
            if(OTP.length !== 6) {
                setError('Incomplete OTP!');
                return;
            }
            for(let i=1;i<=6;i++) {
                let as=OTP.charAt(i)-'0';
                if(as >= 48 && as <= 57) {
                    continue;
                } else {
                    setError('OTP must contain only numbers');
                    return;
                }
            }
            const response = await verifyOtp({ otp: OTP, email, hash });
            const { data } = response;
            console.log(response);
            console.log(data);
            if(response.status === 200) {
                dispatch(setAuth(data));
                navigate('/');
            }
        } catch(err) {
            setError(err?.response?.data?.message);
            console.log(err);
        }
    }

    return (
        <section className="h-screen">
            <div className="px-6 h-full text-gray-800">
                <div
                className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                >
                <div
                    className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                    <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/healthcare-5378096-4494352.png"
                    className="w-[90%] object-cover"
                    alt="Sample image"
                    />
                </div>
                <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                    {
                        !showOtp ? (
                            <form>
                            {
                                error && <span className='text-red-500 text-[16px]'>{error}</span>
                            }
                            <div class="mb-6">
                                <input
                                    type="text"
                                    class="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="User name" minLength={3} maxLength={30}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="email"
                                    class="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="password"
                                    class="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="password"
                                    class="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div class="">
                                <div class="mb-3 w-full">
                                    <select onChange={(e) => setType(e.target.value)} className="form-select appearance-none block w-full px-3 py-1.5 text-lg font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                        {/* <option selected>Select</option> */}
                                        <option value="doctor">Doctor</option>
                                        <option value="assistant">Assistant</option>
                                        <option value="patient">Patient</option>
                                    </select>
                                </div>
                            </div>


                            <div class="flex justify-between items-center mb-6">
                                <div class="form-group form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-900 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    id="exampleCheck2" style={{ border: '1px solid black' }}
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
                                    Register
                                </button>
                                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                                Don't have an account?&nbsp;
                                <Link
                                    to='/login'
                                    class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                >
                                    Login
                                </Link>
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
                                    {
                                        error && <span className='text-red-500 text-[16px]'>{error}</span>
                                    }
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
                                        id="exampleCheck2" style={{border: '1px solid black' }}
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
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                                        &nbsp;Login
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