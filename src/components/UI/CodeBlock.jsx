import { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-bash';
import './CodeBlock.css';

const CodeBlock = ({ code, language = 'javascript', showLineNumbers = false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const highlightedCode = Prism.highlight(
        code,
        Prism.languages[language] || Prism.languages.javascript,
        language
    );

    return (
        <div className="code-block">
            <div className="code-block__header">
                <span className="code-block__language">{language}</span>
                <button
                    className="code-block__copy-btn"
                    onClick={handleCopy}
                    aria-label="Copy code"
                >
                    {copied ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M3 11V3C3 2.44772 3.44772 2 4 2H10" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    )}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
            </div>
            <pre className={showLineNumbers ? 'line-numbers' : ''}>
                <code
                    className={`language-${language}`}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
            </pre>
        </div>
    );
};

export default CodeBlock;
