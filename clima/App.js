import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/components/main/main'; // Pantalla para ingresar ciudad y días
import Results from './src/components/results/results'; // Pantalla para mostrar los resultados

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false, // Oculta la barra en todas las pantallas
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
