import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/Home';
import ShortListedScreen from './src/screens/Shortlisted';

export type RootStackParamList = {
  Home: undefined;
  ShortListed: undefined;
}

const Tab  = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route})=>({
        tabBarIcon:({focused, color})=>{
          let iconName;
          if(route.name === 'Home'){
            iconName = "home";
          }
          else{
            iconName = "bookmarks-outline";
          }
          return <BottomIcon name={iconName} color={color}/>
        },
        tabBarActiveTintColor: 'tomato', 
        tabBarInactiveTintColor:'gray'})}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="ShortListed" component={ShortListedScreen} options={{ tabBarBadge: 3 }}/>
      </Tab.Navigator>  
    </NavigationContainer>
  );
};

export default App;

type BottomIconType = {
  name: string;
  color: string;
}
const BottomIcon = ({name, color}:BottomIconType)=> <Ionicons name={name} color={color} size={25}/>;