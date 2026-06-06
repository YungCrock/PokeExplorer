import React, { createContext, useContext, useReducer } from 'react';
import {
  favoritesReducer,
  FavoriteState,
} from '../reducers/favoritesReducer';

interface FavoritesContextData {
  favorites: string[];
  addFavorite: (pokemon: string) => void;
  removeFavorite: (pokemon: string) => void;
}

const FavoritesContext = createContext({} as FavoritesContextData);

const initialState: FavoriteState = {
  favorites: [],
};

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    favoritesReducer,
    initialState
  );

  const addFavorite = (pokemon: string) => {
    dispatch({
      type: 'ADD_FAVORITE',
      payload: pokemon,
    });
  };

  const removeFavorite = (pokemon: string) => {
    dispatch({
      type: 'REMOVE_FAVORITE',
      payload: pokemon,
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};