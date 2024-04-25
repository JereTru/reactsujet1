import React from "react";
import { Link } from 'react-router-dom';
import "../css/Footer.css"

function Footer(){

    return (
        <div className="footer">
            <p>&copy; 2024 - Groupe B (<Link to="/rui">Rui</Link>, Nicolas, <span className="plusLa">Taylan</span>, Yohan, Jérémy) - sujet 1</p>
        </div>
    )
}

export default Footer