import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 4,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 70,
    height: 70,
    marginRight: 15,
  },

  number: {
    color: '#888',
    fontSize: 14,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  favorite: {
    fontSize: 26,
  },
});