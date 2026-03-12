import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar      from './components/ui/Navbar';
import Cursor      from './components/ui/Cursor';
import ScrollToTop from './components/ui/ScrollToTop';
import Loader      from './components/ui/Loader';

const Home              = lazy(() => import('./pages/Home'));
const About             = lazy(() => import('./pages/About'));
const Services          = lazy(() => import('./pages/Services'));
const Projects          = lazy(() => import('./pages/Projects'));
const ProjectDetail     = lazy(() => import('./pages/ProjectDetail'));
const Contact           = lazy(() => import('./pages/Contact'));
const Quote             = lazy(() => import('./pages/Quote'));
const QualityAssurance  = lazy(() => import('./pages/QualityAssurance'));
const Career            = lazy(() => import('./pages/Career'));
const NotFound          = lazy(() => import('./pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      >
        <Routes location={location}>
          <Route path="/"                    element={<Home />} />
          <Route path="/about"               element={<About />} />
          <Route path="/services"            element={<Services />} />
          <Route path="/projects"            element={<Projects />} />
          <Route path="/projects/:slug"      element={<ProjectDetail />} />
          <Route path="/contact"             element={<Contact />} />
          <Route path="/quote"               element={<Quote />} />
          <Route path="/quality-assurance"   element={<QualityAssurance />} />
          <Route path="/career"              element={<Career />} />
          <Route path="*"                    element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HashRouter>
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-100%',
          left: '1rem',
          background: '#D4922A',
          color: '#050507',
          padding: '0.6rem 1.2rem',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textDecoration: 'none',
          zIndex: 9999,
          transition: 'top 0.2s',
        }}
        onFocus={(e) => { e.currentTarget.style.top = '1rem'; }}
        onBlur={(e)  => { e.currentTarget.style.top = '-100%'; }}
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Cursor />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<Loader />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
    </HashRouter>
  );
}

export default App;
