import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { filterCreated, filterDogsByTemperament, getDogs, orderByName, orderByWeight, getTemperaments }  from '../actions/index';
import { Link } from 'react-router-dom';
import Card from './Cards';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import "../css/Home.css"

export default function Home(){
    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);
    const allTemp = useSelector((state) => state.temperaments);

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ dogsPerPage, setDogsPerPage ] = useState(8);
    const [ orden, setOrden ] = useState('');
    const indexOfLastDog = currentPage*dogsPerPage;
    const indexOfFirstDog = indexOfLastDog-dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog);

    const paginado= (pageNumber) => {
        setCurrentPage(pageNumber)
    }
 
    useEffect(() => {
        dispatch(getDogs())
        dispatch( getTemperaments())
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleFilterTemperament(e){
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortW(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(
        <div className="container">
            

            <div className="cinta">
                <div className="botoness">
                <Link to = '/dog'> 
                    <button className="botones">Crear nueva raza perruna</button>
                </Link>
                </div>
                <button className="botones" onClick={e => { handleClick(e) }} >
                    Volver a cargar todos los Dogos
                </button>

                <select className="botones" onChange={e => handleSort(e) }>
                    <option value= 'asc'>Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>
                <select className="botones" onChange={e => handleSortW(e)}>
                    <option value= 'mayor'>Gordos</option>
                    <option value= 'menor'>Flacos</option>
                </select>    
                <select className="botones" onChange={ e => handleFilterCreated(e) } >
                    <option value='All'> Todos los cochis</option>
                    <option value='created'>Cochis creados</option>
                    <option value='api'>Existente</option>
                </select>  
                <select className="botones" onChange={(e) => handleFilterTemperament(e)}>
                    <option value="temperamento"> Temperamentos </option>
                    <option value="all"> Todos </option>               
                        {allTemp.map((t) => (
                        <option key={t.id} value={t.name}> {t.name} </option>))}
                </select>  
               
                <SearchBar />

                

                

                  
            </div>
            
            <div className="containerCard" >  
            {
                      currentDogs ?.map((el) => {
                          return(
                              <div >
                                  <Link to={'/home/' + el.id}>
                                      <Card name={el.name}
                                            image={el.image ? el.image: <img src="https://imgs.search.brave.com/dG3edZP1SHHP38gnCGwhRXptYBBaAL56FtRyiXYTCkQ/rs:fit:1080:1080:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzNhL2Vh/LzdlLzNhZWE3ZWU3/NzdhYmNjM2QxNWZl/Yjg0MDZmMDBjMzRj/LmpwZw"/>}
                                            weight={el.weight}
                                            temperament={ el.temperament  ? el.temperament :                                               
                                                       el.temperaments && el.temperaments.map((temp) => temp.name.concat(" "))
                                            }
                                            key={el.id} />
                                  </Link>
                              </div>
                          )
                      })
            }
            </div>   
            <Paginado
                  dogsPerPage={dogsPerPage}
                  allDogs={allDogs.length}
                  paginado={paginado}
                  currentPage={currentPage}
                />       
        </div>
    )
} 