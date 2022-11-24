import React from "react";
import "./PreHeader.css";
import logo from '../../assets/logo.png';

const PreHeader = () => {
  const width = window.innerWidth;
  console.log(width);
  if (width > 768) {
    return (
      <div className="bg-[#D8F5DE] py-2 w-full">
        <marquee className="">
          <div className="flex justify-center items-center">
            <img
              src={logo}
              className="logo w-32"
              alt=""
            />
            <p className="font-semibold text-md">
              Cardiomegaly detection using X-Ray Image
            </p>
          </div>
          <div className="">
            <div className="" id="google_element"></div>
          </div>
        </marquee>
      </div>
  );
    
  } else {
    return <div></div>;
  }
};

export default PreHeader;
