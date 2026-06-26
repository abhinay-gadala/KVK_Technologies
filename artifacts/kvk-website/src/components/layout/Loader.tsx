import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import { useLoader } from "./LoaderContext";

gsap.registerPlugin(useGSAP, CustomEase);

export default function Loader() {
  const container = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const { setLoaderDone } = useLoader();

  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isAnimating]);

  useGSAP(() => {
    if (!isAnimating) return;
    
    CustomEase.create("appleEase", "0.65, 0, 0.35, 1");

    const drawPaths = gsap.utils.toArray(".draw-path") as SVGPathElement[];
    
    drawPaths.forEach(path => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setLoaderDone(true);
      }
    });

    gsap.fromTo(".logo-container", 
        { scale: 0.98, rotation: -0.5 },
        { scale: 1, rotation: 0, duration: 6, ease: "power1.out" }
    );

    tl.to({}, { duration: 0.6 })
      .to("#init-line", { attr: { y1: 20, y2: 80 }, duration: 1.2, ease: "appleEase" })
      .to("#init-line", { attr: { x1: 65, x2: 65 }, duration: 1.2, ease: "appleEase" }, "+=0.3")
      .to(".draw-path", { strokeDashoffset: 0, duration: 1.6, ease: "appleEase", stagger: 0.2 }, "-=0.6")
      .to("#mask-rect", { attr: { width: 300 }, duration: 1.8, ease: "appleEase" }, "+=0.1")
      .to(".thin-strokes", { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "-=1.4")
      .to({}, { duration: 0.5 })
      .to(".loader-wrapper", { yPercent: -100, duration: 1.6, ease: "appleEase" });

  }, { scope: container, dependencies: [isAnimating] });

  if (!isAnimating) return null;

  return (
    <div ref={container} className="loader-wrapper fixed inset-0 w-full h-[100dvh] flex justify-center items-center bg-[#0A0A0A] z-[9999] will-change-transform">
      <div className="logo-container flex justify-center items-center origin-center will-change-transform">
        <svg className="logo-svg w-[280px] h-auto overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <clipPath id="logo-clip">
              <rect id="mask-rect" x="0" y="0" width="0" height="100" />
            </clipPath>
          </defs>

          <g className="thick-letters" stroke="#ffffff" strokeWidth="5" fill="none" clipPath="url(#logo-clip)" strokeLinecap="butt" strokeLinejoin="miter">
            <path d="M 65 20 L 65 80" />
            <path d="M 95 20 L 65 50 L 95 80" />
            <path d="M 120 20 L 150 80 L 180 20" />
            <path d="M 205 20 L 205 80" />
            <path d="M 235 20 L 205 50 L 235 80" />
          </g>

          <g className="thin-strokes" stroke="#ffffff" strokeWidth="1.2" fill="none" strokeLinecap="butt" strokeLinejoin="miter">
            <line id="init-line" x1="150" y1="50" x2="150" y2="50" />
            
            <path className="draw-path" d="M 95 20 L 65 50 L 95 80" />
            <path className="draw-path" d="M 120 20 L 150 80 L 180 20" />
            <path className="draw-path" d="M 205 20 L 205 80" />
            <path className="draw-path" d="M 235 20 L 205 50 L 235 80" />
          </g>
        </svg>
      </div>
    </div>
  );
}
