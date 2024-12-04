'use client';
import { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import ThreeScene from './components/models/ThreeScene';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './page.module.scss';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";
import { ServiceData } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  let xPercent = 0;
  let direction = -1;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          direction = e.direction * -1;
        },
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

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

  return (
    <main ref={container} className="relative h-[200vh]">
      <LandingPage scrollYProgress={scrollYProgress} />
      <Section2
        scrollYProgress={scrollYProgress}
        slider={slider}
        firstText={firstText}
        secondText={secondText}
      />
    </main>
  );
}

const LandingPage = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const scale = useTransform(scrollYProgress, [0.1, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0.1, 1], [0, -10]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen bg-black text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]"
    >
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-black bg-opacity-50 z-20">
        <div className="flex-1 text-center">
          <div>Timon Tukei</div>
        </div>
        <div className="flex-1 text-center">
          <div>Developer</div>
        </div>
        <div className="flex-1 text-center">
          <div>Seattle, Washington</div>
        </div>
      </header>
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="Videos/3611036-hd_1920_1080_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex items-center justify-center h-full w-full relative z-10">
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

const Section2 = ({
  scrollYProgress,
  slider,
  firstText,
  secondText,
}: {
  scrollYProgress: any;
  slider: any;
  firstText: any;
  secondText: any;
}) => {
  return (
    <div className="relative flex flex-col h-screen mb-[100vh] overflow-hidden">
      <Image
        src="/Images/pexels-didsss-26756411.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0 z-0" alt={''}
      />
      <div className="mt-[-50px]"> {/* Adjust this margin to move the slider up */}
        <ActiveSlider />
      </div>
      <div className="absolute top-[calc(100vh-350px)]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p ref={firstText} className="relative m-0 text-white text-[230px] font-medium pr-[50px]">Featured Projects -</p>
          <p ref={secondText} className="absolute left-full top-0 m-0 text-white text-[230px] font-medium pr-[50px]">Featured Projects -</p>
        </div>
      </div>
    </div>
  );
};

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center flex-col h-[900px] bg-[#6c34af]">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        modules={[FreeMode]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
              />
              <div className="relative z-10">
                <item.icon className="text-4xl mb-4" />
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
