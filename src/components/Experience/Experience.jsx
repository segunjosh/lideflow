import { motion } from 'framer-motion';

import etisalat from '../../assets/logos/etisalat.png';
import sanofi from '../../assets/logos/sanofi.png';
import onafriq from '../../assets/logos/onafriq.png';
import societeGenerale from '../../assets/logos/societe-generale.png';
import aave from '../../assets/logos/aave.png';

const logos = [
    { name: 'Etisalat', src: etisalat },
    { name: 'Sanofi', src: sanofi },
    { name: 'Onafriq', src: onafriq },
    { name: 'Societe Generale', src: societeGenerale },
    { name: 'Aave', src: aave },
    { name: 'Techstars', src: '/techstars_logo.png' },
    { name: 'AWS', src: '/aws_logo.png' }
];

const Experience = () => {
    const row1 = logos.slice(0, 5);
    const row2 = logos.slice(5);

    const LogoRow = ({ items }) => (
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 w-full">
            {items.map((logo, index) => (
                <div key={index} className="relative h-16 w-auto flex items-center justify-center min-w-[120px]">
                    <img
                        src={logo.src}
                        alt={logo.name}
                        className="h-full w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
            ))}
        </div>
    );

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none opacity-20" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white leading-tight mb-16 max-w-4xl mx-auto">
                            “With a shared passion for revolutionizing global payments, our team brings a <span className="text-electric-gold">wealth of experience</span> from renowned companies in banking, payment and cryptocurrency.”
                        </h2>
                    </motion.div>

                    <motion.div
                        className="flex flex-col items-center gap-8 md:gap-12 w-full opacity-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {/* Row 1 (5 logos) */}
                        <LogoRow items={row1} />

                        {/* Row 2 (3 logos) */}
                        <LogoRow items={row2} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
