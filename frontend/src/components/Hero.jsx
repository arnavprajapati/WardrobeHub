import React from "react";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end items-start p-8 lg:p-20 z-30">
      {/* Hero Text */}
      <div className="text-white text-[28px] md:text-[40px] lg:text-[55px] font-bold mb-6">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      {/* Dots */}
      <div className="flex gap-4 mt-4">
        {[0, 1, 2, 3].map((i) => (
          <FaCircle
            key={i}
            className={`w-4 h-4 cursor-pointer transition-colors duration-300 ${
              heroCount === i ? "fill-orange-400" : "fill-white hover:fill-gray-400"
            }`}
            onClick={() => setHeroCount(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
