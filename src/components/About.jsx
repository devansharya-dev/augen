
import React from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Shriyukt Gupta",
    role: "Lead Architect & AI/ML Specialist",
    email: "shriyuktgupta@gmail.com",
    linkedin: "https://www.linkedin.com/in/shriyukt-gupta-12b665277",
    
    specialty: "Architecture / Intelligence",
  },
  {
    name: "Devansh Arya",
    role: "AI/ML Specialist & Full-stack Developer",
    email: "devansharya12345@gmail.com",
    linkedin: "https://www.linkedin.com/in/devansh-arya-415378305/",
    
    specialty: "AI / Development",
  },
  {
    name: "Amisha Panwar",
    role: "Embedded Systems Specialist & Full-stack Engineer",
    email: "Amisha_Panwar@gmail.com",
    linkedin: "https://www.linkedin.com/in/divya-adhikari-213269325",
    
    specialty: "Embedded / Engineering",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <section
      id="about"
      data-scroll-section
      className="relative isolate w-full overflow-hidden px-6 py-24 text-[#10192E] md:px-14 md:py-32"
    >
      {/* BACKGROUND — MATCHING HERO GRADIENT */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#080d19] via-[#263f70] via-[42%] to-[#e2edff]" />

      {/* SOFT LIGHT GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_48%_65%,rgba(255,255,255,0.35),transparent_55%)]" />

      {/* ATMOSPHERIC DETAILS */}
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-[450px] w-[450px] rounded-full border border-white/20 md:h-[600px] md:w-[600px]" />

      <div className="pointer-events-none absolute -right-20 top-24 -z-10 h-[300px] w-[300px] rounded-full border border-white/15 md:h-[420px] md:w-[420px]" />

      <div className="pointer-events-none absolute -left-40 top-[42%] -z-10 h-[400px] w-[400px] rounded-full bg-white/20 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-[1450px]">

        {/* INTRODUCTION */}
        <div className="grid grid-cols-1 items-end gap-14 pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24 lg:pb-40">

          {/* LEFT HEADING */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-9 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#A9C8F5]" />

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4E3FF] md:text-xs">
                The minds behind Augen / 001
              </p>
            </div>

            <h2 className="text-[clamp(4rem,9vw,9rem)] font-medium uppercase leading-[0.78] tracking-[-0.085em] text-white">
              Built by
              <br />
              thinkers.
              <br />

              <span className="font-serif font-normal normal-case tracking-[-0.07em] text-[#C5D9FA]">
                Made for
                <br />
                living.
              </span>
            </h2>

            <div className="mt-12 flex items-center gap-4">
              <span className="h-px w-12 bg-[#B5D0F8]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4E3FF]">
                Independent minds. Shared vision.
              </span>
            </div>
          </motion.div>

          {/* RIGHT DESCRIPTION */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-end lg:pb-4 lg:pl-10"
          >
            <p className="max-w-xl text-2xl font-medium leading-[1.3] tracking-[-0.045em] text-white md:text-3xl">
              Technology should not ask for your attention.
              <span className="font-serif font-normal text-[#C5D9FA]">
                {" "}It should give it back.
              </span>
            </p>

            <p className="mt-8 max-w-md text-sm leading-8 text-white/75 md:text-base">
              We bring together artificial intelligence, embedded systems,
              software engineering and thoughtful design to rethink how people
              interact with the world around them.
            </p>

            <div className="mt-12 grid grid-cols-2 border-t border-white/25 pt-5">
              <div>
                <p className="font-serif text-5xl text-white">03</p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">
                  Minds at work
                </p>
              </div>

              <div>
                <p className="font-serif text-5xl text-white">01</p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">
                  Shared direction
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TEAM SECTION */}
        <div className="border-t border-[#26395F]/25 pt-12 md:pt-16">

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end"
          >
            <div>
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#26395F]">
                02 / The collective
              </p>

              <h2 className="text-6xl font-medium uppercase leading-[0.85] tracking-[-0.08em] text-[#10192E] md:text-8xl lg:text-[7.5rem]">
                The people
                <br />

                <span className="font-serif font-normal normal-case tracking-[-0.06em] text-white">
                  behind it.
                </span>
              </h2>
            </div>

            <p className="max-w-[250px] text-sm leading-7 text-[#26395F]/85">
              Different disciplines. Different perspectives. One intention:
              making technology feel more human.
            </p>
          </motion.div>

          {/* TEAM CARDS */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {team.map((member, index) => (
              <motion.article
                key={member.name}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                }}
                className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-white/55 bg-white/25 p-7 shadow-[0_15px_45px_rgba(16,25,46,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/90 hover:bg-white/45 hover:shadow-[0_25px_65px_rgba(16,25,46,0.14)] md:p-10"
              >
                <div className="absolute right-0 top-0 h-0 w-[3px] bg-[#263F70] transition-all duration-500 group-hover:h-full" />

                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs tracking-widest text-[#263F70]">
                   {member.number}
                  </span>

                  <span className="text-right font-mono text-[9px] uppercase tracking-[0.16em] text-[#536783]">
                    {member.specialty}
                  </span>
                </div>

                <div className="mt-12">
                  <h3 className="text-3xl font-medium tracking-[-0.06em] text-[#10192E] transition-colors duration-300 group-hover:text-[#435B82] md:text-4xl">
                    {member.name}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#26395F]/75">
                    {member.role}
                  </p>
                </div>

                <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#26395F]/15 pt-5 sm:flex-row sm:items-center">
                  <a
                    href={`mailto:${member.email}`}
                    className="break-all text-xs text-[#26395F]/75 transition-colors hover:text-[#10192E]"
                  >
                    {member.email}
                  </a>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="inline-flex w-fit items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#10192E] transition-colors hover:text-[#64799F]"
                  >
                    LinkedIn

                    <span className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>
                </div>
              </motion.article>
            ))}

            {/* PHILOSOPHY CARD */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/50 via-white/30 to-[#D9E4F5]/60 p-7 text-[#10192E] shadow-[0_15px_45px_rgba(16,25,46,0.07)] backdrop-blur-xl md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#26395F]">
                  
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#536783]">
                  The philosophy
                </span>
              </div>

              <div className="relative z-10">
                <p className="font-serif text-4xl leading-tight md:text-5xl">
                  Better vision.
                  <br />
                  <span className="text-[#435B82]">
                    Fewer distractions.
                  </span>
                </p>

                <p className="mt-5 max-w-xs text-xs leading-6 text-[#26395F]/75">
                  We are building technology that belongs in your life,
                  not technology that takes you away from it.
                </p>
              </div>

              <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full border border-white/60" />
              <div className="absolute -bottom-10 -right-2 h-44 w-44 rounded-full border border-[#64799F]/25" />
              <div className="absolute right-12 top-12 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
            </motion.div>

          </div>
        </div>

        {/* CLOSING STATEMENT */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28 border-t border-[#26395F]/25 pt-10 md:mt-40 md:pt-14"
        >
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <div>
              <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.25em] text-[#26395F]">
                03 / Looking forward
              </p>

              <h2 className="text-5xl font-medium leading-[0.9] tracking-[-0.075em] text-[#10192E] md:text-7xl lg:text-[6.5rem]">
                The future is
                <br />
                a little closer
                <br />

                <span className="font-serif font-normal text-[#435B82]">
                  than you think.
                </span>
              </h2>
            </div>

            <p className="max-w-[220px] pb-2 font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-[#26395F]">
              AUGEN / SEE MORE.
              <br />
              EXPERIENCE MORE.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
