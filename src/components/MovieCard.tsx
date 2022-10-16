import {View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle} from 'react-native';

import { MovieType } from '../types/movie';

type Props = {
    movie: MovieType;
    onShortlistButtonPress?: ()=> void,
    style?: ViewStyle,
}

const MovieCard = ({movie, onShortlistButtonPress, style}:Props)=>{
   return (
    <View style={[styles.movieCard, style]}>
      {movie.Poster && <Image source={{uri: movie.Poster}} style={styles.img} resizeMode="cover"/>}
      <View style={{flex: 1}}>
        <Text style={styles.title} numberOfLines={3}>{movie.Title}</Text>
      </View>
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
        height: 400,
        width: '49%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFF4EC',
        borderWidth: 1,
        borderRadius: 6,
    },
    title:{
      fontWeight: '400',
      fontSize: 20,
      flexShrink: 0,
      color: 'black',
    },
    img:{width: '100%', height: '70%'},
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