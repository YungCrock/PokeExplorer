import AppRoutes from './src/navigation/AppRoutes';
import { FavoritesProvider } from './src/context/Favorites';

export default function App() {
  return (
    <FavoritesProvider>
      <AppRoutes />
    </FavoritesProvider>
  );
}