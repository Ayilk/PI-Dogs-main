import React from "react";
import "../css/Paginado.css";

export default function Paginado({
  dogsPerPage,
  allDogs,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="container">
      <div className="liContainer">
      <button 
        className="botonn"
        disabled={currentPage > 1 ? false : true}
        onClick={() => paginado(1)}
      >
       First
      </button>

      <button
      className="botonn"
        disabled={currentPage > 1 ? false : true}
        onClick={() => paginado(currentPage - 1)}
      >
       Prev 
      </button>

      {pageNumbers &&
        pageNumbers.map((number) => (
        
          <li className="li" key={number}>
            <a className="link" onClick={() => paginado(number)}>{number}</a>
          </li>
          
        ))}

        <button
        className="botonn"
        disabled={currentPage < pageNumbers.length ? false : true}
        onClick={() => paginado(currentPage + 1)}
      >
       Next 
      </button>
      
         <button
         className="botonn"
        disabled={currentPage < pageNumbers.length ? false : true}
        onClick={() => paginado(pageNumbers.length)}
      >
       Last
      </button>
      </div>   
    </ul>
  );
}
