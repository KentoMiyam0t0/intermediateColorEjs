const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // 追加

const app = express();
app.use(bodyParser.json()); // JSON リクエストボディをパース
app.use(express.static('public')); // Use public to directly ex:<link rel="stylesheet" href="/css/style.css">
app.set('views', path.join(__dirname, 'views')); // viewsフォルダのパスを設定
app.set('view engine', 'ejs'); // テンプレートエンジンとしてejsを使用

// Function to interpolate colors
function interpolateColors(color1, color2) {
  // Perform the color interpolation logic here
  // For example, you can use a mathematical formula to calculate the intermediate color value

  // Dummy implementation: Take the average of the RGB values
  const interpolatedR = Math.floor((parseInt(color1.substring(1, 3), 16) + parseInt(color2.substring(1, 3), 16)) / 2);
  const interpolatedG = Math.floor((parseInt(color1.substring(3, 5), 16) + parseInt(color2.substring(3, 5), 16)) / 2);
  const interpolatedB = Math.floor((parseInt(color1.substring(5, 7), 16) + parseInt(color2.substring(5, 7), 16)) / 2);
  
  return "#" + interpolatedR.toString(16) + interpolatedG.toString(16) + interpolatedB.toString(16);
}

app.post('/interpolate', (req, res) => {
  const color1 = req.body.color1;
  const color2 = req.body.color2;
  const interpolatedColor = interpolateColors(color1, color2);
  const response = { color: interpolatedColor };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response));
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);
