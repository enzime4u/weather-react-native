import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Weather from './components/weather.js'


const KEY = '8689804a0e1af5a86eb6f007dfd13838'

// not make a component that has all the state


const fetchWeather = (lat, lon) => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`)
    .then(response => response.json())
  }


const useWeather = () => {
    const [ weather, setWeather ] = React.useState({})
    const [ isLoading, setIsLoading ] = React.useState(true)
    const [ error, setError ] = React.useState(null)

    React.useEffect(() => (
        navigator.geolocation.getCurrentPosition(
            position => {
                fetchWeather(position.coords.latitude, position.coords.longitude)
                .then(data => {
                    setWeather({
                      temperature: data.main.temp,
                      weatherCondition: data.weather[0].main,
                      location: data.name,
                      humidity: data.main.humidity
                    })
                    setIsLoading(false)
                  })
            }, 
            error => {
                setError(error)
        })
    ),[true]) // pass a second argument to the useEffect fn
    return ({
        weather,
        isLoading,
        error
    })
}

  const weather = useWeather.weather
  const isLoading = useWeather.isLoading

const App = () => {
    const { isLoading, weather, error } = useWeather()
    const { weatherCondition, temperature, location, humidity } = weather
    return (
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Fetching Your Weather</Text> 
            </View>
            ) : (
              <Weather weather={weatherCondition} temperature={temperature} location={location} humidity={humidity} />
          )}
        </View>
      );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFDE4'
    },
    loadingText: {
      fontSize: 30
    }
  });


  export default App