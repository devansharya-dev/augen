import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Demo", href: "#newpage" },
  { name: "About", href: "#about" },
];

export function Header({ setActiveDemo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScrollPos = (y) => {
      // Smooth hysteresis: hides cleanly past 50px, shows smoothly near top (< 20px)
      if (y > 50) {
        setIsScrolled(true);
      } else if (y < 20) {
        setIsScrolled(false);
      }
    };

    // Listen to standard window scroll
    const onWindowScroll = () => {
      handleScrollPos(window.scrollY);
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    // Listen to Locomotive Scroll
    const onLocoScroll = (instance) => {
      const y = instance?.scroll?.y ?? 0;
      handleScrollPos(y);
    };

    let loco = window.locomotiveScroll;
    if (loco) {
      loco.on("scroll", onLocoScroll);
    }

    const interval = setInterval(() => {
      if (!loco && window.locomotiveScroll) {
        loco = window.locomotiveScroll;
        loco.on("scroll", onLocoScroll);
      }
    }, 150);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", onWindowScroll);
      if (loco) {
        loco.off("scroll", onLocoScroll);
      }
    };
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 z-[100] w-full py-5 md:py-7
          transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform
          ${
            isScrolled
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100 pointer-events-auto"
          }
        `}
      >
        <div className="mx-auto flex max-w-[1700px] items-center justify-between px-6 md:px-12">

          {/* LOGO */}
          <button
            onClick={() => scrollToSection("#home")}
            className="text-3xl font-semibold tracking-[-0.07em] text-white transition-colors duration-300 hover:opacity-90 cursor-pointer"
          >
            augen<span className="text-blue-400">.</span>
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="
              hidden items-center gap-1 rounded-full p-1.5
              border border-white/15 bg-white/10 backdrop-blur-md
              transition-[background-color,border-color,box-shadow] duration-500 md:flex
              shadow-lg shadow-black/5
            "
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="
                  rounded-full px-5 py-2.5
                  text-[11px] font-medium tracking-wide
                  text-white/75
                  transition-[background-color,color] duration-300 ease-out
                  hover:bg-white hover:text-[#111827]
                  cursor-pointer
                "
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={() => scrollToSection("#newpage")}
              className="
                ml-1 rounded-full bg-white px-6 py-2.5
                text-[11px] font-semibold text-[#101522]
                transition-[background-color,transform] duration-300 ease-out
                hover:bg-blue-100 active:scale-95
                cursor-pointer
              "
            >
              Explore ↗
            </button>
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full border border-white/20
              bg-white/10 text-xl text-white
              backdrop-blur-md transition-[background-color,border-color] duration-300 md:hidden cursor-pointer
            "
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
            absolute left-6 right-6 top-full mt-3
            overflow-hidden rounded-2xl
            border border-white/10 bg-[#101827]/95
            shadow-2xl backdrop-blur-2xl
            transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden
            ${
              menuOpen
                ? "visible translate-y-0 opacity-100 pointer-events-auto"
                : "invisible -translate-y-3 opacity-0 pointer-events-none"
            }
          `}
        >
          <div className="flex flex-col p-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="
                  border-b border-white/10 px-4 py-4
                  text-left text-base font-medium
                  text-white/80 transition-colors duration-200 hover:text-white cursor-pointer
                "
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={() => scrollToSection("#newpage")}
              className="
                mt-4 rounded-full bg-white py-3.5
                text-sm font-semibold text-[#101522] cursor-pointer
              "
            >
              Explore Pro-X ↗
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
