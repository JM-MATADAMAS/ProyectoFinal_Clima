// Results.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, StatusBar } from 'react-native';

// Definición de las tareas y sus condiciones ideales
const tasks = [
  {
    name: "Excavación y preparación del terreno",
    ideal: { weather: ["sunny"], minTemp: null, maxTemp: null },
    risks: ["lluvias intensas"],
    precautions: ["Instalar sistemas de drenaje temporal", "Prever paros en caso de mal tiempo"],
  },
  {
    name: "Colado de cimentación y estructuras de concreto",
    ideal: { weather: ["sunny"], minTemp: 10, maxTemp: 30 },
    risks: ["frío extremo", "calor extremo"],
    precautions: ["Usar aditivos acelerantes y cubrir con mantas térmicas en frío", "Agregar retardantes, regar con agua superficialmente y trabajar temprano en calor"],
  },
  {
    name: "Estructura metálica o montaje de vigas",
    ideal: { weather: ["sunny"], minTemp: null, maxTemp: null },
    risks: ["viento fuerte", "lluvias"],
    precautions: ["Usar maquinaria especializada", "Asegurar las piezas temporalmente durante su colocación"],
  },
  {
    name: "Albañilería y acabados (muros, techos, revestimientos)",
    ideal: { weather: ["sunny", "partly cloudy", "overcast"], minTemp: null, maxTemp: null },
    risks: ["lluvias", "humedad extrema"],
    precautions: ["Usar lonas para proteger las áreas de trabajo", "Asegurar una ventilación adecuada"],
  },
  {
    name: "Impermeabilización",
    ideal: { weather: ["sunny"], minTemp: null, maxTemp: null },
    risks: ["humedad"],
    precautions: ["Planificar la aplicación en temporadas secas"],
  },
  {
    name: "Instalaciones eléctricas, hidráulicas y sanitarias",
    ideal: { weather: ["sunny"], minTemp: null, maxTemp: null },
    risks: ["lluvias", "humedad elevada"],
    precautions: ["Garantizar el aislamiento adecuado", "Cubrir las instalaciones en progreso"],
  },
  {
    name: "Jardinería y paisajismo",
    ideal: { weather: ["patchy rain nearby", "moderate rain"], minTemp: null, maxTemp: null },
    risks: ["sequía extrema", "lluvias intensas"],
    precautions: ["Preparar sistemas de riego temporales o definitivos", "Evitar erosión del terreno"],
  },
];

// Función para evaluar si las tareas son óptimas según el clima
const evaluateTasks = (forecast) => {
  return tasks.map(task => {
    let isOptimal = true;

    // Evaluar condiciones de clima ideal
    if (task.ideal.weather && Array.isArray(task.ideal.weather)) {
      const matchesWeather = task.ideal.weather.some(condition => 
        forecast.condition.toLowerCase().includes(condition.toLowerCase())
      );
      if (!matchesWeather) {
        isOptimal = false;
      }
    }

    // Evaluar temperatura si aplica
    if (task.ideal.minTemp !== null && forecast.temperature < task.ideal.minTemp) {
      isOptimal = false;
    }
    if (task.ideal.maxTemp !== null && forecast.temperature > task.ideal.maxTemp) {
      isOptimal = false;
    }

    return {
      ...task,
      isOptimal,
    };
  });
};


const Results = ({ route, navigation }) => {
  const { forecast, city } = route.params; // Pronóstico y ciudad enviados desde Main

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content" // Cambia el color del texto a claro
        backgroundColor="#000000" // Cambia el fondo de la barra de estado
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Pronóstico del Clima para {city}</Text>
        {forecast.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.date}>{day.date}</Text>
            <Image source={{ uri: day.icon }} style={styles.icon} />
            <Text style={styles.condition}>{capitalizeFirstLetter(day.condition)}</Text>
            <Text style={styles.temperature}>Temperatura: {day.temperature}°C</Text>
            <View style={styles.tasksContainer}>
              <Text style={styles.tasksTitle}>Evaluación de Tareas:</Text>
              {evaluateTasks(day).map((task, idx) => (
                <View key={idx} style={styles.task}>
                  <Text style={styles.taskName}>{task.name}</Text>
                  <Text style={[styles.taskStatus, { color: task.isOptimal ? 'green' : 'red' }]}>
                    {task.isOptimal ? 'Óptimo' : 'No Óptimo'}
                  </Text>
                  {!task.isOptimal && (
                    <Text style={styles.taskPrecautions}>
                      Precauciones: {task.precautions.join(", ")}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Función para capitalizar la primera letra de una cadena
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#031716',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6BA3BE',
    marginBottom: 20,
    textAlign: 'center',
  },
  dayContainer: {
    backgroundColor: '#0A7075',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  condition: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  temperature: {
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  tasksContainer: {
    marginTop: 10,
  },
  tasksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6BA3BE',
    marginBottom: 10,
  },
  task: {
    marginBottom: 10,
  },
  taskName: {
    fontSize: 14,
    color: '#fff',
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskPrecautions: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#0C969C',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#031716',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Results;
