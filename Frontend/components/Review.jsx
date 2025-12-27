import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { review, code, language, tokensUsed } = location.state || {};
    const [showCode, setShowCode] = useState(false);
    const [darkTheme,setDarkTheme]=useState(true);
    const val = '🌙';

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

    const handleMouseEnter = (e, glowColor) => {
        e.currentTarget.style.transform = "scale(1.05)";
        if(darkTheme) e.currentTarget.style.boxShadow = `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 15px ${glowColor}`;
    };
    const handleMouseLeave = (e, glowColor) => {
        e.currentTarget.style.transform = "scale(1)";
        if(darkTheme) e.currentTarget.style.boxShadow = "none";
    };

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
                    <button onClick={handleNewReview} style={styles.newReviewBtn}
                        onMouseEnter={(e) => handleMouseEnter(e, "#33cc33")}
                        onMouseLeave={(e) => handleMouseLeave(e, "#33cc33")}
                        >
                        ➕ New Review
                    </button>
                    <button onClick={handleCopyReview} style={styles.copyBtn}
                    onMouseEnter={(e) => handleMouseEnter(e, "#667eea")}
                    onMouseLeave={(e) => handleMouseLeave(e, "#667eea")}
                    >
                        📋 Copy Review
                    </button>
                </div>
            </nav>

            <div style={styles.container}>
                {/* Review Stats */}
                <div style={{
                    ...styles.statsBar,
                    background: darkTheme? 'black' : 'white',
                    color: darkTheme? 'white' : 'black',
                    boxShadow: darkTheme
                        ? '0 0 0 1px rgba(255,255,255,0.1), 0 0 25px rgba(99,102,241,0.35)'
                        : '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.6s ease',
                    }}>
                    <div style={{
                        display:'flex'
                    }}>
                    <div style={styles.stat}>
                        <span style={styles.statLabel}>Language:</span>
                        <span style={{
                            ...styles.statValue,
                            background: darkTheme? 'black' : 'white',
                            color: darkTheme? 'white' : 'black',
                            transition: 'all 0.6s ease',
                        }}>{language}</span>
                    </div>
                    <div style={styles.stat}>
                        <span style={styles.statLabel}>Code Length:</span>
                        <span style={{
                            ...styles.statValue,
                            background: darkTheme? 'black' : 'white',
                            color: darkTheme? 'white' : 'black',
                            transition: 'all 0.6s ease',
                            }}>{code?.length || 0} chars</span>
                    </div>
                    <div style={styles.stat}>
                        <span style={styles.statLabel}>Tokens Used:</span>
                        <span style={{
                            ...styles.statValue,
                            background: darkTheme? 'black' : 'white',
                            color: darkTheme? 'white' : 'black',
                            transition: 'all 0.6s ease',
                        }}>{tokensUsed || 'N/A'}</span>
                    </div>
                    </div>
                    <button onClick={() => setDarkTheme(prev => !prev)} style={{
                        background: darkTheme? '#1a1a40' : 'linear-gradient(135deg, #66c7eaff 10%, #3b5fcbff 90%)',
                        border: darkTheme? '2px solid #A998EE' : 'none',
                        transition:'all 0.3s ease'
                        }} className="dark"
                        >
                        {!darkTheme ? '🌙' : '☀️'}
                    </button>
                </div>

                {/* Toggle Original Code */}
                <div style={styles.toggleSection}>
                    <button 
                        onClick={() => setShowCode(!showCode)}
                        style={styles.toggleBtn}
                        onMouseEnter={(e) => handleMouseEnter(e, "#8968e5ff")}
                        onMouseLeave={(e) => handleMouseLeave(e, "#D0BCFF")}
                    >
                        {showCode ? '👁️ Hide Original Code' : '👁️ Show Original Code'}
                    </button>
                </div>

                {/* Original Code (Collapsible) */}
                {showCode && (
                    <div style={{
                        ...styles.codeSection,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        boxShadow: darkTheme
                        ? '0 0 0 1px rgba(255,255,255,0.1), 0 0 25px rgba(99,102,241,0.35)'
                        : '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.6s ease',
                        }}>
                        <h3 style={{
                            ...styles.sectionTitle,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                        }}>📄 Original Code</h3>
                        <pre style={{
                            ...styles.codeBlock,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        border: darkTheme? '2px solid white' : '2px solid #cececfff',
                        transition: 'all 0.6s ease',
                        }}>
                            <code>{code}</code>
                        </pre>
                    </div>
                )}

                {/* AI Review */}
                <div style={{
                    ...styles.reviewSection,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        boxShadow: darkTheme
                        ? '0 0 0 1px rgba(255,255,255,0.1), 0 0 25px rgba(99,102,241,0.35)'
                        : '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.6s ease',
                        }}>
                    <h3 style={{
                        ...styles.sectionTitle,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                        }}>🤖 AI Review</h3>
                    <div style={{
                        ...styles.reviewContent,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                        }}>
                        <pre style={{
                            ...styles.reviewText,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                        }}>{review}</pre>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={styles.actionButtons}>
                    <button onClick={handleNewReview} style={styles.primaryBtn}
                    onMouseEnter={(e) => handleMouseEnter(e, "rgb(252,194,0)")}
                    onMouseLeave={(e) => handleMouseLeave(e, "rgb(252,194,0)")}
                    >
                        🔄 Review Another Code
                    </button>
                    <button onClick={() => navigate('/')} style={styles.secondaryBtn}
                    onMouseEnter={(e) => handleMouseEnter(e, "#87CEEB")}
                    onMouseLeave={(e) => handleMouseLeave(e, "#87CEEB")}    
                    >
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
        background: 'linear-gradient(120deg, #3E004A 5% , rgb(39,64,139) 25% , #122620 70%)',
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
        // background: 'rgba(255, 255, 255, 0.95)',
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
        background: 'linear-gradient(135deg, #8bc34a 0%, #4f7942 100%)',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        color: 'black',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    copyBtn: {
        padding: '0.75rem 1.5rem',
        background: 'linear-gradient(135deg, #2C50AB 5%, #7070a3 95%)',
        // border: '2px solid #e5e7eb',
        border:'none',
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
        justifyContent: 'space-between',
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
        background: '#674EA7',
        
        border: '2px solid #674EA7',
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
        border: '1px solid #cececfff',
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
        background: 'linear-gradient(135deg, rgb(252,194,0) 20%, rgb(227,38,54) 80%)',
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
        background: 'linear-gradient(135deg, #f9d5e5 5%, #a3cedc 95%)',
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