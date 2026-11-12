import { createHash, timingSafeEqual } from 'node:crypto';
export const messages={
  breakfast:'Bom dia, bonita! Já tomou café? ☀️ Te amo. — Victor',
  lunch:'Já almoçou, meu amor? Se cuida por mim. ❤️ — Victor',
  water:'Já bebeu água hoje, bonita? Até flor precisa de água. 💧 — Victor',
  sleep:'Sai do TikTok, bonita, e vai dormir! 💀❤️ Te amo. — Victor'
};
export const schedules={breakfast:'0 10 * * *',lunch:'0 15 * * *',water:'0 18 * * *',sleep:'0 3 * * *'};
export const hash=s=>createHash('sha256').update(s).digest('hex');
export function authorized(actual,expected){return typeof expected==='string'&&expected.length>=12&&typeof actual==='string'&&timingSafeEqual(Buffer.from(hash(actual)),Buffer.from(hash(expected)));}
export function validateSubscription(s){
 if(!s||typeof s.endpoint!=='string'||s.endpoint.length>4096)throw Error('Assinatura inválida.');
 let u;try{u=new URL(s.endpoint)}catch{throw Error('Assinatura inválida.')}
 const h=u.hostname;
 if(u.protocol!=='https:'||u.username||u.password||u.port||u.hash||!(h==='web.push.apple.com'||h.endsWith('.push.apple.com')||h==='fcm.googleapis.com'||h==='updates.push.services.mozilla.com'||h.endsWith('.notify.windows.com')))throw Error('Serviço de notificações não reconhecido.');
 for(const [k,n]of [['auth',16],['p256dh',65]]){const v=s.keys?.[k];if(typeof v!=='string'||!/^[A-Za-z0-9_-]+=*$/.test(v)||Buffer.from(v,'base64url').length!==n)throw Error('Chave de assinatura inválida.');}
 if(Buffer.from(s.keys.p256dh,'base64url')[0]!==4)throw Error('Chave de assinatura inválida.');
 return {endpoint:s.endpoint,expirationTime:null,keys:{auth:s.keys.auth,p256dh:s.keys.p256dh}};
}
export const bahiaDate=(now=new Date())=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bahia',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
export async function deliver({store,send,slot,now=new Date()}){
 if(!messages[slot])throw Error('Unknown schedule');
 const stats={sent:0,expired:0,failed:0,skipped:0};
 for await(const page of store.list({prefix:'sub/',paginate:true})){
  for(const blob of page.blobs){
   const record=await store.get(blob.key,{type:'json'});if(!record)continue;
   // Keep only one small delivery marker per recipient and time slot.
   const claimKey=`delivery/${slot}/${blob.key.slice(4)}`;
   const previous=await store.getWithMetadata(claimKey,{type:'json'});
   if(previous?.data?.day===bahiaDate(now)){stats.skipped++;continue;}
   const claim=await store.setJSON(claimKey,{day:bahiaDate(now),status:'sending'},previous?{onlyIfMatch:previous.etag}:{onlyIfNew:true});
   if(!claim.modified){stats.skipped++;continue;}
   try{await send(record.subscription,{title:'Um carinho do Victor ♡',body:messages[slot],tag:`${slot}-${bahiaDate(now)}`,url:'/'});stats.sent++;}
   catch(e){if(e.statusCode===404||e.statusCode===410){await store.delete(blob.key);stats.expired++;}else{await store.delete(claimKey);stats.failed++;}}
  }
 }
 return stats;
}
