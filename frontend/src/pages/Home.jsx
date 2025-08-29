import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" }
  ];

  const heroImages = [
    "https://images.pexels.com/photos/2529172/pexels-photo-2529172.jpeg",
    "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg",
    "https://images.pexels.com/photos/1140907/pexels-photo-1140907.jpeg",
    "https://images.pexels.com/photos/1158670/pexels-photo-1158670.jpeg"
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev === heroData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden top-[70px] w-full h-[calc(100vh-120px)] md:h-[calc(100vh-4.5rem)]">
      <Background heroCount={heroCount} heroImages={heroImages} />
      <Hero heroData={heroData[heroCount]} heroCount={heroCount} setHeroCount={setHeroCount} />
    </div>
  );
}

export default Home;