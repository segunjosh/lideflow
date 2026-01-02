import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Terminal, Code2, Box } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import clsx from 'clsx';

const languages = [
    { id: 'bash', label: 'cURL', icon: Terminal },
    { id: 'javascript', label: 'Node.js', icon: Code2 },
    { id: 'python', label: 'Python', icon: Box },
];

const codeSnippets = {
    bash: `curl -X POST https://api.lideflow.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "currency": "usdc",
    "recipient": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "description": "Invoice #892"
  }'`,
    javascript: `import { Lideflow } from '@lideflow/sdk';

const client = new Lideflow('sk_live_...');

const payment = await client.payments.create({
  amount: 1000,
  currency: 'usdc',
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  description: 'Invoice #892'
});

console.log(payment.id);`,
    python: `import lideflow

client = lideflow.Client('sk_live_...')

payment = client.payments.create(
    amount=1000,
    currency='usdc',
    recipient='0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    description='Invoice #892'
)

print(payment.id)`
};

const Integration = () => {
    const [activeLang, setActiveLang] = useState('javascript');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippets[activeLang]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-electric-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Content */}
                    <div className="order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Make Money Move in a <span className="text-neon-cyan">few lines of code</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
                                Easily integrate stablecoins into your workflow. Our developer-first API is designed for speed, security, and scalability.
                                Whether you are paying out creators, accepting B2B payments, or managing treasury, Lideflow handles the complexity.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {['Instant API Keys', 'Webhooks for events', 'Sandbox Environment', '99.99% Uptime SLA'].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <div className="w-6 h-6 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3 border border-neon-cyan/20">
                                            <Check className="w-3 h-3 text-neon-cyan" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <a href="#" className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-colors">
                                View Documentation
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Code Editor */}
                    <div className="order-1 lg:order-2">
                        <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />

                            {/* Editor Header / Tab Bar */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex gap-1 bg-black/50 rounded-lg p-1">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.id}
                                            onClick={() => setActiveLang(lang.id)}
                                            className={clsx(
                                                "px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2",
                                                activeLang === lang.id
                                                    ? "bg-white/10 text-white shadow-sm"
                                                    : "text-gray-500 hover:text-gray-300"
                                            )}
                                        >
                                            <lang.icon className="w-3 h-3" />
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Code Area */}
                            <div className="relative group/code">
                                <motion.div
                                    key={activeLang}
                                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.4 }}
                                    className="p-4 overflow-x-auto text-sm"
                                >
                                    {/* Using a custom minimal style if dependency issues, but syntax highlighter is cleaner */}
                                    <SyntaxHighlighter
                                        language={activeLang}
                                        style={vscDarkPlus}
                                        customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}
                                        wrapLongLines={true}
                                    >
                                        {codeSnippets[activeLang]}
                                    </SyntaxHighlighter>
                                </motion.div>

                                {/* Copy Button */}
                                <button
                                    onClick={handleCopy}
                                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors opacity-0 group-hover/code:opacity-100"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Integration;
