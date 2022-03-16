import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { filterDogsByTemperament, getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input){
    let errors={};
    if(!input.name){ errors.name = "Se requiere un nombre";}
    else if(!input.min_height){ errors.min_height = "Se require una altura mínima"}
    else if(!input.max_height){ errors.max_height = "Se requiere una altura máxima"}
    else if(!input.min_weight){ errors.min_weight = "Se requiere una gordura mínima"}
    else if(!input.max_weight){ errors.max_weight = "Se requiere una gordura máxima"}
    else if(parseInt(input.min_height) >= parseInt(input.max_height)){errors.max_height = "La altura máxima debe ser mayor que la altura mínima"}
}


export function DogCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);
    const [ errors, setErrors ] = useState({});
    const [ temps, setTemps ] = useState([])
    const [ input, setInput ] = useState({
        name: "",        
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperament: [] 
    })

    useEffect(() => {dispatch(getTemperaments())}, [dispatch]);

    
    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [ e.target.value ] : e.target.value
        })
        setErrors(validate({
            ...input,
            [ e.target.value ] : e.target.value
        }))   
        console.log(input)
    }

    function handleSelect(e){
        if(!temps.includes(e.target.value)){
            if(temps.length > 0) { setTemps([...temps, e.target.value]) }
            else { setTemps([e.target.value]) }
        }console.log(e.target.value)
    }

    function handleSubmit(e){
       
        if(errors.name !== undefined || 
           errors.min_height !== undefined ||
           errors.max_height !== undefined ||
           errors.min_weight !== undefined ||
           errors.max_weight !== undefined ||
           errors.life_span !== undefined ){
            document.getElementById("Alto");
            return alert("Completa los campos obligatorios")
           }
        const addDog = {
            name: input.name,
            life_span: input.life_span,
            height: input.min_height + " - " + input.max_height,
            weight: input.min_weight + " - " + input.max_weight,
            image: input.image,
            temperament: temps
        }
        
        e.preventDefault();
        console.log(input);  
        console.log(addDog); 
        dispatch(postDog(addDog));
        alert("Nueva raza perruna creada");
        setInput({
            name: "",        
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperament: []
        })
        setTemps([])
        navigate('/home')
    }

    function handleDelete(e){
        e.preventDefault();
       setTemps(temps.filter(t => t !== e.target.value));
       console.log(temps);
       console.log(e.target.value);
    }

    

    return(
        <div>
            <Link to='/home'><button> Volver </button></Link>
            <h1> Crea una nueva raza Cochi !! </h1>
            <form  id="Alto" onSubmit={e => handleSubmit(e)}>
                <div>
                    <label> Nombre: </label>
                    <input
                       type="text"
                       placeholder="Ingresa el nombre de la raza"
                       name="name"
                       key="name"
                       value={input.name}
                       onChange={e => handleChange(e)}
                    />
                    {errors.name && (<p> { errors.name } </p>)}
                </div>
                <div>
                    <label> Altura: </label>
                    <input
                       type="text"
                       value={input.min_height}
                       placeholder="Ingresa la altura mínima"
                       name="min_height"
                       onChange={e => handleChange(e)}
                    />
                    {errors.min_height && (<p> { errors.min_height } </p>)}
                    <input
                       type="text"
                       value={input.max_height}
                       placeholder="Ingresa la altura máxima"
                       name="max_height"
                       onChange={e => handleChange(e)}
                    />
                    {errors.max_height && (<p> { errors.max_height } </p>)}
                </div>
                
                <div>
                    <label> Gordura:  </label>
                    <input
                       type="text"
                       value={input.min_weight}
                       placeholder="Ingresa la gordura máxima"
                       name="min_weight"
                       onChange={e => handleChange(e)}
                    />
                    {errors.min_weight && (<p> { errors.min_weight } </p>)}
                    <input
                       type="text"
                       value={input.max_weight}
                       placeholder="Ingresa la gordura mínima"
                       name="max_weight"
                       onChange={e => handleChange(e)}
                    />
                    {errors.max_weight && (<p> { errors.max_weight} </p>)}
                </div>
                
                <div>
                    <label> Esperanza de vida: </label>
                    <input
                       type="text"
                       value={input.life_span}
                       placeholder="Ingresa la esperanza de vida"
                       name="life_span"
                       onChange={e => handleChange(e)}
                    />
                    {errors.life_span && (<p> { errors.life_span} </p>)}
                </div>
                <div>
                    <label> Imagen: </label>
                    <input
                       type="text"
                       value={input.image}
                       placeholder="Ingresa la url de la imagen"
                       name="image"
                       onChange={e => handleChange(e)}
                    />
                    {errors.image && (<p> { errors.image} </p>)}
                </div>
                <div>
                    <label> Temperamentos: </label>
                    <select name="tempe" onChange={e => handleSelect(e)} type="text">
                        <option value={null}></option>
                        {
                            temperaments.map((temp, id) => {
                                return(
                                    <option key={id} value={temp.name}> { temp.name } </option>
                                )
                            })
                        }
                    </select>
                    {
                        temps.map((temp, id) => {
                            return(
                                <React.Fragment key={id}> 
                                   <div> {temp} 
                                   <button value={temp} onClick={e => handleDelete(e)}> x </button>
                                   </div>
                                 </React.Fragment> 
                            )
                        })
                    }
                </div>

                <button type="submit"> Crear nueva raza perruna </button>
               
            </form>
        </div>
    )
}
