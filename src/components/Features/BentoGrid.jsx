import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import clsx from 'clsx';
import { ShieldCheck, Zap, Globe } from 'lucide-react';

// --- Components ---

// 1. Volume Counter Component
const VolumeCounter = () => {
    const spring = useSpring(0, { bounce: 0, duration: 2500 });
    const value = useTransform(spring, (current) => {
        return "$" + Math.round(current).toLocaleString();
    });
    const ref = useRef(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) {
            spring.set(5065155);
        }
    }, [isInView, spring]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center h-full p-4 md:p-8 text-center">
            <div className="flex items-center gap-2 mb-4 text-neon-cyan">
                <Zap className="w-6 h-6 animate-pulse" />
                <span className="font-mono text-xs md:text-sm uppercase tracking-wider">Stablecoins Processed</span>
            </div>
            <motion.div className="font-sans font-black text-4xl sm:text-5xl md:text-7xl text-white break-all">
                {value}
            </motion.div>
            <p className="mt-4 text-gray-400 max-w-md text-sm">
                We simplify global transactions by enabling businesses to manage cross-border payments quickly and efficiently.
            </p>
        </div>
    );
};

// 2. 3D Lock Component
const LockModel = () => {
    const group = useRef();
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
            group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={group} scale={1.5}>
            {/* Lock Body */}
            <mesh position={[0, -0.6, 0]}>
                <boxGeometry args={[1.6, 1.4, 0.5]} />
                <meshStandardMaterial
                    color="#FFC107"
                    metalness={0.95}
                    roughness={0.05}
                    emissive="#FFC107"
                    emissiveIntensity={0.3}
                />
            </mesh>
            {/* Shackle */}
            <mesh position={[0, 0.3, 0]}>
                <torusGeometry args={[0.6, 0.2, 16, 32, Math.PI]} />
                <meshStandardMaterial
                    color="#EFEFEF"
                    metalness={0.95}
                    roughness={0.05}
                    emissive="#FFFFFF"
                    emissiveIntensity={0.2}
                />
            </mesh>
            {/* Shackle Legs */}
            <mesh position={[-0.6, 0.3, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.6]} />
                <meshStandardMaterial
                    color="#EFEFEF"
                    metalness={0.95}
                    roughness={0.05}
                    emissive="#FFFFFF"
                    emissiveIntensity={0.2}
                />
            </mesh>
            <mesh position={[0.6, 0.3, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.6]} />
                <meshStandardMaterial
                    color="#EFEFEF"
                    metalness={0.95}
                    roughness={0.05}
                    emissive="#FFFFFF"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </group>
    );
};

const SecurityCard = () => {
    return (
        <div className="relative h-full w-full flex flex-col items-center justify-center bg-[#111]">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-electric-gold">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-mono text-sm uppercase">Compliance</span>
            </div>

            <div className="w-full h-48 md:h-64 cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 0, 4] }}>
                    <ambientLight intensity={2} />
                    <spotLight position={[5, 10, 5]} intensity={4} angle={0.5} penumbra={1} />
                    <pointLight position={[-5, -5, -5]} color="#00f3ff" intensity={3} />
                    <pointLight position={[0, 5, 5]} color="#ffffff" intensity={3} />
                    <pointLight position={[3, 0, 3]} color="#ffffff" intensity={2} />
                    <Center>
                        <LockModel />
                    </Center>
                </Canvas>
            </div>

            <div className="absolute bottom-6 px-6 text-center">
                <p className="text-gray-400 text-sm">
                    We handle your users compliance globally, enabling you to focus entirely on growing your core business.
                </p>
            </div>
        </div>
    );
};

