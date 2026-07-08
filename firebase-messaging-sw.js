importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ⚠️ REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
firebase.initializeApp({
  apiKey: "AIzaSyCUVZRl_GBzgjE4q3YCCQV4Q85VR2nEsKg",
  authDomain: "sgl-notify.firebaseapp.com",
  projectId: "sgl-notify",
  storageBucket: "sgl-notify.firebasestorage.app",
  messagingSenderId: "525475436682",
  appId: "1:525475436682:web:57f78e3571ee9d87f63573",
  measurementId: "G-MC1J8N2C5H"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
