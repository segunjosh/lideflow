import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Globe, TrendingUp, Mail } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { id: 'home', label: 'Home', icon: Home, link: '#' },
    { id: 'network', label: 'Network', icon: Globe, link: '#network' },
    { id: 'velocity', label: 'Velocity', icon: TrendingUp, link: '#velocity' },
    { id: 'contact', label: 'Contact', icon: Mail, link: '#contact' },
];

const Navbar = () => {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.nav
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-surface-glass backdrop-blur-lg border border-white/10 shadow-2xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {navItems.map((item) => {
                    const isHovered = hovered === item.id;

                    return (
                        <motion.a
                            key={item.id}
                            href={item.link}
                            className={clsx(
                                "relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors",
                                "hover:bg-white/10"
                            )}
                            onHoverStart={() => setHovered(item.id)}
                            onHoverEnd={() => setHovered(null)}
                            whileHover={{ scale: 1.2, margin: "0 8px" }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <item.icon
                                className={clsx(
                                    "w-5 h-5 transition-colors duration-200",
                                    isHovered ? "text-neon-cyan" : "text-gray-400"
                                )}
                            />

                            {/* Tooltip */}
                            {isHovered && (
                                <motion.span
                                    className="absolute -top-10 px-2 py-1 text-xs font-medium text-white bg-black/80 rounded backdrop-blur-sm border border-white/10 whitespace-nowrap"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    {item.label}
                                </motion.span>
                            )}

                            {/* Active Indicator (Mock) */}
                            {item.id === 'home' && (
                                <span className="absolute -bottom-1 w-1 h-1 bg-neon-cyan rounded-full" />
                            )}
                        </motion.a>
                    );
                })}
            </motion.nav>
        </div>
    );
};

export default Navbar;

