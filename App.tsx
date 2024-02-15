/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './mvc/view/Home';
import SignIn from './mvc/view/SignIn';
import SignUp from './mvc/view/SignUp';
import List from './mvc/view/List';
import Historique from './mvc/view/Historique';
import { auth } from './mvc/controller/Firebase';

enableScreens();

type RootStackParamList = {
  Home: any;
  SignIn: any;
  SignUp: any;
  List: any;
  Hist: any;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  // Créez un état pour savoir si l'utilisateur est connecté ou non
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    // Vérifiez si l'utilisateur est connecté
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {

        console.log("User is authenticated");

        // Si l'utilisateur est connecté, mettez à jour l'état
        setIsAuthenticated(true);
      } else {
        console.log("User is not authenticated");

        // Si l'utilisateur n'est pas connecté, mettez à jour l'état
        setIsAuthenticated(false);
      }
    });
    return unsubscribe;

  }), [];


  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            {isAuthenticated ? (
              // Utilisation d'un fragment pour regrouper les éléments conditionnels
              <>
                <Stack.Screen name="Hist" component={Historique} />
                <Stack.Screen name="List" component={List} />
              </>
            ) : (
              // Le fragment n'est pas nécessaire ici car il n'y a qu'un seul élément, mais il est utilisé pour la cohérence
              <>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}



export default App;