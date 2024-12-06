import { useState, useEffect } from "react";

const MouseShadow = () => {
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
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          mousePosition.x === -1 && mousePosition.y === -1
            ? "none"
            : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), rgba(17, 17, 17, 0) 70%)`,
      }}
    />
  );
};

export default MouseShadow;