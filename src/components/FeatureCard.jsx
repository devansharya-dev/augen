
import { useRef } from "react";
import { motion } from "framer-motion";

const FeatureCard = ({
  title,
  desc,
  videoSrc,
  imageSrc,
  onTry,
  showButton = true,
  className = "",
}) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const hasVideo = Boolean(videoSrc);
  const hasImage = !hasVideo && Boolean(imageSrc);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`
        group relative flex h-full flex-col overflow-hidden
        rounded-[24px]
        border border-white/60
        bg-white/35
        p-3
        shadow-[0_15px_45px_rgba(16,25,46,0.07)]
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-2
        hover:border-white/90
        hover:bg-white/55
        hover:shadow-[0_25px_65px_rgba(16,25,46,0.14)]
        ${className}
      `}
    >
      {/* CARD BACKGROUND DETAILS */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* MEDIA */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[17px] border border-white/50 bg-gradient-to-b from-[#263f70] via-[#7892b9] to-[#dce8fa]">

        {hasVideo && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            preload="metadata"
            playsInline
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
          />
        )}

        {hasImage && (
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
          />
        )}

        {!hasVideo && !hasImage && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-sans text-7xl font-bold tracking-tighter text-white/90">
              A<span className="text-[#10192E]">.</span>
            </span>
          </div>
        )}

        {/* MEDIA OVERLAY */}
        <div className="
          pointer-events-none absolute inset-0
          bg-gradient-to-t from-[#10192E]/30 via-transparent to-white/10
          opacity-50 transition-opacity duration-500
          group-hover:opacity-100
        " />

        {/* CORNER ARROW */}
        <div className="
          absolute bottom-4 right-4
          flex h-10 w-10 translate-y-2
          items-center justify-center rounded-full
          border border-white/50
          bg-white/85 text-[#10192E]
          opacity-0 shadow-lg backdrop-blur-md
          transition-all duration-300
          group-hover:translate-y-0 group-hover:opacity-100
        ">
          ↗
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col px-4 pb-4 pt-5 md:px-5 md:pb-5">

        <h3 className="
          text-2xl font-bold tracking-[-0.055em]
          text-[#10192E]
          transition-colors duration-300
          group-hover:text-[#435B82]
          md:text-3xl
        ">
          {title}
        </h3>

        <p className="
          mt-3 flex-1 text-sm leading-7
          text-[#26395F]/75
          md:text-base
        ">
          {desc}
        </p>

        {/* CTA */}
        {showButton && (
          <button
            type="button"
            onClick={onTry}
            className="
              mt-7 flex w-full items-center
              justify-between rounded-full
              border border-[#10192E]
              bg-[#10192E]
              px-6 py-4
              text-xs font-semibold tracking-wide
              text-white
              transition-all duration-300
              hover:border-[#263f70]
              hover:bg-[#263f70]
              hover:shadow-[0_8px_25px_rgba(38,63,112,0.2)]
              active:scale-[0.98]
            "
          >
            Explore feature

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FeatureCard;
