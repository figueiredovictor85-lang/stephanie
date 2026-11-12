import { store,keys,sender } from '../lib/push.mjs';
import { authorized,validateSubscription,hash } from '../lib/core.mjs';
const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export default async function(request){
 try{
  const url=new URL(request.url);const configured=(process.env.STEPHANIE_CODE||'').length>=12;
  if(request.method==='GET'){
   if(!configured)return reply({ready:false,message:'Victor precisa configurar o código de ativação no Netlify.'});
   const k=await keys(store());return reply({ready:true,publicKey:k.publicKey});
  }
  if(request.method!=='POST')return reply({error:'Método não permitido.'},405);
  if(request.headers.get('origin')!==url.origin)return reply({error:'Origem não permitida.'},403);
  if(!configured)return reply({error:'O envio ainda precisa ser configurado por Victor.'},503);
  if(!authorized(request.headers.get('x-activation-code'),process.env.STEPHANIE_CODE))return reply({error:'Confira o código de ativação que Victor te passou.'},401);
  if(!request.headers.get('content-type')?.includes('application/json'))return reply({error:'Formato inválido.'},415);
  const text=await request.text();if(text.length>10000)return reply({error:'Pedido muito grande.'},413);
  let input;try{input=JSON.parse(text)}catch{return reply({error:'Pedido inválido.'},400)}
  let sub;try{sub=validateSubscription(input.subscription)}catch(e){return reply({error:e.message},400)}
  const db=store();const id=hash(sub.endpoint);const key='sub/'+id;
  if(input.action==='subscribe'){
   // Small personal app: cap enrollment at five devices.
   const old=await db.get(key,{type:'json'});
   if(!old){const {blobs}=await db.list({prefix:'sub/'});if(blobs.length>=5)return reply({error:'Limite de 5 aparelhos atingido. Desative os avisos em um aparelho antigo.'},409);}
   await db.setJSON(key,{subscription:sub,createdAt:old?.createdAt||new Date().toISOString()});
   return reply({ok:true});
  }
  if(input.action==='unsubscribe'){await db.delete(key);return reply({ok:true});}
  if(input.action==='status')return reply({active:!!await db.get(key,{type:'json'})});
  if(input.action==='test'){
   if(!await db.get(key,{type:'json'}))return reply({error:'Ative os carinhos neste aparelho primeiro.'},409);
   const testKey='test/'+id;const previous=await db.getWithMetadata(testKey,{type:'json'});
   if(previous&&Date.now()-previous.data.at<60000)return reply({error:'Espere um minutinho antes de testar outra vez.'},429);
   const claim=await db.setJSON(testKey,{at:Date.now()},previous?{onlyIfMatch:previous.etag}:{onlyIfNew:true});
   if(!claim.modified)return reply({error:'Espere um minutinho antes de testar outra vez.'},429);
   try{await(await sender(db,url.origin))(sub,{title:'Oi, bonita! Funcionou ♡',body:'Esse é um carinho de teste. Agora tem um pouquinho de mim no seu dia. — Victor',tag:'stephanie-test',url:'/'});return reply({ok:true});}
   catch(e){if(e.statusCode===404||e.statusCode===410){await db.delete(key);return reply({error:'Esta assinatura expirou. Desative e ative os avisos novamente.'},409);}return reply({error:'O serviço de envio não aceitou o teste agora. Tente novamente mais tarde.'},502);}
  }
  return reply({error:'Ação inválida.'},400);
 }catch{console.error('Push request failed; check Netlify Blobs configuration.');return reply({error:'Não foi possível acessar os lembretes agora. Tente novamente em instantes.'},500);}
}
