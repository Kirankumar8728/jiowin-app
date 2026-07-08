importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ==========================================
// 1. FIREBASE PUSH NOTIFICATION SETUP
// ==========================================
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

// ==========================================
// 2. OFFLINE CACHING SETUP 
// ==========================================
const CACHE_NAME = 'jiowin-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png'
];

// Install the service worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return cached version if found
        }
        return fetch(event.request); // Otherwise fetch from network
      })
  );
});
