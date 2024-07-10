import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

export const useSlides = ({ length }: { length: number }) => {
  const [match, params] = useRoute("/*?/:index");
  const [location, navigate] = useLocation();

  const [isFull, setFull] = useState(false);
  useEffect(() => {
    setFull(isFullscreen());
    document.addEventListener("fullscreenchange", () =>
      setFull(isFullscreen()),
    );
  }, []);

  const next = () => {
    if (match && params?.index != null) {
      navigate(
        location.replace(
          /\/\d+$/,
          `/${Math.min(Number.parseInt(params.index) + 1, Math.max(length - 1, 0))}`,
        ),
      );
    } else {
      navigate("./0");
    }
  };
  const prev = () => {
    if (match && params?.index != null) {
      navigate(
        location.replace(
          /\/\d+$/,
          `/${Math.max(Number.parseInt(params.index) - 1, 0)}`,
        ),
      );
    } else {
      navigate("./0");
    }
  };

  const isFullscreen = () => document.fullscreenElement != null;
  const fullscreen = () => {
    if (isFullscreen()) return;
    document.documentElement.requestFullscreen();
  };
  const exitFullscreen = () => {
    if (!isFullscreen() || !document.exitFullscreen) return;
    document.exitFullscreen();
  };
  const toggleFullscreen = () => {
    if (isFullscreen()) {
      exitFullscreen();
    } else {
      fullscreen();
    }
  };

  return {
    next,
    prev,
    isFullscreen,
    fullscreen,
    exitFullscreen,
    toggleFullscreen,
  };
};
