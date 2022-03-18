import React from 'react';
import { Link } from 'react-router-dom';
import "../css/LandingPage.css";
import imagen from "../assets/portada2.png";

export default function LandingPage(){
    return(
        <div className="contain">
            <div>
                <h1> Proyecto Individual " DOGS "</h1>
                <h2> Sandra Rangel </h2>
                <h3> Corrector: Brayan Camilo Pineda</h3>
                
            </div>
            <div >
                    <Link to = '/home'>
                        <button className='boton'> 
                            <div >
                                 <img className="image"   src={imagen} alt=''/>
                            </div>
                        </button>
                    </Link>
                </div>
        </div>
        
    )
}