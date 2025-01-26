async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'YOUR_API_KEY'; // Замените на ваш API-ключ OpenWeather
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    // Обновляем рекомендации
    const recommendation = getRecommendations(data.weather[0].main, data.main.temp);
    document.getElementById('recommendation').innerText = recommendation;

    // Рисуем график погоды
    drawWeatherChart(data.main.temp, data.main.humidity);
  } catch (error) {
    document.getElementById('recommendation').innerText = 'Error: ' + error.message;
  }
}

function getRecommendations(weather, temp) {
  let advice = `The current weather is ${weather} with a temperature of ${temp}°C. `;
  if (weather.toLowerCase().includes('rain')) {
    advice += 'Take an umbrella!';
  } else if (temp < 5) {
    advice += 'Dress warmly!';
  } else if (temp > 30) {
    advice += 'Stay hydrated and avoid direct sunlight!';
  } else {
    advice += 'Have a great day!';
  }
  return advice;
}

function drawWeatherChart(temp, humidity) {
  const canvas = document.getElementById('weatherCanvas');
  const ctx = canvas.getContext('2d');

  // Очистка холста
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Настройки
  const barWidth = 100;
  const maxHeight = 200;

  // Рисуем температуру
  ctx.fillStyle = 'blue';
  const tempHeight = (temp / 50) * maxHeight; // Нормализация (макс. температура — 50°C)
  ctx.fillRect(100, canvas.height - tempHeight, barWidth, tempHeight);
  ctx.fillText(`Temp: ${temp}°C`, 100, canvas.height - tempHeight - 10);

  // Рисуем влажность
  ctx.fillStyle = 'green';
  const humidityHeight = (humidity / 100) * maxHeight; // Нормализация (макс. влажность — 100%)
  ctx.fillRect(300, canvas.height - humidityHeight, barWidth, humidityHeight);
  ctx.fillText(`Humidity: ${humidity}%`, 300, canvas.height - humidityHeight - 10);
}
