import axios from 'axios';

export const getWeatherFrom = async (lat, long, cityName) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
  const response = await axios(apiUrl);
  const currentWeather = response.data;
  console.log(currentWeather);
  return (`In ${cityName}, the current temp is ${currentWeather.current_weather.temperature} C`);
};

// export default getWeatherFrom;