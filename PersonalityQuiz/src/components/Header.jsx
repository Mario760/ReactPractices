import {Link} from "react-router-dom";
import React from "react";

export default function Header(){
    return (<div>
        <h1>Which Element Are You?</h1><br />
        <p>(based on completely random things)</p> <br />
        <Link to="/">Home</Link> &nbsp; &nbsp;
        <Link to='/quiz'>Quiz</Link>
    </div>);
}