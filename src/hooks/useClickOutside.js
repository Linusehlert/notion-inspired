import { useEffect } from "react";

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref?.current?.contains(e.target)) {
        handler(e);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler]);
};
