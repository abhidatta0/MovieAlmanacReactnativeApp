import { View, TextInput, StyleSheet, 
    Alert,
    FlatList,
} from 'react-native';
import {useState} from 'react';
import { MovieType } from '../types/movie';
import MovieCard from '../components/MovieCard';

const Home = ()=>{
    const [searchText, setSearchText] = useState('');

    const [searchResults, setSearchResults] = useState<MovieType[]>([]);
    console.log(searchText);
    console.log({searchResults});

    const handleSubmit = async ()=>{
        try{
            const response = await fetch('https://www.omdbapi.com/?apikey=4dad5ea8&type=movie&s=guardian');
            const data = await response.json();
            setSearchResults(data.Search);
        }catch(e){
            showErrorAlert();
            console.log(e);
        }
    }

    const showErrorAlert = ()=>{
        Alert.alert('Something bad happened', 'Please try again', [
            {
                text: 'Ok',
            }
        ])
    }

    return (
            <View  style={styles.flatList}>
                <TextInput 
                style={styles.textInput}
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSubmit}
                />
                <FlatList
              data={searchResults}
              renderItem={({item})=>(
                <MovieCard movie={item}/>
              )}
              numColumns={2}
              contentContainerStyle={styles.flatList}
            />
            </View>
    )
}

const styles = StyleSheet.create({
   container:{
    flex: 1, 
    paddingHorizontal: 10, 
    paddingVertical: 20
   },
   textInput: {
    height: 40,
    borderWidth: 1,
   },
   flatList:{marginVertical: 20, paddingBottom: 20 }
})
export default Home;