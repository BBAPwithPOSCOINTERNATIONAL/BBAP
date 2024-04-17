// service-worker.js
// 임시로 작성한 파일

// Cache names
const CACHE_NAME = "bbap-app-pwa-cache";
const urlsToCache = [
	"/",
	"/index.html",
	// Add paths to other static assets you want to cache
];

// Install event
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
	);
});

// Fetch event
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => response || fetch(event.request))
	);
});
