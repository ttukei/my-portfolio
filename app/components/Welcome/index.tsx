import { useTransform, motion } from "framer-motion";
import InfinitHello from "./InfiniteHello";
import MouseShadow from "./MouseShadow";
import { useRef } from "react";

const Welcome = (
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
    return (
      <motion.div style={{scale, rotate}} className="sticky top-0 h-screen text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh] noisy-background-black">
        <MouseShadow />
        <InfinitHello slider={slider} firstText={firstText} secondText={secondText} />
      </motion.div>
    );
  };

  export default Welcome;