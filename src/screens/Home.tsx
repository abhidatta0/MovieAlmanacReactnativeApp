import { View, TextInput, StyleSheet, 
    Alert,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';
import {useState} from 'react';
import { MovieType } from '../types/movie';
import MovieCard from '../components/MovieCard';
import {useShortListContext, addMovieAction} from '../contexts/shortListedContext';

const Home = ()=>{
    const {dispatch, movies} = useShortListContext();
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

    const onShortlistButtonPress= (movie: MovieType)=>{
        const findIndex = movies.findIndex((currMovie)=> currMovie.imdbID === movie.imdbID);
        if(findIndex === -1){
            dispatch(addMovieAction(movie));
        }
    }

    return (
            <View  style={styles.flatList}>
                <TextInput 
                style={styles.textInput}
                value={searchText}
                onChangeText={setSearchText}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.submitBtnText}>Get Movies</Text>
                </TouchableOpacity>
                <FlatList
              data={searchResults}
              renderItem={({item})=>(
                <MovieCard movie={item} onShortlistButtonPress={()=> onShortlistButtonPress(item)}/>
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
   button:{
    marginTop: 2,
    backgroundColor: 'orange',
    padding: 10,
    alignItems:'center',
   },
   submitBtnText:{
    color: '#fff',
    fontSize: 20
   },
   flatList:{marginVertical: 20, paddingBottom: 50 }
})
export default Home;