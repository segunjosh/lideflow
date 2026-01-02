import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: [0.8, 1.1, 1],
                    opacity: 1,
                }}
                transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    times: [0, 0.6, 1]
                }}
                className="relative w-32 md:w-48"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-neon-cyan/20 blur-3xl rounded-full animate-pulse" />

                <img
                    src="/logo.png"
                    alt="Lideflow"
                    className="relative w-full h-auto brightness-200 drop-shadow-[0_0_30px_rgba(0,243,255,0.4)]"
                />
            </motion.div>
        </motion.div>
    );
};

export default Loader;
