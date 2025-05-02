import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initScrollAnimation({ modelRef, canvasRef }) {
  if (!modelRef.current) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: canvasRef ? canvasRef.current : 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      marker: true,
      onUpdate: (self) => {
        console.log('scrollTrigger:', self);
      }
    }
  });

  tl.to(modelRef.current.rotation, {
    y: Math.PI * 2,
    ease: 'none'
  });

  return () => {
    if (tl.scrollTrigger) {
      tl.scrollTrigger.kill();
    }
  };
}

export default initScrollAnimation;
