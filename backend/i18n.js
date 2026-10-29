// ===================================================
// Annadāta — i18n Module
// ===================================================

const translations = {
  en: {
    tagline: 'Rooted in Soil.<br/>Powered by Intelligence.',
    taglineDesc: "India's most trusted digital gateway for agricultural finance, advisory, and market intelligence.",
    farmers: 'Farmers',
    disbursed: 'Disbursed',
    states: 'States',
    welcomeBack: 'Welcome Back',
    selectRole: 'Select your role to continue',
    farmer: 'Farmer',
    officer: 'Officer',
    banker: 'Banker',
    mobileNumber: 'Mobile Number',
    enterOtp: 'Enter OTP',
    loginWithOtp: 'Login with OTP',
    newToKrushi: 'New to Annadāta? Register',
    forgotPassword: 'Forgot Password?',
    resendIn: 'Resend OTP in ',
    resend: 'Resend',
    officerIdLabel: 'Officer ID or Mobile Number',
    namaste: 'Namaste',
    yourFarmIsInGoodHands: 'Your farm is in good hands.',
    allowLocation: 'Allow Annadāta to use your location for crops, weather, and mandi prices near you',
    allow: 'Allow Location',
    skip: 'Skip for now',
    todaysWeather: "Today's Weather",
    mandiPrices: 'Live Mandi Prices',
    activityStatus: 'Activity Status',
    agriScore: 'Agri Score',
    govtSchemes: 'Govt Schemes',
    insurance: 'Insurance',
    equipment: 'Equipment',
    workers: 'Workers',
    logistics: 'Logistics',
    weather: 'Weather',
    whenToSell: 'When to Sell',
    profile: 'Profile',
    pending: 'Pending',
    underReview: 'Under Review',
    approved: 'Approved',
    rejected: 'Rejected',
  },
  hi: {
    tagline: 'मिट्टी से जुड़ा।<br/>बुद्धिमत्ता से संचालित।',
    taglineDesc: 'कृषि वित्त, सलाह और बाजार जानकारी के लिए भारत का सबसे विश्वसनीय डिजिटल गेटवे।',
    farmers: 'किसान',
    disbursed: 'वितरित',
    states: 'राज्य',
    welcomeBack: 'स्वागत है',
    selectRole: 'जारी रखने के लिए अपनी भूमिका चुनें',
    farmer: 'किसान',
    officer: 'अधिकारी',
    banker: 'बैंकर',
    mobileNumber: 'मोबाइल नंबर',
    enterOtp: 'OTP दर्ज करें',
    loginWithOtp: 'OTP से लॉगिन करें',
    newToKrushi: 'Annadāta में नए हैं? रजिस्टर करें',
    forgotPassword: 'पासवर्ड भूल गए?',
    resendIn: 'OTP फिर भेजें ',
    resend: 'फिर भेजें',
    officerIdLabel: 'ऑफिसर ID या मोबाइल नंबर',
    namaste: 'नमस्ते',
    yourFarmIsInGoodHands: 'आपका खेत अच्छे हाथों में है।',
    allowLocation: 'Annadāta को अपनी फसलों, मौसम और आपके पास के मंडी मूल्यों के लिए आपका स्थान उपयोग करने दें',
    allow: 'स्थान की अनुमति दें',
    skip: 'अभी छोड़ें',
    todaysWeather: 'आज का मौसम',
    mandiPrices: 'मंडी मूल्य',
    activityStatus: 'गतिविधि स्थिति',
    agriScore: 'कृषि स्कोर',
    govtSchemes: 'सरकारी योजनाएं',
    insurance: 'बीमा',
    equipment: 'उपकरण',
    workers: 'श्रमिक',
    logistics: 'लॉजिस्टिक्स',
    weather: 'मौसम',
    whenToSell: 'बेचने का समय',
    profile: 'प्रोफ़ाइल',
    pending: 'लंबित',
    underReview: 'समीक्षाधीन',
    approved: 'स्वीकृत',
    rejected: 'अस्वीकृत',
  },
  kn: {
    tagline: 'ಮಣ್ಣಿನಲ್ಲಿ ಬೇರೂರಿದ.<br/>ಬುದ್ಧಿಮತ್ತೆಯಿಂದ ಚಾಲಿತ.',
    taglineDesc: 'ಕೃಷಿ ಹಣಕಾಸು, ಸಲಹೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಗಾಗಿ ಭಾರತದ ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ಡಿಜಿಟಲ್ ಗೇಟ್‌ವೇ.',
    farmers: 'ರೈತರು',
    disbursed: 'ವಿತರಿಸಿದ',
    states: 'ರಾಜ್ಯಗಳು',
    welcomeBack: 'ಸ್ವಾಗತ',
    selectRole: 'ಮುಂದುವರೆಯಲು ನಿಮ್ಮ ಪಾತ್ರ ಆಯ್ಕೆಮಾಡಿ',
    farmer: 'ರೈತ',
    officer: 'ಅಧಿಕಾರಿ',
    banker: 'ಬ್ಯಾಂಕರ್',
    mobileNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    enterOtp: 'OTP ನಮೂದಿಸಿ',
    loginWithOtp: 'OTP ಮೂಲಕ ಲಾಗಿನ್',
    newToKrushi: 'Annadāta ಗೆ ಹೊಸಬರೇ? ನೋಂದಾಯಿಸಿ',
    forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?',
    resendIn: 'OTP ಮರಳಿ ಕಳುಹಿಸಿ ',
    resend: 'ಮರಳಿ ಕಳುಹಿಸಿ',
    officerIdLabel: 'ಅಧಿಕಾರಿ ID ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    namaste: 'ನಮಸ್ತೆ',
    yourFarmIsInGoodHands: 'ನಿಮ್ಮ ಜಮೀನು ಒಳ್ಳೆಯ ಕೈಯಲ್ಲಿದೆ.',
    allowLocation: 'ನಿಮ್ಮ ಸಮೀಪದ ಬೆಳೆ, ಹವಾಮಾನ ಮತ್ತು ಮಂಡಿ ಬೆಲೆಗಳಿಗಾಗಿ Annadāta ನಿಮ್ಮ ಸ್ಥಳ ಬಳಸಲು ಅನುಮತಿಸಿ',
    allow: 'ಸ್ಥಾನ ಅನುಮತಿಸಿ',
    skip: 'ಈಗ ಬಿಡಿ',
    todaysWeather: 'ಇಂದಿನ ಹವಾಮಾನ',
    mandiPrices: 'ಮಂಡಿ ಬೆಲೆಗಳು',
    activityStatus: 'ಚಟುವಟಿಕೆ ಸ್ಥಿತಿ',
    agriScore: 'ಕೃಷಿ ಸ್ಕೋರ್',
    govtSchemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    insurance: 'ವಿಮೆ',
    equipment: 'ಉಪಕರಣ',
    workers: 'ಕಾರ್ಮಿಕರು',
    logistics: 'ಲಾಜಿಸ್ಟಿಕ್ಸ್',
    weather: 'ಹವಾಮಾನ',
    whenToSell: 'ಮಾರಾಟ ಮಾಡಲು ಯಾವಾಗ',
    profile: 'ಪ್ರೊಫೈಲ್',
    pending: 'ಬಾಕಿ',
    underReview: 'ಪರಿಶೀಲನೆಯಲ್ಲಿ',
    approved: 'ಅನುಮೋದಿಸಲಾಗಿದೆ',
    rejected: 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ',
  }
};

let currentLang = localStorage.getItem('annadat-lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('annadat-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  applyTranslations();
}

function t(key) {
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text.includes('<br/>')) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  // Set active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  applyTranslations();
});
