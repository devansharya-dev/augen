import { memo } from "react";
import { motion } from "framer-motion";

const smoothEase = [0.16, 1, 0.3, 1];

const features = [
  {
    number: "01",
    category: "INTELLIGENCE",
    title: "Automation",
    desc: "Intelligent workflows that simplify the way you interact with the world.",
    img: "/images/automation_opt.jpg",
    size: "md:col-span-7",
    offset: "",
  },
  {
    number: "02",
    category: "PERCEPTION",
    title: "AI Insights",
    desc: "Turn complex information into instant, meaningful clarity.",
    img: "/images/AI_Insights_2_opt.jpg",
    size: "md:col-span-5",
    offset: "md:mt-24",
  },
  {
    number: "03",
    category: "CONNECTIVITY",
    title: "Real-time Sync",
    desc: "Stay connected with live updates and seamless information flow.",
    img: "/images/real-time-sync_opt.jpg",
    size: "md:col-span-5",
    offset: "md:-mt-16",
  },
  {
    number: "04",
    category: "PROTECTION",
    title: "Security",
    desc: "Your privacy comes first. Intelligent protection, built into every interaction.",
    img: "/images/security_opt.jpg",
    size: "md:col-span-7",
    offset: "",
  },
];

const FeatureCard = memo(({ feature, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: smoothEase,
      }}
      className={`
        group relative isolate flex min-h-[390px] flex-col
        overflow-hidden rounded-2xl
        border border-white/25
        bg-[#10192E]/60
        shadow-[0_15px_35px_rgba(16,25,46,0.12)]
        transition-[transform,box-shadow,border-color] duration-500 ease-out
        transform-gpu will-change-transform
        hover:-translate-y-2
        hover:border-white/60
        hover:shadow-[0_25px_50px_rgba(16,25,46,0.22)]
        ${feature.size} ${feature.offset}
      `}
    >
      {/* BACKGROUND IMAGE - OPTIMIZED & DECOUPLED */}
      <img
        src={feature.img}
        alt={feature.title}
        loading="lazy"
        decoding="async"
        className="
          absolute inset-0 h-full w-full object-cover
          opacity-70
          transition-[transform,opacity] duration-700 ease-out
          transform-gpu will-change-transform
          group-hover:scale-105
          group-hover:opacity-90
        "
      />

      {/* IMAGE OVERLAY */}
      <div className="
        absolute inset-0
        bg-gradient-to-t
        from-[#10192E]/90
        via-[#10192E]/30
        to-[#10192E]/10
      " />

      {/* HOVER BORDER */}
      <div className="
        pointer-events-none absolute inset-0
        rounded-2xl border border-transparent
        transition-colors duration-500 ease-out
        group-hover:border-white/60
      " />

      {/* CARD CONTENT */}
      <div className="relative z-10 flex min-h-[390px] flex-col justify-between p-7 md:p-10">

        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/80">
            AUGEN / {feature.number}
          </span>

          <span className="
            flex h-10 w-10 items-center justify-center
            rounded-full border border-white/40
            text-base text-white
            transition-[transform,background-color,color,border-color] duration-300 ease-out
            group-hover:border-white
            group-hover:bg-white
            group-hover:text-[#10192E]
            group-hover:scale-105
          ">
            ↗
          </span>
        </div>

        <div className="max-w-[390px]">
          <span className="mb-4 block font-mono text-[9px] tracking-[0.3em] text-[#C7D9F5]">
            {feature.category}
          </span>

          <h3 className="
            font-sans text-4xl font-semibold
            leading-[0.95] tracking-[-0.055em]
            text-white md:text-6xl
          ">
            {feature.title}
          </h3>

          <p className="mt-5 max-w-[300px] text-sm leading-7 text-white/80">
            {feature.desc}
          </p>

          <div className="
            mt-8 h-px w-12 bg-white/70
            transition-[width] duration-500 ease-out
            group-hover:w-24
          " />
        </div>
      </div>
    </motion.article>
  );
});

const Featured = () => {
  return (
    <section
      id="features"
      data-scroll-section
      className="
        relative isolate w-full overflow-hidden
        px-5 py-24 text-[#10192E]
        md:px-12 md:py-36 lg:px-20
      "
    >
      {/* SEAMLESS BLEND FROM PREVIOUS SECTION */}
      <div className="
        pointer-events-none absolute inset-x-0 top-0 h-32 -z-15
        bg-gradient-to-b from-[#e2edff]/30 via-transparent to-transparent
      " />

      {/* MAIN BACKGROUND */}
      <div className="
        pointer-events-none absolute inset-0 -z-20
        bg-gradient-to-b
        from-[#080d19]
        via-[#263f70]
        via-[42%]
        to-[#e2edff]
      " />

      {/* ATMOSPHERIC LIGHT */}
      <div className="
        pointer-events-none absolute inset-0 -z-10
        bg-[radial-gradient(ellipse_at_48%_65%,rgba(255,255,255,0.35),transparent_55%)]
      " />

      {/* SOFT BACKGROUND GLOW - HIGH-PERFORMANCE RADIAL GRADIENT */}
      <div
        className="
          pointer-events-none absolute -left-40 top-[35%] -z-10
          h-[500px] w-[500px] rounded-full
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]
          transform-gpu
        "
      />

      <div className="relative mx-auto max-w-[1440px]">

        {/* INTRODUCTION */}
        <div className="mb-24 md:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="mb-12 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-white/70" />

            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/75">
              A different way of seeing
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">

            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.85, delay: 0.05, ease: smoothEase }}
              className="
                font-sans text-[19vw] font-bold
                leading-[0.77] tracking-[-0.075em]
                text-white md:text-[14vw] lg:text-[175px]
              "
            >
              SEE
              <br />
              <span className="text-[#C7D9F5]">
                BEYOND.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.85, delay: 0.1, ease: smoothEase }}
              className="max-w-[370px] pb-3 lg:justify-self-end"
            >
              <span className="mb-5 block font-mono text-[10px] tracking-[0.25em] text-white/70">
                AUGEN PRO-X / 001
              </span>

              <p className="font-sans text-2xl font-medium leading-[1.35] text-white md:text-3xl">
                Technology should feel less like technology.
                It should feel like an extension of you.
              </p>

              <p className="mt-6 max-w-[320px] text-sm leading-7 text-white/70">
                A new perspective on everyday life. Intelligent vision,
                seamless interaction and technology designed to stay
                out of your way.
              </p>

              <div className="mt-9 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#C7D9F5]" />

                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/75">
                  Designed around human vision
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FEATURE SECTION INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.75, ease: smoothEase }}
          className="
            mb-10 flex flex-col justify-between gap-6
            border-b border-white/35 pb-6
            md:flex-row md:items-end
          "
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/75">
              01 / WHAT MAKES US DIFFERENT
            </span>

            <h3 className="
              mt-4 font-sans text-4xl font-semibold
              leading-tight tracking-[-0.055em]
              text-white md:text-5xl
            ">
              More than meets
              <br className="hidden md:block" /> the eye.
            </h3>
          </div>

          <p className="max-w-[270px] text-sm leading-7 text-white/75">
            Four capabilities. One seamless experience.
            Designed to work naturally with your everyday life.
          </p>
        </motion.div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* PRODUCT PHILOSOPHY */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: smoothEase }}
          className="
            relative mt-32 overflow-hidden
            rounded-3xl border border-white/40
            bg-[#10192E]/40 px-8 py-16
            text-[#10192E]
            shadow-[0_20px_50px_rgba(16,25,46,0.10)]
            transform-gpu
            transition-[box-shadow] duration-500
            md:mt-44 md:px-16 md:py-24
          "
        >
          {/* DECORATIVE BACKGROUND LETTER */}
          <div
            className="
              pointer-events-none absolute -right-12 -top-20
              select-none font-sans text-[260px]
              font-bold leading-none text-white/15
            "
          >
            A
          </div>

          <div
            className="
              pointer-events-none absolute -bottom-32 -right-20
              h-80 w-80 rounded-full border border-white/30
            "
          />

          <div className="
            pointer-events-none absolute -bottom-16 -right-4
            h-52 w-52 rounded-full border border-[#263f70]/15
          " />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_0.6fr] lg:items-end">
            <div>
              <div className="mb-9 flex items-center gap-4">
                <span className="h-px w-12 bg-[#263f70]" />

                <span className="font-mono text-[9px] tracking-[0.3em] text-[#263f70]">
                  OUR DESIGN PHILOSOPHY
                </span>
              </div>

              <h3 className="
                max-w-[750px] font-sans text-5xl
                font-semibold leading-[0.98]
                tracking-[-0.055em] text-[#10192E]
                md:text-7xl
              ">
                Less distraction.
                <br />
                <span className="text-[#435B82]">
                  More connection.
                </span>
              </h3>
            </div>

            <div className="max-w-[350px] lg:justify-self-end">
              <p className="text-sm leading-8 text-[#26395F]/80">
                We believe technology should fit into your life,
                not take you away from it. AUGEN is built around
                a simpler idea: keep your attention on what matters.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-8 bg-[#263f70]" />

                <span className="font-mono text-[9px] tracking-[0.25em] text-[#263f70]">
                  AUGEN PRO-X
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CLOSING SIGNATURE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="
            mt-12 flex flex-col justify-between gap-5
            border-t border-[#263f70]/20 pt-6
            sm:flex-row sm:items-center
          "
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#263f70]">
            THE FUTURE, IN YOUR FIELD OF VIEW.
          </span>

          <span className="
            font-sans text-2xl font-bold
            tracking-[0.25em] text-[#263f70]
          ">
            AUGEN.
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default Featured;
