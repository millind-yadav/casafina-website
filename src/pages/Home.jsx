import useScroll from '../hooks/useScroll';
import useStore from '../store/useStore';
import { Helmet } from 'react-helmet-async';

import CityScene       from '../components/scene/CityScene';
import HeroSection     from '../components/sections/HeroSection';
import AboutSection    from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import CTASection      from '../components/sections/CTASection';
import FooterSection   from '../components/sections/FooterSection';
import ProgressBar     from '../components/ui/ProgressBar';
import ScrollIndicator from '../components/ui/ScrollIndicator';
import Marquee         from '../components/ui/Marquee';

const MARQUEE_ITEMS = [
  'Project Conceptualization',
  'Construction Management',
  'Engineering Design & Construction',
  'Procurement of Materials',
  'Quality Assurance',
  'Residential & Commercial',
];

function Home() {
  // Activate scroll tracking — updates zustand store
  useScroll();

  const scrollProgress = useStore((s) => s.scrollProgress);
  const showMarquee    = scrollProgress < 0.18; // visible during hero + early about

  return (
    <>
      <Helmet>
        <title>Casafina Construction | We Build Your Visions</title>
        <meta name="description" content="Casafina Construction Company Limited provides end-to-end construction services in Lagos, delivering quality residential and commercial projects with precision, innovation, and professionalism." />
        <meta property="og:title" content="Casafina Construction | We Build Your Visions" />
        <meta property="og:description" content="Casafina Construction Company Limited provides end-to-end construction services in Lagos, delivering quality residential and commercial projects with precision, innovation, and professionalism." />
      </Helmet>

      {/* Fixed 3-D canvas — behind everything */}
      <CityScene />

      {/* Scroll spacer — gives the page height so it is scrollable */}
      <div
        style={{
          height: '900vh',
          position: 'relative',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Section overlays */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <CTASection />
      <FooterSection />

      {/* Global HUD */}
      <ProgressBar />
      <ScrollIndicator />

      {/* Marquee — sits just above bottom-of-hero */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 25,
          opacity: showMarquee ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: showMarquee ? 'all' : 'none',
        }}
      >
        <Marquee items={MARQUEE_ITEMS} speed="25s" />
      </div>
    </>
  );
}

export default Home;
