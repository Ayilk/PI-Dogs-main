import React, { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import "../css/Detail.css"

export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();
    const {id} = useParams();
    const myDog = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])
    
    return(
        <div >
            {
                myDog.length >0 && 
                <div className="containerDetail">
                    
                    <img 
                       className="detailImage"
                       src={ myDog[0].image } 
                       alt="not img" 
                       width="500px" 
                       height="500px"/>
                     
                     <div className="datos">
                        <div className="datoss">  
                        <p className="span">Nombre:</p>
                            <h1>   { myDog[0].name } </h1>   
                        </div>
                        <div className="datoss">
                        <p className="span"> Esperanza de vida:</p> 
                            <p >  {myDog[0].createdDb? myDog[0].life_span + "años" : myDog[0].life_span} </p>
                        </div> 
                        <div className="datoss">
                        <p className="span"> Temperamentos:</p>
                            <p > {!myDog[0].createdInDb? myDog[0].temperament + " " : myDog[0].temperaments.map(el => el.name + (" "))}</p>  
                        </div> 
                        <div className="datoss">
                        <p className="span"> Altura:</p>
                            <p >  {myDog[0].height} Cm</p> 
                        </div> 
                        <div className="datoss"> 
                        <p className="span"> Peso:</p>
                            <p >  {myDog[0].weight} Kg </p>   
                        </div> 
                    </div>       
                </div>
            }
            <Link to='/home'>
                <button> Volver </button>
            </Link>
        </div>
    )
}