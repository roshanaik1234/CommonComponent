import { useEffect, useState } from "react";
import "./ScrollProgressBar.css";

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="progress-bar-track">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ScrollProgressBar;