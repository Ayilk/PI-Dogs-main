import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { filterCreated, filterDogsByTemperament, getDogs, orderByName, orderByWeight }  from '../actions/index';
import { Link } from 'react-router-dom';
import Card from './Cards';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

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
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleFilterTemperament(e){
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value))
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
        <div>
            <Link to = '/dog'> 
               <button>Crear nueva raza perruna</button>
            </Link>
            <h1>Dogos</h1>
            <button onClick={e => { handleClick(e) }} >
                Volver a cargar todos los Dogos
            </button>

            <div>
                <select onChange={e => handleSort(e) }>
                    <option value= 'asc'>Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>
                <select onChange={e => handleSortW(e)}>
                    <option value= 'mayor'>Gordos</option>
                    <option value= 'menor'>Flacos</option>
                </select>    
                <select onChange={ e => handleFilterCreated(e) } >
                    <option value='All'> Todos los cochis</option>
                    <option value='created'>Cochis creados</option>
                    <option value='api'>Existente</option>
                </select>  
                <select onChange={(e) => handleFilterTemperament(e)}>
                    <option value="temperamento"> Temperamentos </option>
                    <option value="all"> Todos </option>               
                        {allTemp.map((t) => (
                        <option key={t.id} value={t.name}> {t.name} </option>))}
                </select>  
               

                <Paginado
                  dogsPerPage={dogsPerPage}
                  allDogs={allDogs.length}
                  paginado={paginado}
                />  

                <SearchBar/>

                  {
                      currentDogs ?.map((el) => {
                          return(
                              <div>
                                  <Link to={'/home/' + el.id}>
                                      <Card name={el.name}
                                            image={el.image}
                                            weight={el.weight}
                                            temperament={el.temperament}
                                            key={el.id} />
                                  </Link>
                              </div>
                          )
                      })
                  }      
            </div>
        </div>
    )
} 