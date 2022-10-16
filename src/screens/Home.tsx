import { View, TextInput, StyleSheet, 
    Alert,
    FlatList,
    TouchableOpacity,
    Text,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import {useState} from 'react';
import { MovieType } from '../types/movie';
import MovieCard from '../components/MovieCard';
import {useShortListContext, addMovieAction} from '../contexts/shortListedContext';

const Home = ()=>{
    const {dispatch, movies} = useShortListContext();
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    const [searchResults, setSearchResults] = useState<MovieType[]>();

    const handleSubmit = async ()=>{
        setLoading(true);
        setSearchText('');
        Keyboard.dismiss();
        try{
            const response = await fetch(`https://www.omdbapi.com/?apikey=4dad5ea8&type=movie&s=${searchText}`);
            const data = await response.json();
            if(data.Response === 'True'){
            setSearchResults(data.Search);
            }
            else{
            setSearchResults([]);
            }
        }catch(e){
            showErrorAlert();
            console.log(e);
        }finally{
        setLoading(false);
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
        }else{
            alreadyShortlistedAlert();
        }
    }

    const alreadyShortlistedAlert = ()=>{
        Alert.alert('Already shortlisted this movie',undefined, [
            {
                text: 'Ok',
            }
        ])
    }

    return (
            <View  style={styles.container}>
                <TextInput 
                style={styles.textInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Enter movie name"
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.submitBtnText}>Get Movies</Text>
                </TouchableOpacity>
                {
                    loading ? <ActivityIndicator size="large"/> : null
                }
                {
                  (!loading && searchResults && searchResults.length === 0) ? 
                  <Text style={styles.notFoundText}>No movies found for this search {'\n'} or {'\n'} Search is empty</Text>
                : (<FlatList
              data={searchResults}
              renderItem={({item})=>(
                <MovieCard movie={item} onShortlistButtonPress={()=> onShortlistButtonPress(item)} style={styles.customMovieCardStyle}/>
              )}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />)
              }
            </View>
    )
}

const styles = StyleSheet.create({
   container:{
    flex: 1, 
    paddingHorizontal: 10, 
    paddingBottom: 20
   },
   textInput: {
    height: 40,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
   },
   button:{
    marginTop: 2,
    marginBottom: 10,
    backgroundColor: 'orange',
    padding: 10,
    alignItems:'center',
    borderRadius: 10,
   },
   submitBtnText:{
    color: '#fff',
    fontSize: 15
   },
   notFoundText:{
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
   },
   customMovieCardStyle:{
    height: 500,
   }
})
export default Home;