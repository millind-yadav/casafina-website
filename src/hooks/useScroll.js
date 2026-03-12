import { useEffect } from 'react';
import useStore from '../store/useStore';

const SECTION_BREAKPOINTS = [0.16, 0.34, 0.52, 0.7, 0.88];

function resolveSection(progress) {
  for (let index = 0; index < SECTION_BREAKPOINTS.length; index += 1) {
    if (progress < SECTION_BREAKPOINTS[index]) {
      return index;
    }
  }

  return SECTION_BREAKPOINTS.length;
}

const useScroll = () => {
  const setScrollProgress = useStore((s) => s.setScrollProgress);
  const setCurrentSection = useStore((s) => s.setCurrentSection);
  const scrollProgress    = useStore((s) => s.scrollProgress);
  const currentSection    = useStore((s) => s.currentSection);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const progress   = scrollable > 0 ? window.scrollY / scrollable : 0;
      const section    = resolveSection(progress);

      setScrollProgress(progress);
      setCurrentSection(section);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress, setCurrentSection]);

  return { scrollProgress, currentSection };
};

export default useScroll;
