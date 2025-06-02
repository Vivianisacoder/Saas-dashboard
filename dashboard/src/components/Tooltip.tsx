"use client";

import { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export default function Tooltip({
  content,
  children,
  position = "top",
  delay = 0,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  let timeout: NodeJS.Timeout;

  const showTooltip = () => {
    if (delay) {
      timeout = setTimeout(() => setIsVisible(true), delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeout) clearTimeout(timeout);
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = 0;
      let y = 0;

      switch (position) {
        case "top":
          x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          y = targetRect.top - tooltipRect.height - 8;
          break;
        case "bottom":
          x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          y = targetRect.bottom + 8;
          break;
        case "left":
          x = targetRect.left - tooltipRect.width - 8;
          y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
        case "right":
          x = targetRect.right + 8;
          y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
      }

      setCoords({ x, y });
    }
  }, [isVisible, position]);

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
              position === "top"
                ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                : position === "bottom"
                ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : position === "left"
                ? "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
                : "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
          />
        </div>
      )}
    </>
  );
}
