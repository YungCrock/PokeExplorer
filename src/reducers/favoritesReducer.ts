export interface FavoriteState {
  favorites: string[];
}

export type FavoriteAction =
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string };

export const favoritesReducer = (
  state: FavoriteState,
  action: FavoriteAction
): FavoriteState => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        favorites: [...state.favorites, action.payload],
      };

    case 'REMOVE_FAVORITE':
      return {
        favorites: state.favorites.filter(
          pokemon => pokemon !== action.payload
        ),
      };

    default:
      return state;
  }
};