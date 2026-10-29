/**
 * Annadāta — Location Module
 * Handles geolocation and reverse geocoding via Nominatim
 */

const LOCATION_KEY = 'annadat-location';

/**
 * Request browser geolocation
 */
async function requestLocation() {
  if (!navigator.geolocation) {
    showToast('Geolocation is not supported by your browser', 'error');
    setManualLocation();
    return;
  }

  showToast('📍 Accessing location...', 'info');

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const data = await reverseGeocode(latitude, longitude);
        saveLocation({
          lat: latitude,
          lng: longitude,
          district: data.address.state_district || data.address.city || data.address.county || 'Unknown',
          state: data.address.state || 'Unknown',
          pincode: data.address.postcode || ''
        });
        
        // Show success and move to dashboard
        const modal = document.getElementById('locationModal');
        if (modal) {
          modal.innerHTML = `
            <div class="loc-modal-card">
              <div class="loc-icon-bubble">✅</div>
              <h2 class="loc-title">Location Set Successfully</h2>
              <p class="loc-desc">📍 Set to ${getStoredLocation().district}, ${getStoredLocation().state}</p>
              <button class="btn-primary" onclick="proceedToDashboard()">Go to Dashboard</button>
            </div>
          `;
        }
      } catch (err) {
        console.error('Reverse geocoding failed', err);
        showToast('Location identified but details unavailable. Setting manually.', 'warning');
        setManualLocation();
      }
    },
    (error) => {
      console.error('Geolocation error', error);
      showToast('Location access denied. Please set manually.', 'warning');
      setManualLocation();
    }
  );
}

/**
 * Reverse geocode using Nominatim (OpenStreetMap)
 */
async function reverseGeocode(lat, lng) {
  // Nominatim requires an User-Agent or email
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`, {
    headers: { 'Accept-Language': 'en' }
  });
  if (!response.ok) throw new Error('Geocoding service unavailable');
  return await response.json();
}

/**
 * Show manual location picker
 */
function setManualLocation() {
  const modal = document.getElementById('locationModal');
  if (!modal) return;
  
  modal.innerHTML = `
    <div class="loc-modal-card">
      <div class="loc-icon-bubble">🏙️</div>
      <h2 class="loc-title">Select Your Location</h2>
      <div class="form-group" style="margin-top:20px; text-align:left">
        <label class="form-label">State</label>
        <select class="form-input form-select" id="manualState" onchange="updateDistricts()">
          <option value="">Select State</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
        </select>
      </div>
      <div class="form-group" style="text-align:left">
        <label class="form-label">District</label>
        <select class="form-input form-select" id="manualDistrict">
          <option value="">Select District</option>
        </select>
      </div>
      <button class="btn-primary" onclick="saveManualLocation()">Save & Continue</button>
    </div>
  `;
}

function updateDistricts() {
  const state = document.getElementById('manualState').value;
  const dist = document.getElementById('manualDistrict');
  dist.innerHTML = '<option value="">Select District</option>';
  
  const data = {
    'Karnataka': ['Raichur', 'Gulbarga', 'Bellary', 'Bagalkot', 'Belgaum'],
    'Maharashtra': ['Pune', 'Nashik', 'Nagpur', 'Ahmednagar', 'Solapur'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut']
  };
  
  if (data[state]) {
    data[state].forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      dist.appendChild(opt);
    });
  }
}

function saveManualLocation() {
  const state = document.getElementById('manualState').value;
  const district = document.getElementById('manualDistrict').value;
  
  if (!state || !district) {
    showToast('Please select both state and district', 'warning');
    return;
  }
  
  saveLocation({ state, district, lat: 0, lng: 0 });
  proceedToDashboard();
}

/**
 * Store location data
 */
function saveLocation(data) {
  localStorage.setItem(LOCATION_KEY, JSON.stringify(data));
}

/**
 * Get stored location data
 */
function getStoredLocation() {
  const loc = localStorage.getItem(LOCATION_KEY);
  return loc ? JSON.parse(loc) : null;
}

/**
 * Final navigation
 */
function proceedToDashboard() {
  const role = localStorage.getItem('krushi-role') || 'farmer';
  window.location.href = `${role}-dashboard.html`;
}

/**
 * Helper: Toast
 */
function showToast(msg, type = 'info') {
  const t = document.createElement('div');
  const bg = type === 'error' ? '#fee2e2' : type === 'warning' ? '#fef3c7' : '#f0fdf4';
  const col = type === 'error' ? '#991b1b' : type === 'warning' ? '#92400e' : '#166534';
  t.style.cssText = `position:fixed;bottom:30px;left:50%;transform:translateX(-50%);z-index:10000;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;box-shadow:0 8px 20px rgba(0,0,0,0.1);background:${bg};color:${col};animation:slideUp 0.3s forwards;font-family:sans-serif`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(),300); }, 3000);
}
