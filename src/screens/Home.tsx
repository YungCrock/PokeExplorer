import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { getPokemons } from '../services/api';
import { RootStackParamList } from '../navigation/AppRoutes';

type NavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<NavigationProps>();

  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);

      const data = await getPokemons();

      setPokemons(data);
    } catch (err) {
      setError('Erro ao carregar Pokémons');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 16,
              borderBottomWidth: 1,
            }}
            onPress={() =>
              navigation.navigate('Details', {
                pokemonName: item.name,
              })
            }
          >
            <Text>
              {item.name.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}