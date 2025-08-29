import React from "react";

function Background({ heroCount, heroImages }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`hero-${index}`}
          className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${
            index === heroCount ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20"></div>
    </div>
  );
}

export default Background;
