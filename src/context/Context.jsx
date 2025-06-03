import { createContext, useState } from "react";
import run from "../config/cybrix";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] =useState("");
    const [recentPrompt,setRecentPrompt] =useState("");
    const [prevPrompts,setPrevPrompts] =useState([]);
    const [showResult,setShowResult] =useState(false);
    const [loading,setLoading] =useState(false);
    const [resultData,setResultData] =useState("");

    const delayPara=(index,nextWord)=>{
            setTimeout (function () {
                setResultData(prev=>prev+nextWord)
                
            },30*index)
    }
    const newChat = ()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent=async(prompt)=>{

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response=await run(prompt)
            setRecentPrompt(prompt)

        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response= await run(input)
        }
        
          // Handle bold **text** and *line breaks*
    // Format response: ** for bold, * for line breaks
    const formattedResponse = response
      .split(/(\*\*.*?\*\*|\#\#\#.*|\#\#.*)/g) // Split by bold and header markers
      .map((text, i) => {
        if (text.startsWith("###")) {
          return `<h3>${text.slice(4)}</h3>`; // H3
        }
        if (text.startsWith("##")) {
          return `<h2>${text.slice(3)}</h2>`; // H2
        }
        return text.startsWith("**") ? `<b>${text.slice(2, -2)}</b>` : text; // Bold
      })
      .join("") // Rejoin after formatting
      .split("*")
      .join("<br/>"); // Replace * with <br>
        // let responseArray=response.split("**");
        // let newResponse="";
        // for (let i = 0; i <responseArray.length; i++) {
        //     if (i===0 || i%2 != 1) {
        //         newResponse+=responseArray[i];
        //     }            
        //     else{
        //         newResponse+="<b>"+responseArray[i]+"</b>";
        //     }
        // }
    
        // let newResponse2=newResponse.split("*").join("</br>")


        // let newResponseArray=newResponse2.split(" ")
        // for (let i = 0; i < newResponseArray.length; i++) {
        //     const nextWord=newResponseArray[i];
        //     delayPara(i,nextWord+" ")
        // }
         const responseWords = formattedResponse.split(" ");
    responseWords.forEach((word, index) => {
      delayPara(index, word + " ");
    });
        setLoading(false)
        setInput("")
    }
    
    

    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <Context.Provider value={contextValue} >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider