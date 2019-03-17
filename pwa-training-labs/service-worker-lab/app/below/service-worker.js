self.addEventListener('install', (e)=>{
  console.log('service worker installing', e)
  self.skipWaiting();
})

self.addEventListener('activate', (event) => {
  console.log('SW activate', event)
})

self.addEventListener('fetch', e => {
  console.log('fetching', e.request);
})