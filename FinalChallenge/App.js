import React, { useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';

const App = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchDeezer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.deezer.com/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error searching Deezer:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
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

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search on Deezer"
        value={query}
        onChangeText={setQuery}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={searchDeezer}
      >
        Search
      </Button>
      {loading && <ActivityIndicator animating={true} color="#0000ff" size="large" />}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop:10,
    borderWidth: 1,
    borderRadius: 5,
  },
  itemContainer: {
    marginTop:15,
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
    borderRadius: 5,
    marginRight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
    width: '100%',
  },
  button: {
    marginTop: 10,
    width: 200,
  },
});

export default App;
