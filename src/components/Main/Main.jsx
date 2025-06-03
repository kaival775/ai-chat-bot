import React, { useContext, useEffect, useRef, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; 
const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context);

    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
 

    const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  // Function to parse response and detect code blocks
  const renderResponse = (text) => {
    // Split by triple backticks to identify code blocks
    const parts = text.split(/```/);
    
    return parts.map((part, index) => {
      // Code block if the index is odd
      if (index % 2 === 1) {
        return (
          <div key={index} className="code-block">
            <button className="copy-btn" onClick={() => copyToClipboard(part)}>
              Copy Code
            </button>
            <pre>
              <code className="language-js">{part}</code> {/* Add language class for Prism */}
            </pre>
          </div>
        );
      }
      

      // Regular text if the index is even
      return (
      <div
        key={index}
        className="response-text"
        dangerouslySetInnerHTML={{ __html: part }}
      />
    );
    });
  };

  // Apply syntax highlighting after the response is rendered
  useEffect(() => {
    Prism.highlightAll(); // Highlights the code using Prism
    scrollToBottom(); // Scroll to bottom when new data is rendered
  }, [resultData,loading]);

  const handleCardClick = (prompt) => {
    setInput(prompt);
  };
 
   // Function to handle the Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default Enter key behavior
      onSent()
    }
  };

  return (
  <div className='main'>
    
      <div className="nav">
        Cybrix Ai
       <img src={assets.user_icon} alt="" />
      </div>
    <div className="main-container">

      {!showResult ? <>
      <div className="greet">
        <p><span>Hello, Dev.</span></p>
        <p>How I can help you today?</p>
      </div>
      <div className="cards">
        <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on upcoming road")}>
          <p>Suggest beautiful places to see on upcoming road</p>
          <img src={assets.compass_icon} alt="" />
        </div>
        <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
          <p>Briefly summarize this concept: urban planning</p>
          <img src={assets.bulb_icon} alt="" />
        </div>
        <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
          <p>Brainstorm team bonding activities for our work retreat</p>
          <img src={assets.message_icon} alt="" />
        </div>
        <div className="card" onClick={() => handleCardClick("Improve the readability of the following code")}>
          <p>Improve the readability of the following code</p>
          <img src={assets.code_icon} alt="" />
        </div>
      </div>
      </>:
      <div className='result'>
        <div className="result-title">
          <img src={assets.user_icon} alt="" />
          <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
          <img src="src\assets\LOGO.png" alt="" />
          {
          loading  ?
         <div class="loader">
             {/* Horizontal lines */}
             {[...Array(5)].map((_, i) => (
               <div
                 key={i}
                 className="line"
                 style={{ animationDelay: `${i * 0.1}s` }}
               ></div>
             ))}
           
             {/* Cyberix AI text */}
             <div class="text">
               <span>Cybrix AI</span>
             </div>
           </div>

         :  <div className="main-content">
             {loading ? <p>Loading...</p> : renderResponse(resultData)
             }
              {/* A hidden div at the bottom to help scroll into view */}
             <div ref={chatEndRef} />
           </div>
           }
         
        </div>
      </div>
      }
      <div className="main-bottom">
        <div className="search-box">
          <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={handleKeyDown}  type="text" name="" placeholder="Enter a prompt here"  />
          <div>
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
           {input? <img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
          </div>
        </div>
        <div className="bottom-info">
          Cybrix may display inaccurate info, including about people, so double-check its responses.
        </div>
      </div>
    </div>
  </div>
      

  )
}

export default Main