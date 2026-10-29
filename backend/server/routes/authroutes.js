const { readDb } = require('../dbHelper');

function handleAuthRoutes(req, res, body, pathname) {
  if (pathname === '/api/auth/send-otp' && req.method === 'POST') {
    const { mobile, role } = body || {};
    if (!mobile || mobile.length !== 10) {
      return { status: 400, data: { success: false, message: 'Valid 10-digit mobile number required' } };
    }
    return {
      status: 200,
      data: {
        success: true,
        message: `OTP sent successfully to +91 ${mobile.substring(0, 5)}XXXXX`,
        mobile,
        role: role || 'farmer',
        expiresInSeconds: 60
      }
    };
  }

  if (pathname === '/api/auth/verify-otp' && req.method === 'POST') {
    const { mobile, otp, role } = body || {};
    if (!otp || otp.length !== 6) {
      return { status: 400, data: { success: false, message: '6-digit OTP required' } };
    }

    const db = readDb();
    const farmer = (db.farmers || [])[0] || {};

    return {
      status: 200,
      data: {
        success: true,
        message: 'OTP verified successfully',
        token: `session-token-${Date.now()}`,
        role: role || 'farmer',
        farmer
      }
    };
  }

  return null;
}

module.exports = handleAuthRoutes;
