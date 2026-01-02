import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const faqs = [
    {
        id: 1,
        question: 'What is Lideflow?',
        answer: 'Lideflow is a unified payment infrastructure that bridges cross-chain stablecoins with traditional financial systems, enabling fast and global payments for businesses.'
    },
    {
        id: 2,
        question: 'How does stablecoin settlement work?',
        answer: 'We process stablecoin transactions across multiple blockchain networks (Ethereum, Polygon, etc.) and can settle directly to traditional bank accounts through our banking rails integration.'
    },
    {
        id: 3,
        question: 'What blockchains do you support?',
        answer: 'We currently support Ethereum, Polygon, Binance Smart Chain, and Avalanche. We\'re continuously adding support for more networks based on customer demand.'
    },
    {
        id: 4,
        question: 'How much does it cost?',
        answer: 'Pricing is transparent and competitive. Transaction fees start at 0.5% with volume discounts available. Contact our sales team for custom enterprise pricing.'
    },
    {
        id: 5,
        question: 'Is it secure?',
        answer: 'Yes. We use bank-grade security with end-to-end encryption, multi-signature wallets, and comprehensive compliance processes. We handle all regulatory requirements globally.'
    },
    {
        id: 6,
        question: 'Can I test it before going live?',
        answer: 'Absolutely! We provide a full sandbox environment with test tokens so you can integrate and test your implementation before processing real transactions.'
    }
];

const FAQ = () => {
    const [openId, setOpenId] = useState(null);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="faq section">
            <div className="container">
                <motion.div
                    className="faq__header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Questions? Answers.</h2>
                </motion.div>

                <div className="faq__list">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            className="faq-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <button
                                className={`faq-item__question ${openId === faq.id ? 'active' : ''}`}
                                onClick={() => toggleFAQ(faq.id)}
                            >
                                <span>{faq.question}</span>
                                <svg
                                    className="faq-item__icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        className="faq-item__answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
