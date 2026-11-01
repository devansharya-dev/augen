
import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

import About from './components/About';
import Features from './components/FeaturesSection';
import Footer from './components/Footer';
import { Header } from './components/Header';
import Hero from './components/Hero';

function App() {
  const scrollRef = useRef(null);
  const [, setActiveDemo] = useState(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let scroll;
    let resizeObserver;

    const initScroll = () => {
      if (scroll) {
        scroll.destroy();
      }

      scroll = new LocomotiveScroll({
        el: scrollElement,
        smooth: true,
        lerp: 0.075,
        multiplier: 0.95,
        firefoxMultiplier: 50,
        touchMultiplier: 2,
        direction: 'vertical',
        smartphone: {
          smooth: true,
          lerp: 0.09,
        },
        tablet: {
          smooth: true,
          lerp: 0.09,
        },
      });

      window.locomotiveScroll = scroll;

      // Refresh after the page has rendered
      setTimeout(() => {
        scroll?.update();
      }, 400);
    };

    if (document.readyState === 'complete') {
      initScroll();
    } else {
      window.addEventListener('load', initScroll);
    }

    resizeObserver = new ResizeObserver(() => {
      scroll?.update();
    });

    resizeObserver.observe(scrollElement);

    return () => {
      window.removeEventListener('load', initScroll);

      resizeObserver?.disconnect();

      scroll?.destroy();

      if (window.locomotiveScroll === scroll) {
        delete window.locomotiveScroll;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100">
      <Header setActiveDemo={setActiveDemo} />

      <div ref={scrollRef} data-scroll-container>
        <Hero setActiveDemo={setActiveDemo} />

        <Features />

        {/* Demo and NewPage temporarily removed */}

        <About />

        <Footer />
      </div>
    </div>
  );
}

export default App;
