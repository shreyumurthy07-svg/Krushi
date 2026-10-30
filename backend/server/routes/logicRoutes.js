const { readDb } = require('../dbHelper');

function handleLogisticsRoutes(req, res, body, pathname) {
  const db = readDb();

  if (pathname === '/api/logistics/routes' && req.method === 'GET') {
    return { status: 200, data: { success: true, options: db.logistics || [] } };
  }

  if (pathname === '/api/logistics/book' && req.method === 'POST') {
    const { vehicleId, pickupAddress, destination, weightTons } = body || {};
    const trackingNo = `TRK-LOG-${Math.floor(10000000 + Math.random() * 90000000)}`;

    return {
      status: 200,
      data: {
        success: true,
        message: 'Logistics vehicle booked successfully',
        booking: {
          trackingNumber: trackingNo,
          pickupAddress: pickupAddress || 'Farm Location',
          destination: destination || 'APMC Mandi',
          weightTons: weightTons || 2,
          estimatedCost: '₹1,400',
          status: 'Driver Assigned'
        }
      }
    };
  }

  return null;
}

module.exports = handleLogisticsRoutes;
