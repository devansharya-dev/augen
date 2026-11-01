
import { motion } from "framer-motion";

const Hero = ({ setActiveDemo }) => {
  const scrollToSection = (id) => {
    const scroll = window.locomotiveScroll;

    if (scroll) {
      scroll.scrollTo(id, {
        offset: -20,
        duration: 1100,
        easing: [0.22, 1, 0.36, 1],
      });
    } else {
      document.querySelector(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      data-scroll-section
      className="relative min-h-screen w-full overflow-hidden bg-[#c9daf5] text-white"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d19] via-[#263f70] via-[42%] to-[#e2edff]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_48%_65%,rgba(255,255,255,0.35),transparent_55%)]" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1700px] flex-col px-6 md:px-12 lg:px-16">

        {/* NAVBAR */}
       

        {/* HERO VISUAL */}
        <div className="relative flex flex-1 items-center justify-center">

          {/* LARGE TYPOGRAPHIC PRODUCT REPLACEMENT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex w-full flex-col items-center justify-center select-none"
          >
            {/* BACKGROUND LETTER */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] text-[clamp(15rem,38vw,35rem)] font-black leading-none tracking-[-0.12em] text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.22)",
              }}
            >
              A
            </span>

            {/* MAIN TYPOGRAPHY */}
            <div className="relative z-10 text-center">
              <h1 className="text-[clamp(4.5rem,13vw,12rem)] font-black uppercase leading-[0.8] tracking-[-0.095em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.12)]">
                ASTRA
              </h1>

              <motion.h2
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-3 text-[clamp(3.5rem,10vw,9rem)] font-light uppercase leading-none tracking-[0.08em] text-[#dbeaff]"
              >
                VISION
              </motion.h2>
            </div>

            {/* SOFT REFLECTION */}
            <div className="pointer-events-none absolute left-1/2 top-[55%] h-24 w-[65%] -translate-x-1/2 rounded-full bg-white/20 blur-[65px]" />

          </motion.div>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="flex flex-col items-start justify-between gap-8 pb-12 sm:flex-row sm:items-end md:pb-16">

          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="max-w-sm"
          >
            <h3 className="text-xl font-semibold tracking-tight text-[#101a2c] md:text-2xl">
              See smarter. Live lighter.
            </h3>

            <p className="mt-3 max-w-xs text-xs leading-6 text-[#273a59]/75 md:text-sm">
              Experience a new way of seeing the world.
              Intelligent eyewear designed to bring
              technology closer to everyday life.
            </p>

            <button
              onClick={() => scrollToSection("#newpage")}
              className="mt-5 rounded-md bg-[#101a2c] px-5 py-3 text-[10px] font-semibold text-white transition-all duration-300 hover:bg-blue-700"
            >
              Explore the experience ↗
            </button>
          </motion.div>

          {/* RIGHT CTA */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            onClick={() => scrollToSection("#newpage")}
            className="group flex items-center gap-5 rounded-full border border-[#172b4c]/20 bg-white/20 px-6 py-3 text-xs text-[#172b4c] backdrop-blur-md transition hover:bg-white/50"
          >
            Discover what's possible
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.button>

        </div>
      </div>
    </section>
  );
};

export default Hero;
