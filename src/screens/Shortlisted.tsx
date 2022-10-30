import { View,Text, FlatList, StyleSheet } from 'react-native';
import MovieCard from '../components/MovieCard';

import {useShortListContext} from '../contexts/shortListedContext';

const NoMovies = ()=> <View style={styles.empty}>
<Text style={styles.emptyText}>No movies shortlisted yet!</Text>
</View>
const ShortListed = ()=>{
  const { movies} = useShortListContext();

  return (
    <View style={styles.container}>
      {
        movies.length === 0 ? <NoMovies /> :
      <FlatList
      data={movies}
      renderItem={({item})=>(
        <MovieCard movie={item}/>
      )}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    paddingHorizontal: 10, 
    paddingBottom: 20,
    marginTop: 20,
   },
   empty:{
    alignItems: 'center',
   },
   emptyText:{
    fontSize: 20,
    fontWeight: 'bold'
   }
});


export default ShortListed;