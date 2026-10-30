const { readDb, writeDb } = require('../dbHelper');

function handleInsuranceRoutes(req, res, body, pathname) {
  const db = readDb();

  if (pathname === '/api/insurance/products' && req.method === 'GET') {
    return { status: 200, data: { success: true, products: db.insurance_products || [] } };
  }

  if (pathname === '/api/insurance/quote' && req.method === 'POST') {
    const { coverageAmount } = body || {};
    const rates = { 50000: 1200, 100000: 1800, 200000: 3000 };
    const premium = rates[coverageAmount] || 3000;
    return {
      status: 200,
      data: {
        success: true,
        coverageAmount: coverageAmount || 200000,
        premiumAmount: premium,
        currency: 'INR'
      }
    };
  }

  if (pathname === '/api/insurance/apply' && req.method === 'POST') {
    const { schemeName, coverageAmount, paymentAmount, utr, paymentMethod, farmerId } = body || {};

    if (!utr || utr.trim().length < 8) {
      return { status: 400, data: { success: false, message: 'Valid UTR transaction number required' } };
    }

    // Check duplicate UTR
    const apps = db.applications || [];
    const duplicate = apps.find(a => a.utr && a.utr.toUpperCase() === utr.trim().toUpperCase());
    if (duplicate) {
      return { status: 409, data: { success: false, message: `UTR ${utr} has already been used for application ${duplicate.referenceNumber}` } };
    }

    const refNo = `AND-INS-${new Date().getFullYear()}-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const polNo = `POL-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newApp = {
      referenceNumber: refNo,
      policyNumber: polNo,
      farmerId: farmerId || 'KRS-FARMER-00291',
      type: 'insurance',
      schemeName: schemeName || 'PMFBY Crop Insurance',
      coverageAmount: coverageAmount || 200000,
      paymentAmount: paymentAmount || '3000',
      utr: utr.trim().toUpperCase(),
      paymentMethod: paymentMethod || 'UPI',
      status: 'Under Review',
      submittedAt: new Date().toISOString()
    };

    if (!db.applications) db.applications = [];
    db.applications.unshift(newApp);
    writeDb(db);

    return {
      status: 201,
      data: {
        success: true,
        message: 'Crop insurance application submitted successfully',
        application: newApp
      }
    };
  }

  return null;
}

module.exports = handleInsuranceRoutes;
