import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";

import { RootStackParamList } from "../navigation/AppRoutes";
import { getPokemonDetails } from "../services/api";
import { useFavorites } from "../context/Favorites";
import { getTypeColor } from "./TypeColor";
import { styles } from "./DetailsStyles";

type RouteParams = RouteProp<RootStackParamList, "Details">;

export default function Details() {
  const route = useRoute<RouteParams>();

  const { pokemonName } = route.params;

  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    try {
      const data = await getPokemonDetails(pokemonName);

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

  const isFavorite = favorites.includes(pokemon.name);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: getTypeColor(pokemon.types[0].type.name),
          },
        ]}
      >
        <Text style={styles.pokemonNumber}>
          #{pokemon.id.toString().padStart(3, "0")}
        </Text>

        <Text style={styles.title}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: pokemon.sprites.other["official-artwork"].front_default,
            }}
            style={styles.image}
          />
        </View>

        {/* Tipos */}

        <View style={styles.typesContainer}>
          {pokemon.types.map((item: any) => (
            <View
              key={item.type.name}
              style={{
                backgroundColor: getTypeColor(item.type.name),
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 20,
                marginHorizontal: 4,
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                }}
              >
                {item.type.name}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.info}>Altura: {pokemon.height}</Text>

        <Text style={styles.info}>Peso: {pokemon.weight}</Text>

        <TouchableOpacity
          style={[
            styles.favoriteButton,
            isFavorite ? styles.removeButton : styles.addButton,
          ]}
          onPress={() =>
            isFavorite
              ? removeFavorite(pokemon.name)
              : addFavorite(pokemon.name)
          }
        >
          <Text style={styles.buttonText}>
            {isFavorite ? "★ Remover Favorito" : "☆ Adicionar Favorito"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
