const initialState = { 
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: [],
}

function rootReducer(state = initialState, action){
     switch(action.type){
         case 'GET_DOGS':
             return {
                 ...state,
                 dogs: action.payload,
                 allDogs: action.payload
             }
          case 'GET_TEMPERAMENTS':
              return {
                  ...state,
                  temperaments: action.payload
              } 
           case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.allDogs;
            
            let filteredDogs = action.payload === "all" ? allDogs :
            allDogs.filter((e) => {
                if (e.temperament ) {
                  if (e.temperament.includes(action.payload)) {
                    return e;
                  }                                  
                }
                else if(e.temperaments){
                    const x= e.temperaments?.map(el=>el.name.concat(""))
                    if(x.includes(action.payload)){return e}
                }
                return false;
              });
        if (filteredDogs.length <= 0) {
          filteredDogs = allDogs;
          alert("No hay perro con ese temperamento");
        } 
            return {
                ...state,
                dogs: filteredDogs,
            }
            case 'FILTER_CREATED':   
                const allDogss = state.allDogs;
                const createdFilter = action.payload === 'created' ?
                                allDogss.filter(el => el.createdInDb) :
                                allDogss.filter(el => !el.createdInDb);
                return{
                    ...state,
                    dogs: action.payload === 'All'? state.allDogs : createdFilter
                }
            case 'ORDER_BY_NAME':
                let sorted = action.payload === 'asc'?
                     state.dogs.sort(function(a,b){
                         if(a.name > b.name){return 1}
                         if(b.name > a.name){return -1}
                         return 0
                     }) :
                     state.dogs.sort(function(a,b){
                        if(a.name > b.name){return -1}
                        if(b.name > a.name){return 1}
                        return 0
                     })     
                return{
                    ...state,
                    dogs: sorted
                } 
            case 'ORDER_BY_WEIGHT':
                let sortedW = action.payload === "menor"?
                     state.dogs.sort(function(a,b){
                         if(typeof action.payload.weight === "string" ){
                             if(a.weight > b.weight){return 1}
                             if(a.weight < b.weight){return -1}
                             return 0;
                         }else{
                             if(parseInt(a.weight) > parseInt(b.weight)){return 1}
                             if(parseInt(a.weight) < parseInt(b.weight)){return -1}
                             return 0;
                         }
                     }) :
                     state.dogs.sort(function(a,b){
                         if(typeof action.payload.weight === "string"){
                             if(a.weight > b.weight){return -1}
                             if(a.weight < b.weight){return 1}
                             return 0;
                         }else{
                             if(parseInt(a.weight) > parseInt(b.weight)){return -1}
                             if(parseInt(a.weight) < parseInt(b.weight)){return 1}
                             return 0;
                         }
                     });
                     return{
                         ...state,
                         dogs: sortedW
                     }     
            case "GET_NAME_DOGS":
                return{
                    ...state,
                    dogs: action.payload
                }  
            case 'POST_DOG':
                return{
                    ...state
                } 
            case 'GET_DETAILS':
                return{
                    ...state,
                    detail: action.payload
                }


         default:
             return state;    
     }
}

export default rootReducer;