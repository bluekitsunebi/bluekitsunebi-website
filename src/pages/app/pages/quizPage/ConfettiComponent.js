import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const ConfettiComponent = () => {
  const animationRef = useRef();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (animationRef.current) {
      const myConfetti = confetti.create(animationRef.current, { resize: true });
      myConfetti({
        particleCount: 100,
        spread: 160,
      });
      // Set a timeout to hide the confetti component after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer); // Clear timeout if the component is unmounted
    }
  }, []);

  if (!show) return null;

  return <canvas ref={animationRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ConfettiComponent;
