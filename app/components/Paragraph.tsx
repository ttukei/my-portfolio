import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface ParagraphProps {
  paragraph: string;
}

export default function Paragraph({paragraph} : ParagraphProps) {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.p 
      ref={container}         
      className="paragraph"
      style={{opacity}}
    >
      {paragraph}
    </motion.p>
  )
}