const $=s=>document.querySelector(s);let saved;try{saved=JSON.parse(localStorage.getItem('steph-saved')||'[]');if(!Array.isArray(saved))saved=[]}catch{saved=[]}const notes=[
'Já bebeu água hoje, bonita? Até flor precisa de água. 🌷',
'Nem preciso te ver pra saber que está linda. Mesmo de manhã cedo. 💀',
'Você sabe bem o quanto eu a amo. Mas eu vou continuar lembrando.',
'Se o dia estiver pesado, divide comigo. Não precisa carregar tudo sozinha.',
'Você é meu pensamento favorito no meio de qualquer dia.',
'Passando pra avisar que o cargo de amor da minha vida continua sendo seu.',
'Você fica linda sorrindo. Mas não precisa sorrir o tempo todo pra ser amada.',
'Queria te mandar um abraço por aqui. Por enquanto, aceita esse bilhetinho?',
'Entre tanta coisa no mundo, eu ainda escolheria sentar do seu lado.',
'Seu jeitinho mora nos detalhes mais bonitos dos meus dias.',
'Eu tenho orgulho de você. Inclusive nos dias em que você só conseguiu tentar.',
'Pode ficar tranquila: hoje eu também sou completamente apaixonado por você.',
'Com você, até fazer nada vira um programão.',
'Isso aqui é um aplicativo ou mais uma desculpa minha pra dizer que te amo?',
'Você não precisa dar conta de tudo pra merecer um carinho.',
'Seu cabelo bagunçado e sua carinha de sono também estão na lista das coisas que eu amo.',
'Se saudade virasse notificação, seu celular não ia ter paz.',
'Comunicado oficial: você está proibida de esquecer o quanto é especial.',
'Eu amo você nas manhãs bonitas e nos dias que pedem colo.',
'Não pula o almoço, viu? Tem um namorado aqui que quer você bem.',
'Você merece uma vida bonita. E eu quero estar nela, cuidando dos detalhes.',
'Quando tudo parecer corrido, lembra: meu carinho não tem pressa.',
'Sua risada devia vir com aviso: pode melhorar o dia de alguém.',
'Boa noite, meu amor. O TikTok vai continuar existindo amanhã. Seu soninho agradece.'];
const reasons=[
'Eu tenho alguém que me ama, e esse é meu motivo para não desistir.',
'Eu tenho uma irmãzinha linda, e esse é meu motivo para não desistir.',
'A minha mãe é minha rainha, e esse é meu motivo para não desistir.',
'Eu tenho o melhor pai do mundo, e esse é meu motivo para não desistir.',
'Victor, lindo e maravilhoso, me ama, e esse é meu motivo para não desistir.',
'A minha história ainda tem capítulos lindos que eu não conheço.',
'Eu mereço descobrir como a vida pode ficar mais leve.',
'Um dia difícil não decide o valor da minha vida.',
'Eu posso descansar e recomeçar quantas vezes precisar.',
'Existem sonhos meus que ainda merecem uma chance.',
'Eu já atravessei dias que achei que não conseguiria.',
'Eu não preciso ter todas as respostas para dar o próximo passo.',
'Eu sou mais do que uma fase difícil.',
'Eu tenho valor mesmo quando não consigo produzir nada.',
'Eu posso pedir ajuda. Ser cuidada também é uma forma de coragem.',
'Ainda existem abraços que eu vou querer demorar para soltar.',
'Eu mereço viver momentos que me façam rir sem perceber.',
'Eu posso ir devagar. Devagar também é caminho.',
'O que hoje parece impossível pode mudar com tempo e apoio.',
'Eu não preciso me comparar para reconhecer o meu progresso.',
'Ainda existem lugares que eu quero conhecer e comidas que eu quero provar.',
'Eu tenho o direito de mudar de rota sem abandonar a mim mesma.',
'O meu futuro não precisa repetir os meus dias mais difíceis.',
'Eu mereço o mesmo carinho que ofereço a quem eu amo.',
'Pequenas alegrias também são motivos grandes o suficiente.',
'Eu posso florescer no meu tempo, sem competir com ninguém.',
'A minha presença faz diferença, mesmo quando eu não percebo.',
'Eu ainda vou olhar para trás com carinho pela menina que continuou.',
'Eu posso construir uma vida que tenha mais a ver comigo.',
'Eu sou um motivo suficiente para cuidar de mim.'];
const verses=[
['O Senhor é o meu pastor; nada me faltará.','Salmos 23:1'],
['Tudo posso naquele que me fortalece.','Filipenses 4:13'],
['O meu socorro vem do Senhor, que fez o céu e a terra.','Salmos 121:2'],
['O choro pode durar uma noite, mas a alegria vem pela manhã.','Salmos 30:5'],
['Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.','Salmos 37:5'],
['Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.','Salmos 46:1'],
['O Senhor está perto dos que têm o coração quebrantado.','Salmos 34:18 · trecho'],
['Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.','1 Pedro 5:7'],
['Nós o amamos a ele porque ele nos amou primeiro.','1 João 4:19'],
['Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.','Romanos 12:12'],
['O Senhor te abençoe e te guarde.','Números 6:24'],
['O Senhor é bom, uma fortaleza no dia da angústia.','Naum 1:7 · trecho'],
['Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.','Isaías 41:10 · trecho'],
['Aquietai-vos e sabei que eu sou Deus.','Salmos 46:10 · trecho'],
['Bem-aventurados os que choram, porque eles serão consolados.','Mateus 5:4'],
['Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.','Mateus 11:28'],
['Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.','Provérbios 3:5'],
['Mas os que esperam no Senhor renovarão as suas forças.','Isaías 40:31 · trecho'],
['O amor é sofredor, é benigno.','1 Coríntios 13:4 · trecho'],
['Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele.','Salmos 118:24'],
['Há tempo de chorar e tempo de rir; tempo de prantear e tempo de saltar de alegria.','Eclesiastes 3:4'],
['As misericórdias do Senhor são a causa de não sermos consumidos.','Lamentações 3:22 · trecho'],
['Porque andamos por fé e não por vista.','2 Coríntios 5:7'],
['Se Deus é por nós, quem será contra nós?','Romanos 8:31 · trecho']];
const data=[...notes.map((text,i)=>({id:'n'+i,text,label:'com amor, Victor',type:'bilhetes'})),...reasons.map((text,i)=>({id:'r'+i,text,label:'um motivo para continuar',type:'motivos'})),...verses.map(([text,label],i)=>({id:'v'+i,text,label,type:'versiculos'}))];
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateKey=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bahia',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const dailyIndex=()=>Math.floor(Date.parse(dateKey()+'T12:00:00Z')/86400000);
const saveButton=id=>`<button class="save ${saved.includes(id)?'saved':''}" data-save="${id}" aria-label="${saved.includes(id)?'Remover dos':'Adicionar aos'} guardadinhos" aria-pressed="${saved.includes(id)}">${saved.includes(id)?'♥':'♡'}</button>`;
function card(item){return `<article class="quote reveal"><span style="font-size:20px;color:#aa4868">${item.type==='versiculos'?'✧':'♡'}</span><blockquote>${esc(item.text)}</blockquote><div class="quote-bottom"><span>${esc(item.label)}</span>${saveButton(item.id)}</div></article>`}
function render(){let page=location.hash.slice(1)||'inicio';if(!['inicio','bilhetes','versiculos','motivos','favoritos'].includes(page))page='inicio';document.querySelectorAll('nav a,.mobile-nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+page));const today=data[dailyIndex()%notes.length];if(page==='inicio'){$('#app').innerHTML=`<section class="hero reveal"><div><div class="eyebrow">um lugar só seu, bonita</div><h1>O mundo fica<br>mais bonito com<br><em>você, Stephanie.</em></h1><p class="intro">Um cantinho pra te lembrar do que nunca muda:<br>você é amada. Nos dias de sol e nos outros também.</p><a class="primary" href="#bilhetes">Abre um carinho meu <span>↗</span></a></div><div class="art"><div class="orbit"></div><span class="spark a">✧</span><span class="spark b">✧</span><img class="mainflower" src="assets/flor.png" alt="Sua florzinha roxa com um coração rosa"><span class="tag one">oi, meu amor ♡</span><span class="tag two">ainda bem que é você.</span><span class="tinyheart">♡</span></div></section><section class="name-band reveal"><div class="label">STEPHANIE<br>um nome que carrega uma coroa</div><div class="meaning"><b>coroada.</b><span>✧</span><b>vitoriosa.</b><span>✧</span><b>amada.</b></div></section><p class="fine" style="text-align:center;margin:13px 0">Do grego stéphanos: coroa. Vitoriosa na sua caminhada. Amada por mim.</p><div class="section-title"><h2>Um carinho para cada momento.</h2><p>Escolhe o que seu coração precisa hoje.</p></div><section class="cards"><a class="card green" href="#versiculos"><span class="card-symbol">✧</span><span class="arrow">↗</span><h3>Versículo do dia</h3><p>Uma palavra de fé para acalmar o coração e iluminar o caminho.</p></a><a class="card pink" href="#motivos"><span class="card-symbol">♡</span><span class="arrow">↗</span><h3>Motivos para não desistir</h3><p>Quando esquecer da sua força, vem aqui. Eu te lembro.</p></a><a class="card yellow" href="#bilhetes"><span class="card-symbol">✉</span><span class="arrow">↗</span><h3>Bilhetinhos do Victor</h3><p>Um tantinho de amor, saudade e meu jeitinho de cuidar de você.</p></a></section><section class="daily"><span class="heart">♡</span><div><small>DEIXEI ISSO AQUI PRA VOCÊ</small><p>${esc(today.text)}</p><small>COM AMOR, VICTOR</small></div>${saveButton(today.id)}</section><div class="hug"><span style="font-size:29px">☁</span><h2>O dia pediu um colo?</h2><p>Não precisa explicar nada agora.<br>Tem um abraço meu esperando por você.</p><button class="secondary" id="hug">Preciso de um abraço ♡</button></div>`}else{const titles={bilhetes:['Bilhetinhos do Victor','Se eu pudesse, deixava um desses no seu bolso todos os dias.'],motivos:['Motivos para não desistir','Um lembrete por vez. Um passo por vez. No seu tempo.'],versiculos:['Versículo do dia','Que a fé encontre um lugar tranquilo no seu coração.'],favoritos:['Seus guardadinhos','Os carinhos que você quis manter por perto. Salvos neste aparelho.']};const [title,sub]=titles[page];let items=data.filter(x=>page==='favoritos'?saved.includes(x.id):x.type===page);let featured='';if(page==='versiculos'){const v=items[dailyIndex()%items.length];featured=`<div class="daily"><span class="heart">✧</span><div><small>A PALAVRA DE HOJE</small><p>${esc(v.text)}</p><small>${esc(v.label)}</small></div>${saveButton(v.id)}</div>`}$('#app').innerHTML=`<div class="page-head reveal"><div class="eyebrow">feito especialmente para você</div><h1>${title}</h1><p>${sub}</p></div>${featured}<div class="toolbar"><a class="secondary" href="#inicio">← Seu cantinho</a>${page!=='favoritos'?'<button class="primary" id="surprise">Me surpreenda ✧</button>':''}</div><div class="quote-grid">${items.length?items.map(card).join(''):'<div class="empty"><p>Ainda está vazio por aqui. Toque no ♡ de um bilhete ou versículo para guardar.</p><a class="secondary" href="#bilhetes">Encontrar um carinho</a></div>'}</div>${page==='versiculos'?'<p class="fine" style="text-align:center">Seleção de versículos e trechos em linguagem tradicional de João Ferreira de Almeida.</p>':''}`;$('#surprise')?.addEventListener('click',()=>{showModal(`<div class="eyebrow">esse aqui encontrou você</div>${card(items[Math.floor(Math.random()*items.length)])}`)})}$('#hug')?.addEventListener('click',()=>{showModal('<div style="text-align:center"><img src="assets/flor.png" style="width:100px;animation:sway 4s infinite" alt="Florzinha"><h2>Vem cá, meu amor.</h2><p>Solta os ombros. Respira devagar, sem pressa.<br>Você não precisa resolver a vida inteira hoje.</p><p>Se quiser conversar, me chama. Se quiser silêncio, eu fico também. Você merece cuidado em qualquer dia.</p><p>Um abraço bem demorado,<br><b>do seu Victor. ♡</b></p></div>');burst()})}
function showModal(html){$('#modalbody').innerHTML=html;$('#modal').showModal()}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3000)}
function burst(){for(let i=0;i<15;i++){const el=document.createElement('span');el.className='confetti';el.textContent=['♡','✧','✿'][i%3];el.style.color=['#f26d9e','#88bf8b','#b39254'][i%3];el.style.setProperty('--x',(Math.random()-.5)*450+'px');el.style.setProperty('--y',-50-Math.random()*300+'px');document.body.append(el);setTimeout(()=>el.remove(),1500)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-save]');if(!b)return;const id=b.dataset.save;saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];try{localStorage.setItem('steph-saved',JSON.stringify(saved))}catch{toast('Não foi possível salvar neste navegador.');return}document.querySelectorAll(`[data-save="${id}"]`).forEach(btn=>{btn.classList.toggle('saved',saved.includes(id));btn.textContent=saved.includes(id)?'♥':'♡';btn.setAttribute('aria-pressed',saved.includes(id));btn.setAttribute('aria-label',saved.includes(id)?'Remover dos guardadinhos':'Adicionar aos guardadinhos')});toast(saved.includes(id)?'Guardadinho com carinho ♡':'Retirado dos guardadinhos');if(location.hash==='#favoritos')render()});
$('.close').onclick=()=>$('#modal').close();$('#modal').addEventListener('click',e=>{if(e.target===$('#modal'))$('#modal').close()});window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'})});
const reminders=[['07:00','Bom dia, bonita! Já tomou café? ☀'],['12:00','Já almoçou, meu amor? Se cuida por mim. ♡'],['15:00','Já bebeu água hoje, bonita? 💧'],['00:00','Sai do TikTok, bonita. Vai dormir! Te amo. 🌙']];let enabled=false;try{enabled=localStorage.getItem('steph-reminders')==='true'}catch{}
$('#bell').innerHTML='<svg width="20" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M9 21h6M12 0v2"/></svg><span class="dot"></span>';

render();setTimeout(()=>{$('#splash').style.opacity='0';setTimeout(()=>$('#splash').remove(),650)},1400);
