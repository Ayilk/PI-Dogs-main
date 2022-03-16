import React, { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';

export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();
    const {id} = useParams();
    const myDog = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])
    
    return(
        <div>
            {
                myDog.length >0 && 
                <div>
                    <h1> Nombre: { myDog[0].name } </h1>
                    <img src={ myDog[0].image } alt="not img" width="500px" height="700px"/>
                    <p > Esperanza de vida: {myDog[0].createdDb? myDog[0].life_span + "años" : myDog[0].life_span} </p>
                    <p > Temperamentos: {!myDog[0].createdInDb? myDog[0].temperament + " " : myDog[0].temperaments.map(el => el.name + (" "))}</p>  
                    <p > Altura: {myDog[0].height} Cm</p> 
                    <p > Peso: {myDog[0].weight} Kg </p>          
                </div>
            }
            <Link to='/home'>
                <button> Volver </button>
            </Link>
        </div>
    )
}