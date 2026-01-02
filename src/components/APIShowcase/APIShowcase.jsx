import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../UI/CodeBlock';
import './APIShowcase.css';

const codeExamples = {
    curl: `curl https://api.lideflow.com/v1/stablecoin/transfer \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": "1000.00",
    "stablecoin": "USDC",
    "chain": "ethereum",
    "recipient": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "description": "Cross-border payment"
  }'`,

    javascript: `import { Lideflow } from '@lideflow/sdk';

const lideflow = new Lideflow('YOUR_API_KEY');

const transfer = await lideflow.stablecoin.transfer({
  amount: '1000.00',
  stablecoin: 'USDC',
  chain: 'ethereum',
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  description: 'Cross-border payment'
});

console.log(transfer.status); // 'completed'`,

    python: `from lideflow import Lideflow

lideflow = Lideflow('YOUR_API_KEY')

transfer = lideflow.stablecoin.transfer(
    amount='1000.00',
    stablecoin='USDC',
    chain='ethereum',
    recipient='0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    description='Cross-border payment'
)

print(transfer.status)  # 'completed'`,

    ruby: `require 'lideflow'

lideflow = Lideflow::Client.new('YOUR_API_KEY')

transfer = lideflow.stablecoin.transfer(
  amount: '1000.00',
  stablecoin: 'USDC',
  chain: 'ethereum',
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  description: 'Cross-border payment'
)

puts transfer.status  # 'completed'`
};

const responseExample = `{
  "id": "txn_stbl_1234567890abcdef",
  "status": "completed",
  "amount": "1000.00",
  "stablecoin": "USDC",
  "chain": "ethereum",
  "recipient": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "tx_hash": "0x8f3d...",
  "created_at": "2024-12-24T00:00:00Z",
  "settled_at": "2024-12-24T00:00:03Z",
  "network_fee": {
    "amount": "0.50",
    "currency": "USDC"
  }
}`;

const APIShowcase = () => {
    const [activeTab, setActiveTab] = useState('javascript');

    return (
        <section className="api-showcase section">
            <div className="container">
                <motion.div
                    className="api-showcase__header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Make Money Move in a Few Lines of Code</h2>
                    <p className="api-showcase__description">
                        Easily integrate stablecoins into your workflow with our simple, powerful APIs.
                    </p>
                </motion.div>

                <motion.div
                    className="api-showcase__content"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="api-showcase__demo glass">
                        <div className="api-showcase__tabs">
                            {Object.keys(codeExamples).map((lang) => (
                                <button
                                    key={lang}
                                    className={`api-showcase__tab ${activeTab === lang ? 'active' : ''}`}
                                    onClick={() => setActiveTab(lang)}
                                >
                                    {lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="api-showcase__code">
                            <CodeBlock
                                code={codeExamples[activeTab]}
                                language={activeTab === 'curl' ? 'bash' : activeTab}
                            />
                        </div>
                    </div>

                    <div className="api-showcase__response glass">
                        <div className="api-showcase__response-header">
                            <span className="api-showcase__response-label">Response</span>
                            <span className="api-showcase__response-status">
                                <span className="status-indicator status-indicator--success" />
                                200 OK
                            </span>
                        </div>
                        <CodeBlock code={responseExample} language="javascript" />
                    </div>
                </motion.div>

                <motion.div
                    className="api-showcase__stats"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="stat-card glass">
                        <div className="stat-card__value">99.99%</div>
                        <div className="stat-card__label">Uptime SLA</div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-card__value">&lt;200ms</div>
                        <div className="stat-card__label">Avg Response Time</div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-card__value">180+</div>
                        <div className="stat-card__label">Countries Supported</div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-card__value">24/7</div>
                        <div className="stat-card__label">Developer Support</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default APIShowcase;
