// File: src/components/ShoeCard.jsx

import React from 'react';
import ShoeScroller from './Shoescroll';


const ShoeCard = () => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md space-y-10">
      {/* Card Section */}
      <div className="flex flex-col md:flex-row items-center w-full">
         {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left px-4 flex flex-col align-middle ml-20 ">
       
          <h1 className="text-2xl font-bold mb-2 ">
            Your Feet <br />
            <span className="text-red-600 font-semibold mx-5">Deserve</span>
            <br />
            the Best.
          </h1>
        
          <p className="text-gray-600">
            Experience unmatched comfort and style with our latest shoes. Designed for everyday wear and performance.
          </p>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
          <img
            src="\ShoeImage\Shoes.png"
            alt="Shoe"
            className="max-w-full h-auto rounded-lg"
          />
        </div>

       
      </div>

      {/* Shoe Scroller Section */}
      <div className="w-full">
        <ShoeScroller />
      </div>
    </div>
  );
};

export default ShoeCard;
