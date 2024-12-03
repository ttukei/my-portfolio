'use client';
import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import ThreeScene from './components/models/ThreeScene';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './page.module.scss'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 20); // Adjust the loading time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.25,
          start: 0,
          end: window.innerHeight,
          onUpdate: e => direction = e.direction * -1
        },
        x: "-500px",
      });
      requestAnimationFrame(animate);
    }
  }, [loading]);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <main ref={container} className="relative h-[200vh]">
      <LandingPage scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} slider={slider} firstText={firstText} secondText={secondText} />
    </main>
  );
}

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-32 h-32">
        <svg
          className="infinity-loader"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 50"
        >
          <path
            d="M 10,25 C 20,5 40,5 50,25 C 60,45 80,45 90,25 C 80,5 60,5 50,25 C 40,45 20,45 10,25 Z"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
        <style jsx>{`
          .infinity-loader path {
            stroke-dasharray: 223;
            stroke-dashoffset: 0;
            animation: dash 2s linear infinite;
          }
          @keyframes dash {
            0% {
              stroke-dashoffset: 150;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>

      {/* Loading Text */}
      <div className="absolute bottom-10 text-white text-xl animate-bounce">
        Loading...
      </div>
    </div>
  );
};

const LandingPage = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <motion.div style={{ scale, rotate }} className="sticky top-0 h-screen bg-black text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]">
      <div className="flex items-center justify-center h-full w-full">
        <ThreeScene />
      </div>
      <div className="absolute left-0 right-0 flex justify-between items-start z-10">
        <div
          className="text-white text-4xl tracking-widest flex flex-col items-start pl-10 absolute top-10 left-10"
          style={{
            zIndex: 10,
          }}
        >
          {"The waves of innovation are infinite".split(' ').map((word, idx) => (
            <span key={idx} className="block">{word}</span>
          ))}
        </div>
        <div
          className="text-white text-4xl tracking-widest flex flex-col items-end pr-10 absolute bottom-10 right-10"
          style={{
            zIndex: 10,
          }}
        >
          {"carried by the winds of curiosity.".split(' ').map((word, idx) => (
            <span key={idx} className="block">{word}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress, slider, firstText, secondText }: { scrollYProgress: any, slider: any, firstText: any, secondText: any }) => {
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0.5, 1], [0, -10]);

  return (
    <div className="relative flex h-screen mb-[100vh] overflow-hidden">
      <Image 
        src="/images/background.jpg"
        fill={true}
        alt="background"
        className="object-cover"
      />
      <div className="absolute top-[calc(100vh-350px)]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p ref={firstText} className="relative m-0 text-white text-[230px] font-medium pr-[50px]">Featured Projects -</p>
          <p ref={secondText} className="absolute left-full top-0 m-0 text-white text-[230px] font-medium pr-[50px]">Featured Projects -</p>
        </div>
      </div>
    </div>
  );
}