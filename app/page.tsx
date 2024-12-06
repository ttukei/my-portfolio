'use client';
import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import Lenis from '@studio-freight/lenis';
import { ServiceData } from "./constants";
import Paragraph from './components/Word';
import Word from './components/Paragraph';
import Character from './components/Character';
gsap.registerPlugin(ScrollTrigger);


// Main component for the Home page
export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  let xPercent = 0;
  let direction = -1;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Lenis smooth scrolling setup
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // GSAP animation for the slider
  useEffect(() => {
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          direction = e.direction * -1.5;
        },
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  // Animation function for the text
  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  // Mouse move handler to update mouse position state
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;
    setMousePosition({ x, y });
  };

  return (
    <main ref={container} className="relative h-[200vh] hover-container" onMouseMove={handleMouseMove}>
      <LandingPage scrollYProgress={scrollYProgress}
      slider={slider}
      firstText={firstText}
      secondText={secondText} />
      <Section2
        scrollYProgress={scrollYProgress}
        slider={slider}
        firstText={firstText}
        secondText={secondText}
      />
    </main>
  );
}

// Component for the landing page section
const LandingPage = (
  {
    scrollYProgress,
    slider,
    firstText,
    secondText,
  }: {
    scrollYProgress: any;
    slider: any;
    firstText: any;
    secondText: any;
  }
) => {
  const scale = useTransform(scrollYProgress, [0.1, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0.1, 1], [0, -10]);
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });

  // Mouse move and leave handlers to update mouse position state
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -1, y: -1 });
  };

  // Add event listeners for mouse move and leave
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div style={{scale, rotate}} className="sticky top-0 h-screen text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh] noisy-background-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            mousePosition.x === -1 && mousePosition.y === -1
              ? "none"
              : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), rgba(17, 17, 17, 0) 70%)`,
        }}
      />
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-full z-20 text-gray-300">
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between">
          <div className="flex justify-between w-full text-[1.8vw]">
            <p className="text-left px-10">Timon Tukei</p>
            <p className="text-center">Seatlle, Washington</p>
            <p className="text-right px-10">Developer</p>
          </div>
        </header>
        <div className="absolute top-[calc(100vh-300px)]">
          <div ref={slider} className="relative whitespace-nowrap">
            <p ref={firstText} className="absolute relative m-0 text-white text-[230px] font-medium pr-[50px]">Hello 你好 Hola नमस्ते </p>
            <p ref={secondText} className="absolute left-full top-0 m-0 text-white text-[230px] font-medium pr-[50px] ">Hello 你好 Hola नमस्ते </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Component for the second section
const Section2 = () => {
 return (
    <div className="h-screen w-full bg-white">
      <About />
    </div>
  );
};

// Component for the active slider
const About = () => { 

  return (
    <div className='absolute w-full bg-white flex items-center justify-center'>
      <div className="h-screen"></div>
      <Character paragraph="I am a creative developer from Uganda, Kampala." />
    </div>
  );
};
