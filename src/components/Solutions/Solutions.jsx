import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRightLeft, Globe, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';

const solutions = [
    {
        id: 'stablecoin',
        title: 'Accept and Send Stablecoin',
        description: 'We simplify global transactions by enabling businesses to manage cross-border payments quickly and efficiently.',
        icon: ArrowRightLeft,
        gradient: 'from-[#00f3ff] to-[#00f3ff]/20'
    },
    {
        id: 'remittance',
        title: 'Unlock Global Remittance',
        description: 'Offer a fast and secure solution for your users to send and receive money globally ensuring confidence in every transaction.',
        icon: Globe,
        gradient: 'from-[#ffd700] to-[#ffd700]/20'
    },
    {
        id: 'payroll',
        title: 'Payroll for Your Global team',
        description: 'Provide solution for businesses to efficiently pay international teams while fostering trust and transparency across borders.',
        icon: Users,
        gradient: 'from-[#ff00ff] to-[#ff00ff]/20'
    },
    {
        id: 'compliance',
        title: 'Simplify Compliance Processes',
        description: 'We handle your users compliance globally, enabling you to focus entirely on growing your core business.',
        icon: ShieldCheck,
        gradient: 'from-[#00ff9d] to-[#00ff9d]/20'
    }
];

const SolutionCard = ({ solution, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-3xl bg-surface-glass border border-white/5 backdrop-blur-md overflow-hidden hover:border-white/10 transition-colors"
        >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    <solution.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {solution.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                    {solution.description}
                </p>

                <div className="flex items-center text-sm font-mono text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                    <span>Learn more</span>
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                </div>
            </div>
        </motion.div>
    );
};

const Solutions = () => {
    return (
        <section className="py-32 px-4 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-1/3 h-1/3 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-electric-gold"
                    >
                        Our Solutions
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight"
                    >
                        Empower your business with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-gold">cutting-edge API</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {solutions.map((solution, index) => (
                        <SolutionCard key={solution.id} solution={solution} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
