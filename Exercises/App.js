import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const App = () => {
  const [query, setQuery] = useState('');
  const [firstResult, setFirstResult] = useState(null);

  const searchDeezer = async () => {
    try {
      const response = await fetch(`https://api.deezer.com/search?q=${query}`);
      const data = await response.json();
      if (data.data.length > 0) {
        setFirstResult(data.data[0]);
      } else {
        setFirstResult(null);
      }
    } catch (error) {
      console.error('Error searching Deezer:', error);
    }
  };

  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.album.cover_medium }} style={styles.albumImage} />
      <View style={styles.textContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Text style={styles.artist}>{item.artist.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search on Deezer"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={searchDeezer}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {firstResult && renderItem(firstResult)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  titleContainer: {
    flexWrap: 'wrap', 
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  artist: {
    fontSize: 15,
    color: 'gray',
  },
  albumImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
