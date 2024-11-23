// Main.js
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';

const Main = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [days, setDays] = useState('');

  const handleCheckWeather = async () => {
    if (!city || !days) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(city)}&days=${days}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'ee76f62f53msh455d85e759df19bp1a839djsn17116dc49c4c',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.forecast) {
        // Procesa el pronóstico para enviarlo a la pantalla de resultados
        const processedForecast = data.forecast.forecastday.map(day => ({
          date: day.date,
          condition: day.day.condition.text.toLowerCase(),
          temperature: day.day.avgtemp_c,
          icon: day.day.condition.icon,
        }));

        navigation.navigate('Results', { forecast: processedForecast, city: data.location.name });
      } else {
        Alert.alert('Error', 'No se encontró información para la ciudad ingresada.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al obtener el clima.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    <StatusBar 
        barStyle="light-content" // Cambia el color del texto a claro
        backgroundColor="#000000" // Cambia el fondo de la barra de estado
    />
      <Text style={styles.title}>ConstructAI</Text>
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        placeholderTextColor="#032F30"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Días de pronóstico (1-7)"
        placeholderTextColor="#032F30"
        value={days}
        onChangeText={setDays}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleCheckWeather}>
        <Text style={styles.buttonText}>Ver Pronóstico</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#031716',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6BA3BE',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#032F30',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#0A7075',
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0C969C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#031716',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Main;
