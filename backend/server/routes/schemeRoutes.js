const { readDb, writeDb } = require('../dbHelper');

function handleSchemeRoutes(req, res, body, pathname) {
  const db = readDb();

  if (pathname === '/api/schemes' && req.method === 'GET') {
    return { status: 200, data: { success: true, schemes: db.schemes || [] } };
  }

  if (pathname.startsWith('/api/schemes/') && req.method === 'GET') {
    const id = pathname.replace('/api/schemes/', '');
    const scheme = (db.schemes || []).find(s => s.id === id);
    if (!scheme) {
      return { status: 404, data: { success: false, message: 'Scheme not found' } };
    }
    return { status: 200, data: { success: true, scheme } };
  }

  if (pathname === '/api/schemes/apply' && req.method === 'POST') {
    const { schemeId, schemeName, benefitAmount, utr, farmerId } = body || {};
    const refNo = `AND-SCH-${new Date().getFullYear()}-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newApp = {
      referenceNumber: refNo,
      farmerId: farmerId || 'KRS-FARMER-00291',
      type: 'scheme',
      schemeId: schemeId || 'SCH-001',
      schemeName: schemeName || 'Government Scheme',
      benefitAmount: benefitAmount || '6000',
      utr: utr || '—',
      paymentAmount: '0',
      status: 'Submitted',
      submittedAt: new Date().toISOString()
    };

    if (!db.applications) db.applications = [];
    db.applications.unshift(newApp);
    writeDb(db);

    return {
      status: 201,
      data: {
        success: true,
        message: 'Scheme application submitted successfully',
        application: newApp
      }
    };
  }

  return null;
}

module.exports = handleSchemeRoutes;
