self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("fetch", event => {
    event.respondWith(fetch(event.request));
});

// Listen for incoming push notifications from your server/network
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Exclusive Bonus Unlocked!';
    const options = {
        body: data.body || 'Tap here to claim your daily reward.',
        icon: '/logo.png',
        badge: '/logo.png',
        data: {
            url: data.url || 'https://one-vv5388.com/?open=register&p=7nvx'
        }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Handle what happens when the user taps the push notification
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
