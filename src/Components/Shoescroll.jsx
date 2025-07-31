import React from 'react';
import { useNavigate } from 'react-router-dom';
import HellBackground from './Hellbackground';

const shoes = [
  { id: 1, image: "/ShoeImage/shoe1.jpeg", category: "Air Max Pro", description: "Lightweight and comfortable." },
  { id: 2, image: "/ShoeImage/shoe2.jpeg", category: "Runner X", description: "Built for speed with breathable mesh." },
  { id: 3, image: "/ShoeImage/shoe3.jpeg", category: "Classic Comfort", description: "Timeless design support." },
  { id: 4, image: "/ShoeImage/shoe4.jpeg", category: "Men Special", description: "Comfortable and demanding." },
  { id: 5, image: "/ShoeImage/shoe5.jpeg", category: "Dress shoes", description: "Be formal. Be sharp." }
];

const ShoeScroller = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
    <HellBackground className="flex flex-col items-center justify-center ">
  <div className="text-center">
    <h1 className="text-white text-2xl font-bold">SUMMER SALE</h1>
    <h3 className="text-white text-lg">UP TO 50% OFF</h3>
    <button className="bg-transparent text-white h-12 w-36 mt-4 rounded-md border border-white mb-2">
      Shop Now
    </button>
  </div>
</HellBackground>


      <div className="overflow-x-auto whitespace-nowrap py-4 px-2 rounded-lg shadow-lg bg-gray-200">
        <div className="flex gap-4">
          {shoes.map((shoe) => (
            <div
              key={shoe.id}
              className="min-w-[250px] bg-white rounded-xl shadow-md p-4 flex-shrink-0 text-center cursor-pointer"
              onClick={() => handleClick(shoe.category)}
            >
              <img src={shoe.image} alt={shoe.category} className="w-56 h-40 object-contain mb-3" />
              <h3 className="text-lg font-bold mb-1">{shoe.category}</h3>
              <p className="text-sm text-gray-600">{shoe.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShoeScroller;