// 3. Network Visualization Card
const GlobalReachCard = () => {
    return (
        <div className="relative h-full flex flex-col p-4 sm:p-6 md:p-8 overflow-visible group">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-gold/5 via-transparent to-neon-cyan/5 opacity-50" />

            {/* Content Grid - Left: Text, Right: Animation */}
            <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8 h-full">
                {/* Left Side - Descriptive Content */}
                <div className="flex-1 space-y-4 md:space-y-6">
                    <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                                Global Remittance
                            </span>
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
                            Enable seamless cross-border payments with instant currency conversion.
                            Watch as local currencies transform into stablecoins and back, powering
                            real-time global transactions.
                        </p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-start gap-2.5 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-neon-cyan" />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5 md:mb-1">Instant Conversion</h4>
                                <p className="text-gray-500 text-[11px] sm:text-xs">Convert between local currencies and stablecoins in real-time</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2.5 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-electric-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-electric-gold" />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5 md:mb-1">Multi-Currency Support</h4>
                                <p className="text-gray-500 text-[11px] sm:text-xs">Support for KES, NGN, GHS, and major stablecoins</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2.5 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5 md:mb-1">Low Fees</h4>
                                <p className="text-gray-500 text-[11px] sm:text-xs">Competitive rates with transparent pricing</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Pac-Man Animation */}
                <div className="self-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-5 md:p-6 w-full md:max-w-[420px] transform transition-transform group-hover:scale-105">
                    <div className="flex items-center gap-2 mb-4 sm:mb-5 md:mb-6">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] sm:text-[11px] md:text-xs font-mono text-gray-300">Transforming Global Remittance</span>
                    </div>

                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        {/* Transaction 1: KES eating USDC */}
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono text-gray-400">KES → USDC</span>
                            </div>
                            <div className="relative h-10 bg-white/5 rounded-lg overflow-hidden">
                                {/* Dots/Pills to be eaten */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-around px-2">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 h-1 rounded-full bg-neon-cyan/40"
                                            animate={{
                                                opacity: [0.4, 0, 0.4],
                                                scale: [1, 0, 1]
                                            }}
                                            transition={{
                                                duration: 7,
                                                repeat: Infinity,
                                                delay: i * 0.3,
                                                times: [0, 0.5, 1]
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Pac-Man KES chasing */}
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 flex items-center"
                                    animate={{
                                        left: ["-15%", "80%"]
                                    }}
                                    transition={{
                                        duration: 7,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    <div className="relative">
                                        {/* Pac-Man mouth animation */}
                                        <motion.div
                                            className="w-6 h-6 bg-neon-cyan rounded-full relative overflow-hidden"
                                            animate={{
                                                clipPath: [
                                                    "polygon(100% 50%, 0% 0%, 0% 100%)",
                                                    "polygon(100% 50%, 0% 40%, 0% 60%)",
                                                    "polygon(100% 50%, 0% 0%, 0% 100%)"
                                                ]
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-[6px] font-bold text-black font-mono">KES</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Target USDC badge */}
                                <div className="absolute top-1/2 -translate-y-1/2 right-2 bg-neon-cyan/20 border border-neon-cyan px-2 py-0.5 rounded text-[8px] font-bold text-neon-cyan font-mono">
                                    USDC
                                </div>
                            </div>
                        </div>

                        {/* Transaction 2: USDT eating GHS */}
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono text-gray-400">USDT → GHS</span>
                            </div>
                            <div className="relative h-10 bg-white/5 rounded-lg overflow-hidden">
                                {/* Dots/Pills to be eaten */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-around px-2">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 h-1 rounded-full bg-electric-gold/40"
                                            animate={{
                                                opacity: [0.4, 0, 0.4],
                                                scale: [1, 0, 1]
                                            }}
                                            transition={{
                                                duration: 7,
                                                repeat: Infinity,
                                                delay: 2 + (4 - i) * 0.3,
                                                times: [0, 0.5, 1]
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Pac-Man USDT chasing (Right to Left) */}
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 flex items-center"
                                    animate={{
                                        left: ["125%", "18%"]
                                    }}
                                    transition={{
                                        duration: 7,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: 2
                                    }}
                                >
                                    <div className="relative">
                                        {/* Pac-Man mouth animation (facing left) */}
                                        <motion.div
                                            className="w-6 h-6 bg-electric-gold rounded-full relative overflow-hidden"
                                            style={{ transform: "scaleX(-1)" }}
                                            animate={{
                                                clipPath: [
                                                    "polygon(100% 50%, 0% 0%, 0% 100%)",
                                                    "polygon(100% 50%, 0% 40%, 0% 60%)",
                                                    "polygon(100% 50%, 0% 0%, 0% 100%)"
                                                ]
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "scaleX(-1)" }}>
                                                <span className="text-[6px] font-bold text-black font-mono">USDT</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Target GHS badge */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-2 bg-electric-gold/20 border border-electric-gold px-2 py-0.5 rounded text-[8px] font-bold text-electric-gold font-mono">
                                    GHS
                                </div>
                            </div>
                        </div>

                        {/* Transaction 3: NGN eating USDT */}
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono text-gray-400">NGN → USDT</span>
                            </div>
                            <div className="relative h-10 bg-white/5 rounded-lg overflow-hidden">
                                {/* Dots/Pills to be eaten */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-around px-2">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 h-1 rounded-full bg-green-400/40"
                                            animate={{
                                                opacity: [0.4, 0, 0.4],
                                                scale: [1, 0, 1]
                                            }}
                                            transition={{
                                                duration: 7,
                                                repeat: Infinity,
                                                delay: 4 + i * 0.3,
                                                times: [0, 0.5, 1]
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Pac-Man NGN chasing */}
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 flex items-center"
                                    animate={{
                                        left: ["-15%", "82%"]
                                    }}
                                    transition={{
                                        duration: 7,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: 4
                                    }}
                                >
                                    <div className="relative">
                                        {/* Pac-Man mouth animation */}
                                        <motion.div
                                            className="w-6 h-6 bg-green-400 rounded-full relative overflow-hidden"
                                            animate={{
                                                clipPath: [
                                                    "polygon(100% 50%, 0% 0%, 0% 100%)",
                                                    "polygon(100% 50%, 0% 40%, 0% 60%)",
                                                    "polygon(100% 50%, 0% 0%, 0% 100%)"
                                                ]
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-[6px] font-bold text-black font-mono">NGN</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Target USDT badge */}
                                <div className="absolute top-1/2 -translate-y-1/2 right-2 bg-green-400/20 border border-green-400 px-2 py-0.5 rounded text-[8px] font-bold text-green-400 font-mono">
                                    USDT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Footer */}
                {/* <div className="flex items-center justify-between text-[10px] pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></div>
                            <span className="text-gray-400">5 Active Nodes</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-electric-gold"></div>
                            <span className="text-gray-400">3 Transfers/sec</span>
                        </div>
                    </div> */}
            </div>
        </div>
    );
};

// --- Main Layout ---

const CardWrapper = ({ children, className }) => {
    return (
        <motion.div
            className={clsx(
                "relative overflow-visible md:overflow-hidden rounded-3xl bg-surface-glass border border-white/5 backdrop-blur-md group",
                "hover:border-white/20 transition-colors duration-500",
                className
            )}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-electric-gold/5 blur-xl" />
            </div>
            {children}
        </motion.div>
    );
};

const BentoGrid = () => {
    return (
        <section className="py-24 px-4 bg-background relative z-10">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                    Powering the <span className="text-electric-gold">New Economy</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {/* Card 1: Speed (Span 2 cols on desktop if we want, but prompt implies simple 3 cards. Let's make Speed Wide) */}
                    <CardWrapper className="md:col-span-2">
                        <VolumeCounter />
                    </CardWrapper>

                    {/* Card 2: Security */}
                    <CardWrapper className="md:col-span-1">
                        <SecurityCard />
                    </CardWrapper>

                    {/* Card 3: Global Reach (Full width or span) - Let's do 2-1 layout, or just 3 cols */}
                    {/* Actually, let's mix it up. 3 Equal cols? Or Bento style. */}
                    {/* Let's make Global Reach standard */}
                    <CardWrapper className="md:col-span-3 min-h-[600px] md:min-h-[500px]">
                        <GlobalReachCard />
                    </CardWrapper>
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
