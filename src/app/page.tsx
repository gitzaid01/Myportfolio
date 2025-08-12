"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";


export default function Home() {

  

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");

  // Format seconds into mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Get audio duration
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("loadedmetadata", () => {
        setDuration(formatTime(audio.duration));
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
 
  return (
    <div className=" bg-black text-white ">
      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-start tracking-tighter m-4 ">
        DESIGN WITH VISION
        <br /> DEVELOP WITH PRECISION
        <br /> DELIVER WITH IMPACT
      </h1>

      {/* Short Intro */}

      {/* News-style About Me */}
      <div className="bg-red-950 w-full shadow-md mb-6 flex flex-col md:flex-row items-center md:items-start gap-6 p-4">
  {/* Image + Audio Player (Desktop & Tablet view only) */}
  <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center hidden md:flex">
    <img
      src="./image5.png"
      alt="Example"
      className="w-full md:w-auto h-auto max-h-[500px] md:max-h-[500px] object-cover"
    />

    <div className="flex items-center gap-3 mt-3 pt-3 text-white w-full md:w-auto justify-center md:justify-start">
      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
      <span className="text-sm md:text-base font-medium">Listen to article</span>
      <span className="text-gray-400 text-xs md:text-sm">{duration}</span>
      <audio ref={audioRef} src="/my-audio.mp3" />
    </div>
  </div>

  {/* Text Section */}
  <div className="w-full text-justify">
    <img
      src="./ElectrosStuff.png"
      alt="Electrosstuffs Logo"
      className="mb-6 mx-auto md:mx-0"
    />

    <h1 className="text-xl md:text-5xl font-extrabold tracking-wider md:tracking-wide mt-4 mb-4 text-center md:text-left">
      THE STORY BEHIND THE VISION
    </h1>

    {/* Image + Audio Player (Mobile view only) */}
    <div className="flex-shrink-0 w-full flex flex-col items-center mb-6 md:hidden">
      <img
        src="./image5.png"
        alt="Example"
        className="w-full h-auto max-h-[500px] object-cover"
      />

      <div className="flex items-center gap-3 mt-3 pt-3 text-white w-full justify-center">
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <span className="text-sm font-medium">Listen to article</span>
        <span className="text-gray-400 text-xs">{duration}</span>
        <audio ref={audioRef} src="/my-audio.mp3" />
      </div>
    </div>

    {/* Paragraphs */}
    <p className="text-xs leading-relaxed">
      <strong>Electrosstuffs Powering Innovation, One Idea at a Time.</strong> In a world where technology shapes every moment of our lives, Electrosstuffs is your trusted partner in turning imagination into reality. We are more than just an online electronics store we’re a hub of innovation, a bridge between ideas and execution, and a platform where technology meets creativity.
    </p>

    <p className="text-xs leading-relaxed mt-4">
      Whether you’re a hobbyist exploring Arduino, a robotics enthusiast building the next generation of machines, or a professional seeking cutting-edge IT solutions, Electrosstuffs has everything you need in one place. Our marketplace offers high-quality components, tools, and modules from microcontrollers and sensors to robotics kits and automation parts carefully selected for performance, durability, and compatibility.
    </p>

    <p className="text-xs leading-relaxed mt-4">
      But we go beyond hardware. Our IT services and SaaS solutions help businesses thrive in the digital age whether it’s building a robust web application, developing a scalable cloud platform, or implementing automation to streamline operations. Every solution is tailored to help you grow, adapt, and lead.
    </p>

    <p className="text-xs leading-relaxed mt-4">
      We’re also building a social media platform designed to connect innovators, entrepreneurs, and tech enthusiasts. It’s more than networking it’s a collaborative space where great minds share ideas, inspire others, and create together.
    </p>

    <p className="text-xs leading-relaxed mt-4">
      At Electrosstuffs, passion fuels us, expertise guides us, and technology inspires us. Whether you’re launching a startup, building a groundbreaking robot, or just beginning your journey in electronics, we’re here every step of the way.  
      <strong> Discover, create, and innovate with Electrosstuffs because technology isn’t just about machines, it’s about empowering people to dream bigger and change the world.</strong>
    </p>
  </div>
</div>





      {/* Insights Section */}
      <div className="flex flex-col md:flex-row text-left justify-center items-center md:items-start m-4 ">
        <div className="w-full md:w-[500px]">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Introducing Myself
          </h3>

          <div>
            <button className="text-sm sm:text-base text-black mt-4 mb-6 border bg-white px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
              Explore my journey
            </button>
          </div>

          <p className="text-white leading-relaxed text-base sm:text-lg tracking-wide">
            I wholeheartedly believe in the art and science of crafting digital
            experiences that transcend the ordinary creations that don’t just
            look visually stunning, but also generate real, measurable results
            that leave a lasting impact. Every pixel I place, every line of code
            I write, is driven by an unwavering passion for transforming
            challenges into elegant solutions through the power of design and
            development. For me, each project is more than just a task to
            complete; it is a living, breathing vision brought to life with
            meticulous attention to detail, purposeful intent, and a relentless
            focus on the needs of the user. This craft is not merely my
            profession, it is the core of my creative existence, a way to turn
            bold ideas into tangible realities that inspire, engage, and truly
            matter in the digital world.
          </p>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="flex flex-col items-center justify-center mt-10 mb-10 bg-white shadow-md  ">
        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[200px] font-extrabold text-black tracking-tighter border-b-4 border-gray-300 pb-4 text-center">
          FEATURED
        </span>
        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[200px] font-extrabold text-black tracking-tighter text-center pt-4">
          WORKS
        </span>
      </div>

      {/* Services Section */}
      <section className="py-12 ">
        <div className="max-w-7xl mx-auto  text-center">
          <h3 className="text-xl sm:text-2xl md:text-5xl font-bold text-white mb-4">
            Elevate Your Digital Presence
          </h3>
          <h1 className="font-extrabold mb-8 text-white text-7xl sm:text-9xl md:text-8xl lg:text-[200px] tracking-tighter">
            SERVICES
          </h1>
          {/* Multi-line Marquee */}
          <div
            className="overflow-hidden "
            style={{ transform: "rotate(-5deg)", padding: "1rem 0" }}
          >
            <div className="inline-block marquee text-white font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-widest px-10 ">
              CAPTURE. CREATE. INSPIRE. CAPTURE. CREATE. INSPIRE. CAPTURE.
              CREATE. INSPIRE.
            </div>
            <div
              className="inline-block marquee text-white font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-widest px-10"
              style={{ animationDirection: "reverse" }}
            >
              INNOVATE. DESIGN. DELIVER. INNOVATE. DESIGN. DELIVER. INNOVATE.
              DESIGN. DELIVER.
            </div>
            <div className="inline-block marquee text-white font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-widest px-10">
              BUILD. OPTIMIZE. SCALE. BUILD. OPTIMIZE. SCALE. BUILD. OPTIMIZE.
              SCALE.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-20 bg-white py-10  mx-auto ">
            {/* Service 1: Web Development */}
            <div className="flex flex-col items-start h-auto sm:h-[500px] px-2 group">
              <div className="relative w-full max-w-full h-72 sm:h-96 bg-black overflow-hidden mb-6 rounded-lg">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 m-auto h-16 w-16 text-indigo-600 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                  />
                </svg>

                {/* Image */}
                <img
                  src="./image2.jpg"
                  alt="Web Development"
                  className="absolute top-0 left-0 w-full h-full object-cover -translate-x-full opacity-0 transition-transform transition-opacity duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-black text-left w-full max-w-xs tracking-tight">
                Web Development
              </h3>
              <p className="text-black max-w-xs text-left text-sm sm:text-base">
                Building responsive, performant, and scalable websites tailored
                to your brand and goals.
              </p>
            </div>

            {/* Service 2: UI/UX Design */}
            <div className="flex flex-col items-start h-auto sm:h-[500px] px-2 group">
              <div className="relative w-full max-w-full h-72 sm:h-96 bg-black overflow-hidden mb-6 rounded-lg">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 m-auto h-16 w-16 text-indigo-600 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M16.5 7l-9 9-4 1 1-4 9-9z"
                  />
                </svg>

                {/* Image */}
                <img
                  src="./image1.jpg"
                  alt="UI/UX Design"
                  className="absolute top-0 left-0 w-full h-full object-cover -translate-x-full opacity-0 transition-transform transition-opacity duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-black text-left w-full max-w-xs">
                UI/UX Design
              </h3>
              <p className="text-black max-w-xs text-left text-sm sm:text-base">
                Crafting intuitive and engaging user experiences that keep your
                audience coming back.
              </p>
            </div>

            {/* Service 3: Consulting & Strategy */}
            <div className="flex flex-col items-start h-auto sm:h-[500px] px-2 group">
              <div className="relative w-full max-w-full h-72 sm:h-96 bg-black overflow-hidden mb-6 rounded-lg">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 m-auto h-16 w-16 text-indigo-600 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3a7 7 0 00-4 12.9v2.1a1 1 0 002 0v-2.1a7 7 0 004-12.9zM12 17h.01"
                  />
                </svg>

                {/* Image */}
                <img
                  src="./image3.jpg"
                  alt="Consulting & Strategy"
                  className="absolute top-0 left-0 w-full h-full object-cover -translate-x-full opacity-0 transition-transform transition-opacity duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-black text-left w-full max-w-xs">
                Consulting & Strategy
              </h3>
              <p className="text-black max-w-xs text-left text-sm sm:text-base">
                Helping you define the right digital strategies to maximize
                impact and growth.
              </p>
            </div>

            {/* Service 4: Content Writing */}
            <div className="flex flex-col items-start h-auto sm:h-[500px] px-2 group">
              <div className="relative w-full max-w-full h-72 sm:h-96 bg-black overflow-hidden mb-6 rounded-lg">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 m-auto h-16 w-16 text-indigo-600 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z"
                  />
                </svg>

                {/* Image */}
                <img
                  src="./image4.jpg"
                  alt="Content Writing"
                  className="absolute top-0 left-0 w-full h-full object-cover -translate-x-full opacity-0 transition-transform transition-opacity duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-black text-left w-full max-w-xs">
                Content Writing
              </h3>
              <p className="text-black max-w-xs text-left text-sm sm:text-base">
                Crafting compelling content that resonates with your audience
                and drives engagement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
