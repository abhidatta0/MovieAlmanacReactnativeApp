import React, {createContext, useReducer, Dispatch, useContext} from 'react';
import { MovieType } from '../types/movie';

const shortListedContext = createContext<{movies: MovieType[], dispatch:Dispatch<ALL_ACTIONS>}|undefined>(undefined);

type ShortListState = {
    movies: MovieType[],
}

const ADD_MOVIE = 'ADD_MOVIE';

type ADD_MOVIE_ACTION  = {
  type: typeof ADD_MOVIE;
  payload: MovieType;
}

type ALL_ACTIONS = ADD_MOVIE_ACTION;

const reducer = (state: ShortListState, action: ALL_ACTIONS)=>{
   switch(action.type){
    case 'ADD_MOVIE':{
        return {
            ...state,
            movies:[...state.movies, action.payload],
        }
    }
    default:{
        return state;
    }
   }
} 
export const ShortListedProvider = ({children}: {children: React.ReactNode})=>{
    const [state, dispatch] = useReducer(reducer, {
        movies: [],
    })

    return (
        <shortListedContext.Provider value={{...state, dispatch}}>
          {children}
        </shortListedContext.Provider>
    )
}

export const useShortListContext = ()=>{
    const context = useContext(shortListedContext);

    if(!context){
      throw new Error('useShortListContext must be inside a shortListedProvider');
    }

    return context;
}