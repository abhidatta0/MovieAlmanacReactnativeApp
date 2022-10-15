import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MovieType } from '../types/movie';

type Props = {
    movie: MovieType;
}

const MovieCard = ({movie}:Props)=>{
   return (
    <View style={styles.movieCard}>
      <Image source={{uri: movie.Poster}} style={styles.img} resizeMode="cover"/>
      <Text>{movie.Title}</Text>
      <Text>Year of Release: {movie.Year}
      <TouchableOpacity>
        <Ionicons name={'bookmark-outline'} color={'red'} size={15}/>
      </TouchableOpacity>
      </Text>
    </View>
   )
}

export default MovieCard;

const styles = StyleSheet.create({
    movieCard:{
        flex: 1,
        height: 300,
        borderWidth: 1,
        width: '50%',
        padding: 10,
    },
    img:{width: '80%', height: '80%'},
})