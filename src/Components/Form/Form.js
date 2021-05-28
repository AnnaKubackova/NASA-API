import React, { useState } from 'react';

function Form() {
    const [inputValue, setInputValue] = useState("");
    const [username, setUsername] = useState("");

    const handlechange = (event) => {
        setInputValue(event.target.value);
    };

    const handlesubmit = (event) => {
        event.preventDefault();
        setUsername(inputValue);
        console.log(username);
        console.log("HI event - preveneted default")
    }

    return(
        <div>
            <form onSubmit={handlesubmit}>
                <input type="text" onChange={handlechange} title="inputName" />
                <input type="submit" value="Submit" title="inputSubmit" />    
            </form> 

            <p title="username">Welcome {username}</p> 
        </div>
    ) 
}

export default Form;