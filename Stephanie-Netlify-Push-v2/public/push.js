/* Native Web Push: subscriptions and recurring sends are handled by Netlify. */
(()=>{
 const api='/.netlify/functions/push-api';let config=null,registration=null,subscription=null;
 const supported=()=>isSecureContext&&'serviceWorker'in navigator&&'PushManager'in window&&'Notification'in window;
 const ios=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const regPromise=supported()?navigator.serviceWorker.register('/sw.js').then(async reg=>{await Promise.race([navigator.serviceWorker.ready,new Promise((_,reject)=>setTimeout(()=>reject(Error('Reabra o aplicativo e tente novamente.')),12000))]);registration=reg;return reg}).catch(()=>null):Promise.resolve(null);
 function code(){return document.querySelector('#activation-code')?.value.trim()||''}
 function status(message){const el=document.querySelector('#push-status');if(el)el.textContent=message;}
 function base64(value){const raw=atob(value.replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from(raw,c=>c.charCodeAt(0));}
 async function call(action,sub){
  if(!sub)throw Error('Ative os lembretes neste aparelho primeiro.');
  const response=await fetch(api,{method:'POST',headers:{'Content-Type':'application/json','X-Activation-Code':code()},body:JSON.stringify({action,subscription:sub.toJSON()}),signal:AbortSignal.timeout(15000)});
  let data;try{data=await response.json()}catch{throw Error('O envio ainda não está publicado. Victor precisa publicar as funções do Netlify.')}
  if(!response.ok)throw Error(data.error||'Não foi possível concluir agora.');return data;
 }
 function busy(value){document.querySelectorAll('#push-enable,#push-disable,#push-test').forEach(b=>b.disabled=value);}
 function showButtons(){document.querySelector('#push-disable').hidden=!subscription;document.querySelector('#push-test').hidden=!subscription;}
 function explain(e){if(e.name==='NotAllowedError')return 'As notificações não foram autorizadas. Você pode permitir nos Ajustes do iPhone → Notificações → Meu cantinho.';if(e.name==='TimeoutError'||e.name==='AbortError')return 'A conexão demorou. Confira a internet e tente novamente.';return e.message||'Não foi possível ativar agora.';}
 document.querySelector('#bell').onclick=async()=>{
  showModal(`<style>#push-controls[hidden],#push-controls button[hidden]{display:none}</style><div class="eyebrow">meu jeito de cuidar</div><h2>Meu carinho te encontra.</h2><p>Mesmo quando este cantinho estiver fechado. Quatro lembretes diários, no horário da Bahia.</p>${reminders.map(([time,text])=>`<div class="schedule"><b>${time}</b><span>${text}</span></div>`).join('')}<div id="push-controls"><label for="activation-code" style="display:block;margin-top:22px;font-size:13px">Seu código de carinho</label><input id="activation-code" type="password" autocomplete="off" placeholder="O código que Victor te passou" style="width:100%;padding:14px;margin:8px 0;border:1px solid #c9cbb8;border-radius:12px;background:#faf8ef;font:inherit"><div class="modal-actions"><button class="primary" id="push-enable" disabled>Ativar meus carinhos ♡</button><button class="secondary" id="push-test" hidden>Receber um carinho de teste</button><button class="secondary" id="push-disable" hidden>Desativar neste aparelho</button></div></div><p id="push-status" role="status" aria-live="polite">Preparando seus lembretes…</p><p class="fine">Você escolhe se quer receber e pode desativar a qualquer momento. Os avisos precisam de internet; o modo Foco e os ajustes do iPhone podem silenciá-los.</p>`);
  subscription=null;
  const enable=document.querySelector('#push-enable');
  if(ios()&&!standalone()){document.querySelector('#push-controls').hidden=true;status('Primeiro abra este link no Safari → Compartilhar → Adicionar à Tela de Início. Depois abra pelo ícone da flor e toque no sino. Requer iOS 16.4 ou mais recente.');return;}
  if(!supported()){document.querySelector('#push-controls').hidden=true;status('Este navegador não oferece notificações push. No iPhone, atualize o iOS e abra o app pela Tela de Início.');return;}
  try{
   const response=await fetch(api,{cache:'no-store',signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error('Victor precisa publicar esta versão com as funções do Netlify.');
   try{config=await response.json()}catch{throw Error('As funções de envio ainda não estão publicadas no Netlify.')}
   if(!config.ready){status(config.message||'O envio ainda não está configurado.');return;}
   registration=await regPromise;if(!registration)throw Error('Não foi possível preparar o app. Feche e abra pelo ícone da flor.');
   subscription=await registration.pushManager.getSubscription();showButtons();
   if(subscription)status('Este aparelho tem uma assinatura. Digite seu código e toque em Ativar para confirmar o agendamento, ou envie um teste.');
   else status('Digite seu código, toque em Ativar e permita as notificações.');
   enable.disabled=false;
  }catch(e){status(explain(e));return;}
  enable.onclick=async()=>{
   if(code().length<12){status('Digite o código de carinho completo que Victor te passou.');return;}
   busy(true);
   try{
    // Request permission directly from the user gesture, before a network call.
    const permission=await Notification.requestPermission();if(permission!=='granted')throw Object.assign(Error(),{name:'NotAllowedError'});
    subscription=await registration.pushManager.getSubscription();
    if(subscription){const current=new Uint8Array(subscription.options.applicationServerKey||[]);const desired=base64(config.publicKey);if(current.length!==desired.length||current.some((v,i)=>v!==desired[i])){await subscription.unsubscribe();subscription=null;}}
    subscription=subscription||await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:base64(config.publicKey)});
    if(!subscription)throw Error('O iPhone não criou a assinatura. Feche e reabra pelo ícone da Tela de Início e tente novamente.');
    await call('subscribe',subscription);showButtons();status('Pronto, bonita! Os quatro lembretes estão agendados no servidor. Pode fechar o app. ♡');burst();
   }catch(e){status(explain(e));}finally{busy(false);showButtons();}
  };
  document.querySelector('#push-test').onclick=async()=>{busy(true);try{await call('test',subscription);status('O serviço aceitou o carinho de teste! Confira a Central de Notificações. Se não aparecer, revise o modo Foco e os Ajustes.');}catch(e){status(explain(e));}finally{busy(false)}};
  document.querySelector('#push-disable').onclick=async()=>{busy(true);try{await call('unsubscribe',subscription);await subscription.unsubscribe();subscription=null;showButtons();status('Lembretes desativados neste aparelho. Seu cantinho continua aqui. ♡');}catch(e){status(explain(e));}finally{busy(false)}};
 };
})();
