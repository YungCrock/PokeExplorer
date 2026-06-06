import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '../navigation/AppRoutes';
import { getPokemonDetails } from '../services/api';
import { useFavorites } from '../context/Favorites';

type RouteParams = RouteProp<
  RootStackParamList,
  'Details'
>;

export default function Details() {
  const route = useRoute<RouteParams>();

  const { pokemonName } = route.params;

  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const {
    favorites,
    addFavorite,
    removeFavorite,
  } = useFavorites();

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    try {
      const data = await getPokemonDetails(
        pokemonName
      );

      setPokemon(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const isFavorite =
    favorites.includes(pokemon.name);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        {pokemon.name.toUpperCase()}
      </Text>

      <Image
        source={{
          uri:
            pokemon.sprites.front_default,
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />

      <Text>
        Altura: {pokemon.height}
      </Text>

      <Text>
        Peso: {pokemon.weight}
      </Text>

      <Text>
        Tipo:{' '}
        {pokemon.types
          .map(
            (type: any) =>
              type.type.name
          )
          .join(', ')}
      </Text>

      {isFavorite ? (
        <Button
          title="Remover dos Favoritos"
          onPress={() =>
            removeFavorite(pokemon.name)
          }
        />
      ) : (
        <Button
          title="Adicionar aos Favoritos"
          onPress={() =>
            addFavorite(pokemon.name)
          }
        />
      )}
    </View>
  );
}