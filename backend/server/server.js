const http = require('http');
const url = require('url');

const handleAuthRoutes = require('./routes/authRoutes');
const handleFarmerRoutes = require('./routes/farmerRoutes');
const handleSchemeRoutes = require('./routes/schemeRoutes');
const handleInsuranceRoutes = require('./routes/insuranceRoutes');
const handleEquipmentRoutes = require('./routes/equipmentRoutes');
const handleLogisticsRoutes = require('./routes/logisticsRoutes');
const handleWeatherRoutes = require('./routes/weatherRoutes');

const PORT = process.env.PORT || 5000;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  let bodyData = '';
  req.on('data', chunk => {
    bodyData += chunk.toString();
  });

  req.on('end', () => {
    let body = {};
    if (bodyData) {
      try {
        body = JSON.parse(bodyData);
      } catch (err) {
        body = {};
      }
    }

    // Health check & Info
    if (pathname === '/' || pathname === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'UP',
        service: 'Krushi AgriTech Express API Backend',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: [
          '/api/health',
          '/api/auth/send-otp',
          '/api/auth/verify-otp',
          '/api/farmer/profile',
          '/api/farmer/activities',
          '/api/farmer/agri-score',
          '/api/schemes',
          '/api/schemes/apply',
          '/api/insurance/products',
          '/api/insurance/quote',
          '/api/insurance/apply',
          '/api/equipment',
          '/api/equipment/book',
          '/api/logistics/routes',
          '/api/logistics/book',
          '/api/weather/forecast',
          '/api/market/sell-recommendation'
        ]
      }, null, 2));
      return;
    }

    // Dispatch to routes
    const response = 
      handleAuthRoutes(req, res, body, pathname) ||
      handleFarmerRoutes(req, res, body, pathname) ||
      handleSchemeRoutes(req, res, body, pathname) ||
      handleInsuranceRoutes(req, res, body, pathname) ||
      handleEquipmentRoutes(req, res, body, pathname) ||
      handleLogisticsRoutes(req, res, body, pathname) ||
      handleWeatherRoutes(req, res, body, pathname);

    if (response) {
      res.writeHead(response.status || 200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response.data, null, 2));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Endpoint Not Found', pathname }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🌾 Krushi AgriTech Express API Backend Running!`);
  console.log(`🚀 API Base URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===================================================`);
});
