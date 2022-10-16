import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import { MovieType } from '../types/movie';

type Props = {
    movie: MovieType;
    onShortlistButtonPress?: ()=> void,
}

const MovieCard = ({movie, onShortlistButtonPress}:Props)=>{
   return (
    <View style={styles.movieCard}>
      <Image source={{uri: movie.Poster}} style={styles.img} resizeMode="cover"/>
      <Text style={styles.title} numberOfLines={2}>{movie.Title}</Text>
      <Text>Year of Release: {movie.Year}</Text>      
      {onShortlistButtonPress 
        && 
        ( 
        <TouchableOpacity onPress={onShortlistButtonPress} style={styles.shortListBtn}>
          <Text style={styles.shortListText}>Add to shortlist</Text>
        </TouchableOpacity>
        )
      }
    </View>
   )
}

export default MovieCard;

const styles = StyleSheet.create({
    movieCard:{
        flex: 1,
        maxHeight: 500,
        borderWidth: 1,
        width: '50%',
        padding: 10,
    },
    title:{
      fontWeight: '400',
      fontSize: 20,
    },
    img:{width: '100%', height: '80%'},
    shortListBtn:{
      marginTop: 5,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'orange',
      padding: 1,
    },
    shortListText:{
      color: 'orange',
    }
})