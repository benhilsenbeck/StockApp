import React, { useState, useEffect } from 'react'
import Tabs from './navigation/tabs'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";
import {  useSelector } from 'react-redux'
import AddStock from './screens/AddStock'

const Stack = createStackNavigator();

const App = () => {

  const isLogged = useSelector(state => state.isLogged)

  if(isLogged === false) {
    return (
      <NavigationContainer>
              <Stack.Navigator
                  screenOptions={{
                      headerShown: false
                  }}
                  initialRouteName={'Login'}
              >
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen name="Home" component={Tabs} />
              </Stack.Navigator>
          </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
              <Stack.Navigator
                  screenOptions={{
                      headerShown: false
                  }}
                  initialRouteName={'Home'}
              >
                  <Stack.Screen name="Home" component={Tabs} />
                  <Stack.Screen name="AddStock" component={AddStock} />
              </Stack.Navigator>
          </NavigationContainer>
    );
  }
  
}

export default App;