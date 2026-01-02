import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Globe from '../Globe/Globe';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[250vh] w-full bg-background">
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
                {/* Globe Background - Full Screen */}
                <div className="absolute inset-0 z-0">
                    <Globe scrollYProgress={scrollYProgress} />
                </div>

                {/* Overlay Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90 z-10 pointer-events-none" />

                {/* Centered Text Overlay */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none"
                >
                    {/* Brand Logo - Centered & Scrolls with page */}
                    <motion.div
                        className="mb-6 md:mb-8 w-20 md:w-32 lg:w-40"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                    >
                        <img
                            src="/logo.png"
                            alt="Lideflow"
                            className="w-full h-auto brightness-200 drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                        />
                    </motion.div>

                    <motion.h1
                        className="font-sans font-extrabold text-5xl md:text-7xl lg:text-9xl tracking-tighter text-white mb-4 md:mb-6 drop-shadow-2xl"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Move Money <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-gold animate-pulse-slow">
                            Simply
                        </span>
                    </motion.h1>

                    <motion.p
                        className="font-mono text-lg md:text-xl text-gray-300 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    >
                        A Unified Payment Infrastructure bridging cross-chain stablecoins with traditional financial systems for fast and global payments.
                    </motion.p>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        <div className="w-[1px] h-24 bg-gradient-to-b from-neon-cyan to-transparent animate-pulse" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
