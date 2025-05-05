importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyC3QK4NgpQgC77tL5JFhk_ctGoxfUIMkfI",
  authDomain: "test-b5a4e.firebaseapp.com",
  projectId: "test-b5a4e",
  storageBucket: "test-b5a4e.firebasestorage.app",
  messagingSenderId: "32499677931",
  appId: "1:32499677931:web:b61963d806911509955cae",
  measurementId: "G-BVRGL3LJJ0"
};

// Инициализация Firebase в сервисном воркере
const app = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging(app);

const onBackgroundMessage = (payload) => {
  // Настройка уведомления
  const notificationTitle = payload.notification?.title || 'Новое сообщение';
  const notificationOptions = {
    body: payload.notification?.body || 'У вас новое уведомление',
    icon: payload.notification?.icon || '/icons/icon-192x192.png',
    data: payload.data // Передаем дополнительные данные
  };

  // Показываем уведомление
  return self.registration.showNotification(notificationTitle, notificationOptions);
};

// Подписываемся на фоновые сообщения
firebase.messaging().onBackgroundMessage(onBackgroundMessage);

// Обработчик push-событий (для совместимости)
self.addEventListener('push', (event) => {
  if (event.data) {
    const payload = event.data.json();
    onBackgroundMessage(payload);
  }
});