// Network first for the app page (updates arrive on the next open), cache as offline fallback.
const C="dawa-v21";const FILES=["./","./index.html","./privacy.html","./manifest.webmanifest","./icon.svg","./voice/en-f-after.mp3","./voice/en-f-before.mp3","./voice/en-f-empty.mp3","./voice/en-f-none.mp3","./voice/en-f-sleep.mp3","./voice/en-f-with.mp3","./voice/en-m-after.mp3","./voice/en-m-before.mp3","./voice/en-m-none.mp3","./voice/en-m-sleep.mp3","./voice/en-m-with.mp3","./voice/f-after.mp3","./voice/f-before.mp3","./voice/f-empty.mp3","./voice/f-none.mp3","./voice/f-sleep.mp3","./voice/f-with.mp3","./voice/m-after.mp3","./voice/m-before.mp3","./voice/m-empty.mp3","./voice/m-none.mp3","./voice/m-sleep.mp3","./voice/m-with.mp3"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET")return;
  const url=new URL(r.url);
  if(url.origin!==location.origin){ e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res;}).catch(()=>h))); return; }
  e.respondWith(fetch(r,{cache:"no-cache"}).then(res=>{ if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));} return res; })
    .catch(()=>caches.match(r).then(h=>h||caches.match("./index.html"))));
});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{for(const c of l){if("focus" in c)return c.focus();}return self.clients.openWindow("./index.html");}));});
