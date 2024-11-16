import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Main = () => {
  const [city, setCity] = useState('');
  const [days, setDays] = useState('');

  const handleCheckWeather = async () => {
    if (!city || !days) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=${days}`;
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
        const forecast = data.forecast.forecastday.map((day) => {
          return `Fecha: ${day.date}, Condición: ${day.day.condition.text}`;
        }).join('\n');
        Alert.alert('Pronóstico del Clima', forecast);
      } else {
        Alert.alert('Error', 'No se encontró información para la ciudad ingresada.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al obtener el clima.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultar Clima</Text>
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        placeholderTextColor="#6BA3BE" // Aplica el color del placeholder
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Días de pronóstico (1-7)"
        placeholderTextColor="#6BA3BE" // Aplica el color del placeholder
        value={days}
        onChangeText={setDays}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleCheckWeather}>
        <Text style={styles.buttonText}>Ver Pronóstico</Text>
      </TouchableOpacity>
    </View>
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
    color: '#ffff', // Cambia el color del texto
  },
  inputPlaceholder: {
    color: '#6BA3BE', // Cambia el color del placeholder
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
