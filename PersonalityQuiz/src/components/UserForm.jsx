import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
    const [inputName, setInputName] = useState('');
    const { setName } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();
        setName(inputName);  // Set the name in context
        window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);  // Dispatch a navigation event
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <p style={{textAlign:"left"}}>Name:</p>
            <input type="text" id="inputName" name="inputName" onChange={(e) => {setInputName(e.target.value)}}/> <br />
            <input type="submit" value="Start Quiz" />
            </form>
        </div>
    );
}