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
        <div ref={ref} className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="flex items-center gap-2 mb-4 text-neon-cyan">
                <Zap className="w-6 h-6 animate-pulse" />
                <span className="font-mono text-sm uppercase tracking-wider">Stablecoins Processed</span>
            </div>
            <motion.div className="font-sans font-black text-6xl md:text-7xl text-white">
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
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Shackle */}
            <mesh position={[0, 0.3, 0]}>
                <torusGeometry args={[0.6, 0.2, 16, 32, Math.PI]} />
                <meshStandardMaterial color="#b4b4b4" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Shackle Legs */}
            <mesh position={[-0.6, 0.3, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.6]} />
                <meshStandardMaterial color="#b4b4b4" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.6, 0.3, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.6]} />
                <meshStandardMaterial color="#b4b4b4" metalness={0.9} roughness={0.1} />
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
                    <ambientLight intensity={0.5} />
                    <spotLight position={[5, 10, 5]} intensity={1.5} angle={0.5} penumbra={1} />
                    <pointLight position={[-5, -5, -5]} color="#00f3ff" intensity={1} />
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

// 3. Abstract Map Card
const GlobalReachCard = () => {
    return (
        <div className="relative h-full flex flex-col p-8 overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-neon-cyan">
                    <Globe className="w-5 h-5" />
                    <span className="font-mono text-sm uppercase">Global Remittance</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Confidence In Every Transaction</h3>
                <p className="text-gray-400 text-sm max-w-sm">
                    Offer a fast and secure solution for your users to send and receive money globally.
                </p>
            </div>

            {/* Abstract Map Graphic */}
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                {/* Simulated Dot Map pattern using CSS radial gradients or SVGs */}
                <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="grid-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" className="text-gray-600" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
                {/* Glowing hotspots */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-cyan/30 rounded-full blur-[40px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-electric-gold/20 rounded-full blur-[30px] animate-pulse delay-700" />
            </div>
        </div>
    );
};

// --- Main Layout ---

const CardWrapper = ({ children, className }) => {
    return (
        <motion.div
            className={clsx(
                "relative overflow-hidden rounded-3xl bg-surface-glass border border-white/5 backdrop-blur-md group",
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
                    <CardWrapper className="md:col-span-3">
                        <GlobalReachCard />
                    </CardWrapper>
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
