const { readDb } = require('../dbHelper');

function handleWeatherRoutes(req, res, body, pathname) {
  const db = readDb();

  if (pathname === '/api/weather/forecast' && req.method === 'GET') {
    return { status: 200, data: { success: true, weather: db.weather || {} } };
  }

  if (pathname === '/api/market/sell-recommendation' && req.method === 'GET') {
    return { status: 200, data: { success: true, market: db.market || {} } };
  }

  return null;
}

module.exports = handleWeatherRoutes;
