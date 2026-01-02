import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="relative w-full py-40 bg-background overflow-hidden flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 text-center z-10">
                <a href="https://calendly.com/lideflow/30min" target="_blank" rel="noopener noreferrer" className="group block relative cursor-pointer">
                    <h1 className="font-sans font-black text-[12vw] leading-none tracking-tighter transition-all duration-700 select-none">
                        {/* Outline Version (Default) */}
                        <span className="absolute inset-0 text-transparent opacity-30 group-hover:opacity-0 transition-opacity duration-300"
                            style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)' }}>
                            START THE FLOW
                        </span>

                        {/* Filled Version (Hover) */}
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-gold bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            START THE FLOW
                        </span>
                    </h1>
                </a>

                <div className="mt-12 flex items-center justify-between w-full max-w-4xl mx-auto border-t border-white/10 pt-8 text-gray-500 font-mono text-sm">
                    <span>© 2026 Lideflow Inc.</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-neon-cyan transition-colors">Privacy</a>
                        <a href="#" className="hover:text-neon-cyan transition-colors">Terms</a>
                        <a href="#" className="hover:text-neon-cyan transition-colors">Twitter</a>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-t from-neon-cyan/5 to-transparent pointer-events-none" />
        </footer>
    );
};

export default Footer;
