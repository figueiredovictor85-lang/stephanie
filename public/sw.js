self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>{
 let payload={};try{payload=event.data?.json()||{}}catch{}
 event.waitUntil(self.registration.showNotification(payload.title||'Um carinho do Victor ♡',{
  body:payload.body||'Tem um carinho esperando por você.',icon:'/assets/icon-192.png',badge:'/assets/icon-192.png',tag:payload.tag||'victor-carinho',data:{url:'/'},renotify:false
 }));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(windows=>{
  const own=windows.find(w=>new URL(w.url).origin===self.location.origin);
  return own?own.focus():self.clients.openWindow('/');
 }));
});
