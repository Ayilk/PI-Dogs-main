import React from "react";
import "../css/Cards.css"

export default function Card({ image, name, temperament, weight }){
     return(
         <div className="card">
             <img 
             className="imagenCard"
             src = { image } 
             alt = "image not found"
             width= "300px"
             height= "299px" />
             <h4> Nombre : { name } </h4>
             <h5> Temperamentos:{ temperament } </h5>
             <h5> Peso: { weight } kg</h5>
             
         </div>
     )
}