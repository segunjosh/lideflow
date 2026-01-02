import { motion } from 'framer-motion';
import './Features.css';

const features = [
    {
        id: 1,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        title: 'Accept and Send Stablecoin',
        description: 'We simplify global transactions by enabling businesses to manage cross-border payments quickly and efficiently.',
        link: '#stablecoin'
    },
    {
        id: 2,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        title: 'Unlock Global Remittance',
        description: 'Offer a fast and secure solution for your users to send and receive money globally ensuring confidence in every transaction.',
        link: '#remittance'
    },
    {
        id: 3,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        title: 'Payroll for Your Global Team',
        description: 'Provide solution for businesses to efficiently pay international teams while fostering trust and transparency across borders.',
        link: '#payroll'
    },
    {
        id: 4,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
        title: 'Simplify Compliance Processes',
        description: 'We handle your users compliance globally, enabling you to focus entirely on growing your core business.',
        link: '#compliance'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

const Features = () => {
    return (
        <section className="features section">
            <div className="container">
                <motion.div
                    className="features__header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Solutions</h2>
                    <p className="features__description">
                        Empower your business with our cutting-edge API
                    </p>
                </motion.div>

                <motion.div
                    className="features__grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.id}
                            className="feature-card glass"
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="feature-card__icon">
                                {feature.icon}
                            </div>
                            <div className="feature-card__content">
                                <h3 className="feature-card__title">{feature.title}</h3>
                                <p className="feature-card__description">{feature.description}</p>
                                <a href={feature.link} className="feature-card__link">
                                    Learn more →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
