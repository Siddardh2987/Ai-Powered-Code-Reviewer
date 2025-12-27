import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [loading, setLoading] = useState(false);
    const [darkTheme,setDarkTheme]=useState(true);
    const val = '🌙';

    const handleMouseEnter = (e, glowColor) => {
        e.currentTarget.style.transform = "scale(1.05)";
        if(darkTheme) e.currentTarget.style.boxShadow = `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 15px ${glowColor}`;
    };
    const handleMouseLeave = (e, glowColor) => {
        e.currentTarget.style.transform = "scale(1)";
        if(darkTheme) e.currentTarget.style.boxShadow = "none";
    };
    const handleReview = async () => {
        if (!code.trim()) {
            alert('Please paste some code to review!');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:4000/api/chat',
                { message: `Review this ${language} code:\n\n${code}` },
                { 
                    headers: { 
                        'Content-Type': 'application/json'
                    }
                }
            );

            navigate('/review', { 
                state: { 
                    review: response.data.reply,
                    code: code,
                    language: language,
                    tokensUsed: response.data.tokensUsed
                }
            });

        } catch (error) {
            console.error('Review error:', error);
            if (error.code === 'ERR_NETWORK') {
                alert('❌ Cannot connect to server. Is the backend running on port 4000?');
            } else if (error.response) {
                alert(`❌ Error: ${error.response.data?.reply || error.response.data?.error || 'Failed to review code'}`);
            } else {
                alert('❌ Failed to review code. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePasteSample = () => {
        const sampleCode = `function calculateTotal(items) {
  let total = 0;
  for(i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}`;
        setCode(sampleCode);
    };

    const handleClear = () => {
        setCode('');
    };

    return (
        <div className="Full_Page" style={styles.fullPage}>
            <nav style={styles.nav}>
                <h1 style={{
                        ...styles.logo,
                        textShadow: darkTheme
                        ? '0 0 0 1px rgba(255,255,255,0.1), 0 0 25px rgba(99,102,241,0.35)'
                        : '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'box-shadow 0.3s ease',
                    }}
                >🔍 AI Code Reviewer</h1>
                <div style={styles.navButtons}>
                    <button 
                        onClick={handlePasteSample}
                        style={{
                            ...styles.sampleBtn,
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, "#8BCD50")}
                        onMouseLeave={(e) => handleMouseLeave(e, "#8BCD50")}
                        disabled={loading}
                    >
                        📋 Paste Sample
                    </button>
                    <button 
                        onClick={handleClear}
                        style={{
                            ...styles.clearBtn,
                            opacity: (loading || !code.trim()) ? 0.5 : 1,
                            cursor: (loading || !code.trim()) ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) =>handleMouseEnter(e, "#e43e15")}
                        onMouseLeave={(e) => handleMouseLeave(e, "#e43e15")}
                        disabled={loading || !code.trim()}
                    >
                       🗑️ Clear Code
                    </button>
                    <button 
                        onClick={handleReview}
                        disabled={loading || !code.trim()}
                        style={{
                            ...styles.reviewBtn,
                            opacity: (loading || !code.trim()) ? 0.5 : 1,
                            cursor: (loading || !code.trim()) ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, "rgb(252,194,0)")}
                        onMouseLeave={(e) => handleMouseLeave(e, "rgb(252,194,0)")}
                    >
                        {loading ? '🔄 Reviewing...' : '🚀 Review Code'}
                    </button>
                </div>
            </nav>

            <div style={styles.container}>
                {/* Language Selector */}
                <div style={{
                        ...styles.languageSelector,
                        boxShadow: darkTheme
                        ? '0 0 0 1px rgba(255,255,255,0.1), 0 0 25px rgba(99,102,241,0.35)'
                        : '0 4px 20px rgba(0,0,0,0.1)',
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                    }}
                >
                    <div>
                    <label style={{
                        ...styles.label,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                    }}>
                    Language: </label>
                    <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{
                            ...styles.select,
                            background: darkTheme? 'black' : 'white',
                            color: darkTheme? 'white' : 'black',
                            transition: 'all 0.6s ease',
                        }}
                        disabled={loading}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="typescript">TypeScript</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="sql">SQL</option>
                        <option value="go">Go</option>
                        <option value="rust">Rust</option>
                    </select>
                    </div>
                    <button onClick={() => setDarkTheme(prev => !prev)} style={{
                        background: darkTheme? '#1a1a40' : 'linear-gradient(135deg, #66c7eaff 10%, #3b5fcbff 90%)',
                        border: darkTheme? '2px solid #A998EE' : 'none',
                        }} className="dark">
                        {!darkTheme ? '🌙' : '☀️'}
                    </button>
                </div>

                {/* Code Input Box */}
                {/* <div className="Code_Box" style={styles.codeBox}> */}
                <div className="Code_Box"
                    style={{
                        ...styles.codeBox,
                        boxShadow: darkTheme
                        ? '0 0 0 1px rgba(255,255,255,0.1), 0 0 25px rgba(99,102,241,0.35)'
                        : '0 4px 20px rgba(0,0,0,0.1)',
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                    }}>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste your code here for AI review...

Example:
function hello() {
  console.log('Hello World');
}

Tips:
• Paste any code snippet
• Select the correct language
• Click 'Review Code' to get instant feedback
• No sign-up or login required!"
                        style={{
                            ...styles.textarea,
                            background: darkTheme? 'black' : 'white',
                            color: darkTheme? 'white' : 'black',
                            transition: 'all 0.6s ease',
                        }}
                        disabled={loading}
                    />
                    
                    {/* Character Count */}
                    <div style={styles.footer}>
                        <div style={styles.charCount}>
                            {code.length} characters
                            {code.length > 0 && ` • ${code.split('\n').length} lines`}
                        </div>
                        {code.length > 5000 && (
                            <div style={styles.warning}>
                                ⚠️ Large code may take longer to review
                            </div>
                        )}
                    </div>
                </div>

                {/* Instructions */}
                <div style={{
                        ...styles.instructions,
                        boxShadow: darkTheme
                        ? '0 0 0 1px rgba(255,255,255,0.1), 0 0 25px rgba(99,102,241,0.35)'
                        : '0 4px 20px rgba(0,0,0,0.1)',
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                    }}>
                    <h3 style={{
                        ...styles.instructionTitle,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                    }}>💡 How to use:</h3>
                    <ul style={{
                        ...styles.instructionList,
                        background: darkTheme? 'black' : 'white',
                        color: darkTheme? 'white' : 'black',
                        transition: 'all 0.6s ease',
                    }}>
                        <li>1. Select your programming language from the dropdown</li>
                        <li>2. Paste your code in the editor above</li>
                        <li>3. Click "Review Code" to get instant AI feedback</li>
                        <li>4. View detailed analysis with bugs, security issues, and improvements</li>
                        <li>5. No account needed - completely free! 🎉</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// ===== DESKTOP-OPTIMIZED STYLES =====
const styles = {
    fullPage: {
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #3E004A 5% , rgb(39,64,139) 25% , #122620 70%)',
        // background: darkTheme? '#1a1a40' : '#d3d3e6',
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // ← Modern, readable font
        margin:0,
        padding : 0,
        // overflow : hidden,
    },
    nav: {
        // background: darkTheme? '#1a1a40' : '#d3d3e6',
        // background : 'rgb(39,64,139)',
        backdropFilter: 'blur(10px)',
        padding: '2rem 3rem',           // ← Bigger padding for desktop
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        fontSize: '2.5rem',             // ← Bigger logo
        fontWeight: 'bold',
        color: '#667eea',
        margin: 0,
    },
    navButtons: {
        display: 'flex',
        gap: '1rem',
    },
    sampleBtn: {
        padding: '1rem 2rem',           // ← Bigger buttons
        background: 'linear-gradient(135deg, #8BCD50 10% , #1D741B 80%)',
        // background: darkTheme? '#1a1a40' : '#d3d3e6',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.125rem',           // ← Bigger text
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    clearBtn: {
        padding: '1rem 2rem',
        // background: '#de6040ff',
        background: 'linear-gradient(135deg, #d56245ff 10% , #e43e15ff 80%)',
        // border: '2px solid #fecaca',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#660404ff',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    reviewBtn: {
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, rgb(252,194,0) 20%, rgb(227,38,54) 80%)',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.125rem',
        fontWeight: '600',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    container: {
        maxWidth: '1600px',             // ← Wider for desktop (was 1200px)
        margin: '0 auto',
        padding: '3rem 4rem',           // ← More padding
    },
    languageSelector: {
        background: 'black',
        color: 'white',
        padding: '1.5rem 2rem',         // ← More padding
        borderRadius: '12px',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    label: {
        // padding: '2px',
        fontSize: '1.125rem',           // ← Bigger text
        fontWeight: '600',
        color: '#ffffffff',
    },
    select: {
        padding: '0.75rem 0.5rem',    // ← Bigger select
        fontSize: '1.125rem',
        border: '2px solid #e5e7eb',
        borderRadius: '10px',
        cursor: 'pointer',
        outline: 'none',
        background:'black',
        color:'white',
        fontFamily: 'inherit',
    },
    // statusBadge: {
    //     marginLeft: 'auto',
    //     padding: '0.75rem 1.5rem',
    //     background: '#dcfce7',
    //     color: '#166534',
    //     borderRadius: '10px',
    //     fontSize: '1rem',
    //     fontWeight: '600',
    // },
    codeBox: {
        background: 'black',
        borderRadius: '16px',
        padding: '1rem',               // ← More padding
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
    },
    textarea: {
        width: '100%',                 // full width of codeBox minus padding
        height: '35rem',               // ~560px, adjust as needed
        padding: '1.5rem',
        fontSize: '1rem',
        background: 'black',
        fontFamily: '"Cascadia Code", "Fira Code", Consolas, Monaco, monospace',
        color: 'white',
        lineHeight: '1.6',
        border: '0.125rem solid #e5e7eb',  // 2px ≈ 0.125rem
        borderRadius: '0.75rem',       // 12px ≈ 0.75rem
        resize: 'vertical',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        boxSizing: 'border-box',       // ✅ includes padding and border inside width/height
        margin: '0',                   // remove default margin
    },
    footer: {
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    charCount: {
        fontSize: '1rem',              // ← Bigger
        color: '#6b7280',
    },
    warning: {
        fontSize: '1rem',
        color: '#f59e0b',
        fontWeight: '600',
    },
    instructions: {
        background:'black',
        color:'white',
        backdropFilter: 'blur(10px)',
        padding: '2rem',               // ← More padding
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    instructionTitle: {
        fontSize: '1.5rem',            // ← Bigger title
        fontWeight: '600',
        color: 'white',
        marginBottom: '1.25rem',
    },
    instructionList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontSize: '1.125rem',          // ← Bigger text
        color: '#6b7280',
        lineHeight: '2',               // ← More spacing between lines
    },
};

export default Home;