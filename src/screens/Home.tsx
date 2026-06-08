import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getPokemons } from "../services/api";
import { RootStackParamList } from "../navigation/AppRoutes";
import { useFavorites } from "../context/Favorites";
import { styles } from "./HomeStyles";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<NavigationProps>();

  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { favorites } = useFavorites();

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      const data = await getPokemons();
      setPokemons(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e3350d" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar Pokémon..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
          marginBottom: 12,
        }}
      />

      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const pokemonId = item.url.split("/")[6];

          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          const isFavorite = favorites.includes(item.name);

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Details", {
                  pokemonName: item.name,
                })
              }
            >
              <View style={styles.left}>
                <Image
                  source={{
                    uri: imageUrl,
                  }}
                  style={styles.image}
                />

                <View>
                  <Text style={styles.number}>
                    #{pokemonId.padStart(3, "0")}
                  </Text>

                  <Text style={styles.name}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Text>
                </View>
              </View>

              {isFavorite && <Text style={styles.favorite}>⭐</Text>}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
