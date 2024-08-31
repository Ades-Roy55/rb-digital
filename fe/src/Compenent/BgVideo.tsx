import React from 'react';
// import Header from '../Pages/Header';
// import Footer from '../Pages/Footer';

const BgVideo: React.FC = () => {
  return (
    <div>
        {/* <Header/> */}
    <div className="relative h-screen">
      <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted>
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-10 p-4">
        <h1 className="text-white text-4xl lg:text-7xl font-bold italic font-helvetica">
          Welcome to the RB-Digital
        </h1>
        <p className="text-white text-xl lg:text-2xl italic font-helvetica text-center mt-4">
          "A library is not a luxury but one of the necessities of life." - Henry Ward Beecher
        </p>
      </div>
    </div>
    {/* <Footer/> */}
    </div>
  );
};

export default BgVideo;
