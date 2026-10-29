// ===================================================
// KRUSHI — Dashboard JavaScript
// ===================================================

function navigateTo(page) {
  // Page transition
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.2s ease';
  setTimeout(() => { window.location.href = page; }, 180);
}

function toggleTheme() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? '' : 'dark');
  localStorage.setItem('krushi-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeToggle').textContent = isDark ? '🌙' : '☀️';
}

function toggleNotifications() {
  showToast('3 new notifications', 'info');
}

function allowLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        closeLocationModal();
        updateLocation('Pune, Maharashtra');
      },
      () => {
        closeLocationModal();
        updateLocation('Pune, Maharashtra');
      }
    );
  } else {
    closeLocationModal();
  }
}

function skipLocation() {
  closeLocationModal();
  updateLocation('Pune, Maharashtra');
}

function closeLocationModal() {
  const modal = document.getElementById('locationModal');
  if (modal) {
    modal.style.animation = 'fadeIn 0.2s ease reverse';
    setTimeout(() => modal.classList.add('hidden'), 200);
  }
}

function updateLocation(loc) {
  const el = document.getElementById('locationText');
  if (el) el.textContent = loc;
  const chipEl = document.getElementById('locationChip');
  if (chipEl) chipEl.style.background = '#dcfce7';
}

function openActivityDetail(id) {
  const modal = document.getElementById('activityModal');
  const body = document.getElementById('activityModalBody');
  if (!modal || !body) return;

  const details = {
    'kcc-loan': {
      title: 'KCC Loan Application',
      icon: '💰',
      status: 'approved',
      statusText: 'Approved',
      amount: '₹2,00,000',
      bank: 'State Bank of India, Pune Branch',
      steps: [
        { label: 'Application Submitted', done: true, time: '5 days ago' },
        { label: 'Document Verification', done: true, time: '4 days ago' },
        { label: 'Field Inspection', done: true, time: '3 days ago' },
        { label: 'Loan Approved', done: true, time: '2 hours ago' },
        { label: 'Disbursement Pending', done: false, time: 'Expected: 2 days' },
      ]
    },
    'pmfby': {
      title: 'PMFBY Crop Insurance',
      icon: '🛡️',
      status: 'review',
      statusText: 'Under Review',
      amount: '₹50,000 coverage',
      bank: 'AIC of India',
      steps: [
        { label: 'Application Submitted', done: true, time: '1 day ago' },
        { label: 'Awaiting Officer Review', done: false, time: 'In progress' },
        { label: 'Premium Calculation', done: false, time: 'Pending' },
        { label: 'Policy Activation', done: false, time: 'Pending' },
      ]
    },
    'pm-kisan': {
      title: 'PM-Kisan Scheme',
      icon: '🏛️',
      status: 'pending',
      statusText: 'Pending',
      amount: '₹2,000',
      bank: 'Direct Benefit Transfer',
      steps: [
        { label: 'Eligibility Verified', done: true, time: '3 days ago' },
        { label: 'Awaiting Disbursement', done: false, time: 'Expected: 7 days' },
      ]
    },
    'image-verify': {
      title: 'Field Verification',
      icon: '📸',
      status: 'approved',
      statusText: 'Completed',
      amount: '3 images uploaded',
      bank: 'Agriculture Officer: Suresh Kumar',
      steps: [
        { label: 'Site Visit Completed', done: true, time: '5 days ago' },
        { label: 'Images Verified', done: true, time: '5 days ago' },
        { label: 'Report Submitted', done: true, time: '5 days ago' },
      ]
    }
  };

  const detail = details[id] || details['kcc-loan'];
  const statusColors = {
    approved: '#dcfce7', review: '#dbeafe', pending: '#fef3c7', rejected: '#fee2e2'
  };
  const statusText = {
    approved: '#15803d', review: '#1e40af', pending: '#92400e', rejected: '#991b1b'
  };

  body.innerHTML = `
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:40px;margin-bottom:8px">${detail.icon}</div>
      <h3 style="font-size:18px;font-weight:700;color:var(--text-primary);margin-bottom:6px">${detail.title}</h3>
      <span style="display:inline-block;padding:4px 12px;background:${statusColors[detail.status]};color:${statusText[detail.status]};border-radius:999px;font-size:12px;font-weight:700">${detail.statusText}</span>
    </div>
    <div style="background:var(--bg-secondary);border-radius:12px;padding:16px;margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px">
        <span style="color:var(--text-muted)">Amount</span>
        <span style="font-weight:700;color:var(--text-primary)">${detail.amount}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:14px">
        <span style="color:var(--text-muted)">Institution</span>
        <span style="font-weight:600;color:var(--text-primary);text-align:right;max-width:200px">${detail.bank}</span>
      </div>
    </div>
    <h4 style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px">Progress</h4>
    <div class="modal-timeline">
      ${detail.steps.map(step => `
        <div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0;border-bottom:1px solid var(--border-color)">
          <div style="width:20px;height:20px;border-radius:50%;background:${step.done ? '#22c55e' : '#e5e7eb'};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:11px;color:white;font-weight:700">
            ${step.done ? '✓' : ''}
          </div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:${step.done ? '600' : '400'};color:${step.done ? 'var(--text-primary)' : 'var(--text-muted)'}">${step.label}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${step.time}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeActivityDetail() {
  const modal = document.getElementById('activityModal');
  if (modal) modal.classList.add('hidden');
}

// Toast
function showToast(message, type = 'info') {
  const existing = document.querySelector('.krushi-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'krushi-toast';
  const bg = type === 'success' ? '#f0fdf4' : type === 'error' ? '#fef2f2' : '#f0f9ff';
  const color = type === 'success' ? '#166534' : type === 'error' ? '#991b1b' : '#075985';
  const border = type === 'success' ? '#bbf7d0' : type === 'error' ? '#fecaca' : '#bae6fd';
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:10px;padding:14px 20px;border-radius:12px;font-size:14px;font-weight:500;box-shadow:0 10px 30px rgba(0,0,0,0.15);animation:slideUp 0.3s ease-out;white-space:nowrap;background:${bg};color:${color};border:1px solid ${border};font-family:inherit`;
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const savedTheme = localStorage.getItem('krushi-theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    document.getElementById('themeToggle').textContent = '☀️';
  }

  // Set current date
  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Show location modal after short delay
  setTimeout(() => {
    const modal = document.getElementById('locationModal');
    if (modal && !localStorage.getItem('krushi-location-set')) {
      modal.classList.remove('hidden');
    } else {
      updateLocation('Pune, Maharashtra');
    }
  }, 800);

  // Simulate WebSocket status updates
  setInterval(() => {
    const wsEl = document.getElementById('wsStatus');
    if (wsEl) {
      const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      wsEl.innerHTML = `● Live · Updated ${time}`;
    }
  }, 30000);

  // Staggered card entrance
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
  });

  // Entry animation
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '1';
  });

  // Close modal on overlay click
  document.getElementById('activityModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeActivityDetail();
  });
});
