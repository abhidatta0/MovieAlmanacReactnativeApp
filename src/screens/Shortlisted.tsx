import { View,Text, FlatList, StyleSheet } from 'react-native';
import MovieCard from '../components/MovieCard';

import {useShortListContext} from '../contexts/shortListedContext';

const ShortListed = ()=>{
  const { movies} = useShortListContext();
  
  if(movies.length === 0){
    <View>
      <Text>Mo movies shortlisted yet!</Text>
    </View>
  }
  return (
    <View>
      <FlatList
      data={movies}
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
  flatList:{marginVertical: 20, paddingBottom: 50 }
});


export default ShortListed;