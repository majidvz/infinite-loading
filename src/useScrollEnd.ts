import { useEffect, useState } from "react";

export const useScrollEnd = () => {
  const [isEndOfPage, setIsEndOfPage] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 5) {
        setIsEndOfPage(true);
      } else {
        setIsEndOfPage(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isEndOfPage;
};
