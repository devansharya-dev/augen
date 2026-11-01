
import { motion } from "framer-motion";

const Footer = () => {
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

  const navigation = [
    { label: "Home", id: "#home", number: "01" },
    { label: "Features", id: "#features", number: "02" },
    { label: "About", id: "#about", number: "03" },
  ];

  return (
    <footer
      data-scroll-section
      className="relative isolate w-full overflow-hidden px-5 pb-8 pt-20 text-[#10192E] md:px-12 md:pt-28 lg:px-20"
    >
      {/* BACKGROUND — MATCHING THE HERO */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#080d19] via-[#263f70] via-[42%] to-[#e2edff]" />

      {/* SOFT RADIAL LIGHT */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_48%_65%,rgba(255,255,255,0.35),transparent_55%)]" />

      {/* BACKGROUND DETAILS */}
      <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-[450px] w-[450px] rounded-full border border-white/15 md:h-[600px] md:w-[600px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[350px] w-[350px] rounded-full bg-white/20 blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px]">

        {/* TOP BRAND LINE */}
        <div className="mb-16 flex flex-wrap items-center justify-between gap-5 border-b border-white/25 pb-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#C5D9FA]" />

            <span className="font-mono text-[9px] tracking-[0.3em] text-white/75">
              AUGEN / INTELLIGENT EYEWEAR
            </span>
          </div>

          <span className="font-mono text-[9px] tracking-[0.25em] text-white/50">
            INDIA / GLOBAL
          </span>
        </div>

        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_0.6fr]">

          {/* BRAND SECTION */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <span className="mb-5 block font-mono text-[9px] tracking-[0.35em] text-[#C5D9FA]">
                SEE BEYOND THE ORDINARY
              </span>

              <h2
                data-scroll
                data-scroll-speed="-0.1"
                className="select-none font-serif text-[21vw] leading-[0.75] tracking-[-0.09em] text-white md:text-[15vw] lg:text-[190px]"
              >
                AUGEN<span className="text-[#AFCBF5]">.</span>
              </h2>
            </motion.div>

            <div className="mt-12 max-w-[470px]">
              <h3 className="font-serif text-3xl leading-tight text-white md:text-4xl">
                Technology that
                <span className="text-[#C5D9FA]">
                  {" "}sees differently.
                </span>
              </h3>

              <p className="mt-5 max-w-[390px] text-sm leading-8 text-white/70">
                Bringing intelligence closer to human vision.
                A new perspective on how we interact with
                the world around us.
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:w-full lg:max-w-[350px] lg:justify-self-end lg:grid-cols-1">

            <div>
              <span className="mb-8 block font-mono text-[9px] tracking-[0.3em] text-[#D4E3FF]">
                EXPLORE / DIRECTORY
              </span>

              <div className="flex flex-col">
                {navigation.map((link) => (
                  <button
                    key={link.number}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="group flex w-full items-center justify-between border-b border-white/25 py-5 text-left"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-[9px] text-[#C5D9FA]">
                        {link.number}
                      </span>

                      <span className="font-serif text-3xl text-white/80 transition-all duration-300 group-hover:translate-x-2 group-hover:text-white md:text-4xl">
                        {link.label}
                      </span>
                    </div>

                    <span className="text-lg text-[#C5D9FA] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white">
                      ↗
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <span className="mb-6 block font-mono text-[9px] tracking-[0.3em] text-[#D4E3FF]">
                GET IN TOUCH
              </span>

              <p className="font-serif text-2xl leading-snug text-white">
                Have something
                <br />
                in mind?
              </p>

              <a
                href="mailto:hello@augen.com"
                className="mt-5 inline-flex items-center gap-3 border-b border-white/70 pb-2 font-mono text-[10px] tracking-[0.15em] text-white transition-colors hover:text-[#C5D9FA]"
              >
                LET'S CONNECT
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* BRAND STATEMENT */}
        <div className="relative mt-24 overflow-hidden border-y border-[#26395F]/25 py-9 md:mt-32 md:py-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <h3 className="max-w-[650px] font-serif text-3xl leading-tight text-[#10192E] md:text-5xl">
              The future is not something you watch.
              <span className="text-[#435B82]">
                {" "}It's something you experience.
              </span>
            </h3>

            <span className="font-mono text-[9px] tracking-[0.25em] text-[#26395F]/75">
              AUGEN PRO-X / 001
            </span>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col justify-between gap-6 pt-8 sm:flex-row sm:items-center">

          <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] tracking-[0.2em] text-[#26395F]/70">
            <span>© 2026 AUGEN</span>
            <span className="text-[#435B82]">/</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#263F70]" />

            <span className="font-mono text-[9px] tracking-[0.25em] text-[#26395F]/75">
              DESIGNED FOR A NEW PERSPECTIVE
            </span>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="group flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] text-[#26395F]/75 transition-colors hover:text-[#10192E]"
          >
            BACK TO TOP

            <span className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
