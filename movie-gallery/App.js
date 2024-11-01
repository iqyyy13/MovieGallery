import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './screens/HomeScreen'
import MovieScreen from './screens/MovieScreen'
import PersonScreen from './screens/PersonScreen'
import FavouritesScreen from './screens/FavouritesScreen'
import VideoScreen from './screens/VideoScreen'
import SearchScreen from './screens/SearchScreen'
import SeeAllScreen from './screens/SeeAllScreen'
import ReviewScreen from './screens/ReviewScreen'
import SeeAllReviews from './screens/SeeAllReviews'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const HomeStack = () => {
  return(
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, orientation:'portrait'}}/>
        <Stack.Screen name="Movie" component={MovieScreen} options={{headerShown: false, gestureEnabled: false, orientation:'portrait'}}/>
        <Stack.Screen name="Person" component={PersonScreen} options={{headerShown: false, gestureEnabled: false, orientation:'portrait'}}/>
        <Stack.Screen name="Video" component={VideoScreen} options={{headerShown: false, gestureEnabled: false, orientation:'landscape'}}/> 
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false, gestureEnabled: false, orientation:'portrait'}}/> 
        <Stack.Screen name="SeeAll" component={SeeAllScreen} options={{headerShown: false, gestureEnabled: false, orientation:'portrait'}}/>  
        <Stack.Screen name="Review" component={ReviewScreen} options={{headerShown: false, gestureEnabled: false, orientation:'portrait'}}/>
        <Stack.Screen name="SeeAllReviews" component={SeeAllReviews} options={{headerShown: false, gestureEnabled: false, orientation:'portrait'}}/>
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        drawerStyle:{
          backgroundColor: 'rgb(115 115 115)',  
          width: 240
        },
        drawerActiveTintColor: 'yellow',
        drawerInactiveTintColor: 'white'
      }}>
        <Drawer.Screen name="Home" component={HomeStack} options={{headerShown: false, drawerType: 'front', swipeEnabled: false}}/>
        <Drawer.Screen name="Lists" component={FavouritesScreen} options={{headerShown: false, orientation:'portrait'}} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App
