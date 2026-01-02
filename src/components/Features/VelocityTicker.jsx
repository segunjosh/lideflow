import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { transactionRoutes } from '../../data/transactions';

// Duplicate data for infinite loop
const tickerItems = [...transactionRoutes, ...transactionRoutes, ...transactionRoutes, ...transactionRoutes, ...transactionRoutes];

const VelocityTicker = () => {
    return (
        <div className="relative w-full overflow-hidden bg-black/50 border-y border-white/5 py-6">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <ParallaxText baseVelocity={-2}>
                {tickerItems.map((item, idx) => (
                    <span key={idx} className="inline-flex items-center mx-8 font-mono text-neon-cyan/80 text-lg">
                        <span className="text-white">{item.from}</span>
                        <span className="mx-2 text-gray-500">→</span>
                        <span className="text-electric-gold">{item.to}</span>
                        <span className="ml-3 text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {item.time}
                        </span>
                    </span>
                ))}
            </ParallaxText>
        </div>
    );
};

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useTransform(scrollY, [0, 1000], [0, 5], {
        clamp: false
    });
    const x = useTransform(baseX, (v) => `${v}%`);
    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /* 
          This is what changes the direction of the scroll once we
          switch scrolling directions.
        */
        if (scrollVelocity.get() < 0) {
            directionFactor.current = -1;
        } else if (scrollVelocity.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * scrollVelocity.get();

        baseX.set(baseX.get() + moveBy);

        // Reset range
        // Ideally this should be calculated based on content width, 
        // but for this simple ticker we can use a fixed wrap point.
        // 50% wrap requires duplicating content enough times.
    });

    // Infinite Scroll Logic Wrapper
    return (
        <div className="flex whitespace-nowrap overflow-hidden">
            <motion.div className="flex whitespace-nowrap" style={{ x }}>
                {children}
                {children}
            </motion.div>
        </div>
    );
};
/* 
Note: The ParallaxText implementation above is simplified. 
For a TRUE infinite loop without jumps, we usually just simple standard CSS animation or a more complex motion setup. 
Given stability requirements, I'll switch to a pure CSS animation approach for the ticker text for 100% smoothness, 
wrapped in the component.
*/

const VelocityTickerSimple = () => {
    return (
        <div className="relative w-full overflow-hidden bg-background py-8 border-y border-white/5">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex w-max animate-ticker">
                {tickerItems.map((item, idx) => (
                    <div key={idx} className="flex items-center mx-8 font-mono text-xl whitespace-nowrap">
                        <span className="text-white font-bold">{item.from}</span>
                        <span className="mx-3 text-white/30">→</span>
                        <span className="text-electric-gold font-bold">{item.to}</span>
                        <span className="ml-4 text-sm text-neon-cyan bg-neon-cyan/5 px-2 py-1 rounded border border-neon-cyan/20">
                            {item.time}
                        </span>
                    </div>
                ))}
                {/* Duplicate for seamless loop */}
                {tickerItems.map((item, idx) => (
                    <div key={`dup-${idx}`} className="flex items-center mx-8 font-mono text-xl whitespace-nowrap">
                        <span className="text-white font-bold">{item.from}</span>
                        <span className="mx-3 text-white/30">→</span>
                        <span className="text-electric-gold font-bold">{item.to}</span>
                        <span className="ml-4 text-sm text-neon-cyan bg-neon-cyan/5 px-2 py-1 rounded border border-neon-cyan/20">
                            {item.time}
                        </span>
                    </div>
                ))}
            </div>
            {/* Hover pause */}
            <div className="absolute inset-0 pointer-events-none group-hover:bg-black/0" />
        </div>
    );
}

export default VelocityTickerSimple;
