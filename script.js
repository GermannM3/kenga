<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather Forecast</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }
    canvas {
      border: 1px solid #000;
      margin-top: 20px;
    }
    input, button {
      padding: 10px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>Weather Forecast and Recommendations</h1>
  <p>Enter a city name to get the weather forecast and recommendations:</p>
  <input type="text" id="cityInput" placeholder="Enter city name">
  <button onclick="getWeather()">Get Forecast</button>
  <p id="recommendation"></p>
  <canvas id="weatherCanvas" width="500" height="300"></canvas>

  <script>
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
      const tempHeight = (temp / 50) * maxHeight; // Нормализация (макс 50°C)
      ctx.fillRect(100, canvas.height - tempHeight, barWidth, tempHeight);
      ctx.fillText(`Temp: ${temp}°C`, 100, canvas.height - tempHeight - 10);

      // Рисуем влажность
      ctx.fillStyle = 'green';
      const humidityHeight = (humidity / 100) * maxHeight; // Нормализация (макс 100%)
      ctx.fillRect(300, canvas.height - humidityHeight, barWidth, humidityHeight);
      ctx.fillText(`Humidity: ${humidity}%`, 300, canvas.height - humidityHeight - 10);
    }
  </script>
</body>
</html>
