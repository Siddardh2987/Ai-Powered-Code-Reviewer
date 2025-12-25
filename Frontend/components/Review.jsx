import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { review, code, language, tokensUsed } = location.state || {};
    
    const [showCode, setShowCode] = useState(false);

    if (!review) {
        return (
            <div style={styles.errorContainer}>
                <h2>⚠️ No Review Available</h2>
                <p>Please submit code for review first.</p>
                <button onClick={() => navigate('/')} style={styles.backBtn}>
                    ← Back to Home
                </button>
            </div>
        );
    }

    const handleCopyReview = () => {
        navigator.clipboard.writeText(review);
        alert('✅ Review copied to clipboard!');
    };

    const handleNewReview = () => {
        navigate('/');
    };

    return (
        <div style={styles.fullPage}>
            {/* Header */}
            <nav style={styles.nav}>
                <h1 style={styles.logo}>🔍 Code Review Results</h1>
                <div style={styles.navButtons}>
                    <button onClick={handleNewReview} style={styles.newReviewBtn}>
                        ➕ New Review
                    </button>
                    <button onClick={handleCopyReview} style={styles.copyBtn}>
                        📋 Copy Review
                    </button>
                </div>
            </nav>

            <div style={styles.container}>
                {/* Review Stats */}
                <div style={styles.statsBar}>
                    <div style={styles.stat}>
                        <span style={styles.statLabel}>Language:</span>
                        <span style={styles.statValue}>{language}</span>
                    </div>
                    <div style={styles.stat}>
                        <span style={styles.statLabel}>Code Length:</span>
                        <span style={styles.statValue}>{code?.length || 0} chars</span>
                    </div>
                    <div style={styles.stat}>
                        <span style={styles.statLabel}>Tokens Used:</span>
                        <span style={styles.statValue}>{tokensUsed || 'N/A'}</span>
                    </div>
                </div>

                {/* Toggle Original Code */}
                <div style={styles.toggleSection}>
                    <button 
                        onClick={() => setShowCode(!showCode)}
                        style={styles.toggleBtn}
                    >
                        {showCode ? '👁️ Hide Original Code' : '👁️ Show Original Code'}
                    </button>
                </div>

                {/* Original Code (Collapsible) */}
                {showCode && (
                    <div style={styles.codeSection}>
                        <h3 style={styles.sectionTitle}>📄 Original Code</h3>
                        <pre style={styles.codeBlock}>
                            <code>{code}</code>
                        </pre>
                    </div>
                )}

                {/* AI Review */}
                <div style={styles.reviewSection}>
                    <h3 style={styles.sectionTitle}>🤖 AI Review</h3>
                    <div style={styles.reviewContent}>
                        <pre style={styles.reviewText}>{review}</pre>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={styles.actionButtons}>
                    <button onClick={handleNewReview} style={styles.primaryBtn}>
                        🔄 Review Another Code
                    </button>
                    <button onClick={() => navigate('/')} style={styles.secondaryBtn}>
                        ← Back to Editor
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    fullPage: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    errorContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    nav: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: '#667eea',
        margin: 0,
    },
    navButtons: {
        display: 'flex',
        gap: '1rem',
    },
    newReviewBtn: {
        padding: '0.75rem 1.5rem',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    copyBtn: {
        padding: '0.75rem 1.5rem',
        background: '#f3f4f6',
        border: '2px solid #e5e7eb',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
    },
    statsBar: {
        display: 'flex',
        gap: '1.5rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1.25rem 1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    stat: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    statLabel: {
        fontSize: '0.875rem',
        color: '#6b7280',
        fontWeight: '500',
    },
    statValue: {
        fontSize: '1rem',
        color: '#374151',
        fontWeight: '600',
        background: '#f3f4f6',
        padding: '0.25rem 0.75rem',
        borderRadius: '6px',
    },
    toggleSection: {
        marginBottom: '1.5rem',
    },
    toggleBtn: {
        padding: '0.75rem 1.5rem',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '2px solid #e5e7eb',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    codeSection: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '1rem',
        marginTop: 0,
    },
    codeBlock: {
        background: '#1f2937',
        color: '#f3f4f6',
        padding: '1.5rem',
        borderRadius: '8px',
        fontSize: '0.875rem',
        fontFamily: 'monospace',
        overflow: 'auto',
        maxHeight: '400px',
        margin: 0,
    },
    reviewSection: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    reviewContent: {
        background: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
    },
    reviewText: {
        margin: 0,
        fontSize: '0.95rem',
        lineHeight: '1.7',
        color: '#374151',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    actionButtons: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginTop: '2rem',
    },
    primaryBtn: {
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1.125rem',
        fontWeight: '600',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    secondaryBtn: {
        padding: '1rem 2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '2px solid #e5e7eb',
        borderRadius: '10px',
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#374151',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    backBtn: {
        marginTop: '1.5rem',
        padding: '1rem 2rem',
        background: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#667eea',
        cursor: 'pointer',
    },
};

export default Review;