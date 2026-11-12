import { getStore } from '@netlify/blobs';
import webpush from 'web-push';
import { deliver } from './core.mjs';
export const store=()=>getStore({name:'stephanie-private-push-v1',consistency:'strong'});
export async function keys(db){
 let k=await db.get('config/vapid',{type:'json'});
 if(!k){await db.setJSON('config/vapid',webpush.generateVAPIDKeys(),{onlyIfNew:true});k=await db.get('config/vapid',{type:'json'});}
 if(!k)throw Error('Could not initialize push keys');
 return k;
}
export async function sender(db,origin){
 const k=await keys(db);
 return (subscription,payload)=>webpush.sendNotification(subscription,JSON.stringify(payload),{vapidDetails:{subject:origin,publicKey:k.publicKey,privateKey:k.privateKey},TTL:3600,urgency:'normal',timeout:6000});
}
export async function scheduled(slot){
 if(!process.env.STEPHANIE_CODE||process.env.STEPHANIE_CODE.length<12)throw Error('Configure STEPHANIE_CODE in Functions environment.');
 const origin=process.env.URL;if(!origin?.startsWith('https://'))throw Error('Missing Netlify URL');
 const db=store();const send=await sender(db,origin);const result=await deliver({store:db,send,slot});
 console.log(JSON.stringify({slot,...result}));
 return new Response(null,{status:204});
}
