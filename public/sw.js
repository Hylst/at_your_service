// Service Worker pour À Votre Service PWA
// Version: 1.0.0

const CACHE_NAME = 'a-votre-service-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon-butler.ico',
  '/images/majordome-hero.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation en cours...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache ouvert');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Ressources mises en cache');
        // Force l'activation immédiate du nouveau service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Erreur lors de la mise en cache:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activation en cours...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Supprimer les anciens caches
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation terminée');
      // Prendre le contrôle de tous les clients immédiatement
      return self.clients.claim();
    })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  // Stratégie Cache First pour les ressources statiques
  if (event.request.destination === 'image' || 
      event.request.destination === 'script' || 
      event.request.destination === 'style' ||
      event.request.url.includes('/icons/') ||
      event.request.url.includes('/images/')) {
    
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Retourner la ressource du cache si disponible
          if (response) {
            return response;
          }
          
          // Sinon, récupérer depuis le réseau et mettre en cache
          return fetch(event.request).then((response) => {
            // Vérifier si la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cloner la réponse car elle ne peut être consommée qu'une fois
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
        })
        .catch(() => {
          // En cas d'erreur, retourner une réponse par défaut si nécessaire
          console.log('Service Worker: Erreur lors de la récupération de:', event.request.url);
        })
    );
  } else {
    // Stratégie Network First pour les autres requêtes (API, HTML, etc.)
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Mettre en cache les réponses HTML réussies
          if (response.status === 200 && event.request.destination === 'document') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // En cas d'échec réseau, essayer de servir depuis le cache
          return caches.match(event.request)
            .then((response) => {
              if (response) {
                return response;
              }
              // Si pas de cache disponible, retourner la page d'accueil pour les requêtes de navigation
              if (event.request.destination === 'document') {
                return caches.match('/');
              }
            });
        })
    );
  }
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notification de mise à jour disponible
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('Service Worker: Chargé et prêt pour À Votre Service PWA');