const { readDb, writeDb } = require('../dbHelper');

function handleEquipmentRoutes(req, res, body, pathname) {
  const db = readDb();

  if (pathname === '/api/equipment' && req.method === 'GET') {
    return { status: 200, data: { success: true, equipment: db.equipment || [] } };
  }

  if (pathname === '/api/equipment/book' && req.method === 'POST') {
    const { equipmentId, startDate, hoursNeeded } = body || {};
    const equipment = (db.equipment || []).find(e => e.id === equipmentId);

    const bookingRef = `BOOK-EQ-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      status: 200,
      data: {
        success: true,
        message: 'Equipment rental request confirmed',
        booking: {
          bookingRef,
          equipment: equipment ? equipment.title : 'Machinery',
          startDate: startDate || new Date().toISOString().split('T')[0],
          hoursNeeded: hoursNeeded || 4,
          status: 'Confirmed'
        }
      }
    };
  }

  return null;
}

module.exports = handleEquipmentRoutes;
