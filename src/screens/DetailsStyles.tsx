import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  header: {
    height: 230,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pokemonNumber: {
    color: '#FFF',
    fontSize: 18,
    opacity: 0.9,
  },

  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: -80,
    paddingHorizontal: 20,
  },

  imageContainer: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FFF',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 8,
  },

  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },

  typesContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 15,
  },

  info: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: '500',
  },

  favoriteButton: {
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  addButton: {
    backgroundColor: '#4CAF50',
  },

  removeButton: {
    backgroundColor: '#E53935',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
