// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('scrollTop')?.classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

// ===== SCROLL TO TOP =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== PLANS TOGGLE =====
function switchPlans(type) {
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
  document.getElementById('planos-residencial')?.classList.toggle('hidden', type !== 'residencial');
  document.getElementById('planos-empresarial')?.classList.toggle('hidden', type !== 'empresarial');
}

// ===== CEP MASK =====
function maskCEP(input) {
  let v = input.value.replace(/\D/g, '');
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
  input.value = v;
}

// ===== COVERAGE CHECK =====
// CEPs de Paracatu-MG: faixa 38600-000 a 38699-999 (prefixo "386")
function checkCoverage() {
  const input = document.getElementById('cepInput');
  const cep = input?.value.replace(/\D/g, '');

  if (!cep || cep.length < 8) {
    showCoverageResult('error', '⚠️ Por favor, insira um CEP válido com 8 dígitos.');
    return;
  }

  const resultEl = document.getElementById('coverageResult');
  if (resultEl) { resultEl.className = 'coverage-result'; resultEl.style.display = 'none'; }

  setTimeout(() => {
    const isParacatu = cep.slice(0, 3) === '386';
    if (isParacatu) {
      const msg = `
        <span style="font-size:18px">✅</span>
        <span><strong>Ótima notícia!</strong> A Fast Telekom atende o CEP <strong>${input.value}</strong> em Paracatu-MG!</span>
        <a href="https://wa.me/5538998595421?text=Ol%C3%A1!%20Verifiquei%20meu%20CEP%20${encodeURIComponent(input.value)}%20e%20gostaria%20de%20contratar%20a%20Fast%20Telekom%20em%20Paracatu-MG.%20Pode%20me%20ajudar%3F"
           target="_blank" class="btn btn-primary btn-sm" style="margin-left:8px;margin-top:8px">
          📱 Contratar agora
        </a>`;
      showCoverageResult('success', msg, true);
    } else {
      showCoverageResult('error',
        '😔 No momento atendemos <strong>somente Paracatu-MG</strong> (CEPs 38600 a 38699). Seu CEP está fora da nossa área de cobertura.', true);
    }
  }, 600);
}

function showCoverageResult(type, content, isHTML = false) {
  const result = document.getElementById('coverageResult');
  if (!result) return;
  result.className = 'coverage-result ' + type;
  if (isHTML) result.innerHTML = content;
  else result.textContent = content;
  result.style.display = 'flex';
  result.style.alignItems = 'center';
  result.style.flexWrap = 'wrap';
  result.style.gap = '6px';
}

// ===== FAQ TOGGLE =====
function toggleFAQ(button) {
  const item = button.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== FAQ FILTER =====
function filterFAQ(category) {
  document.querySelectorAll('.faq-cat').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const items = document.querySelectorAll('.faq-item');
  let visible = 0;
  items.forEach(item => {
    const match = category === 'todos' || item.dataset.category === category;
    item.style.display = match ? 'block' : 'none';
    if (match) visible++;
  });

  const notFound = document.getElementById('faqNotFound');
  if (notFound) notFound.style.display = visible === 0 ? 'block' : 'none';
}

// ===== CONTACT FORM =====
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Enviar Solicitação';
    btn.disabled = false;
    e.target.reset();
    if (success) success.style.display = 'block';
    setTimeout(() => { if (success) success.style.display = 'none'; }, 6000);
  }, 1500);
}

// ===== SELF SERVICE =====
const selfServiceContent = {
  reiniciar: {
    title: '🔄 Reiniciar Roteador',
    body: `<p>Para reiniciar seu roteador remotamente:</p>
    <ol>
      <li>Desligue o roteador da tomada.</li>
      <li>Aguarde 30 segundos.</li>
      <li>Ligue novamente e aguarde 2 minutos para reconexão.</li>
    </ol>
    <p>Se o problema persistir após o reinício, entre em contato com o suporte.</p>`
  },
  senha: {
    title: '🔑 Recuperar Senha Wi-Fi',
    body: `<p>Para encontrar sua senha Wi-Fi:</p>
    <ol>
      <li>Acesse <strong>192.168.1.1</strong> pelo navegador.</li>
      <li>Login: <strong>admin</strong> / Senha: na etiqueta do roteador.</li>
      <li>Acesse "Wi-Fi" → "Segurança" para ver ou alterar a senha.</li>
    </ol>
    <p>Ou ligue <strong>(38) 9 9859-5421</strong> para assistência remota.</p>`
  },
  velocidade: {
    title: '📊 Testar Velocidade',
    body: `<p>Para um teste preciso:</p>
    <ol>
      <li>Conecte seu computador via <strong>cabo de rede</strong> ao roteador.</li>
      <li>Feche outros programas e abas.</li>
      <li>Acesse <a href="https://fast.com" target="_blank" style="color:#84FF00">fast.com</a> ou <a href="https://speedtest.net" target="_blank" style="color:#84FF00">speedtest.net</a>.</li>
      <li>Compare o resultado com seu plano contratado.</li>
    </ol>
    <p>Velocidade abaixo de 80% do contratado? Abra um chamado!</p>`
  },
  boleto: {
    title: '📄 Segunda Via de Boleto',
    body: `<p>Obtenha sua segunda via agora:</p>
    <ul>
      <li>Acesse a <strong><a href="https://fasttelekom.sgp.tsmx.com.br/accounts/central/login" target="_blank" style="color:#84FF00">Central do Cliente</a></strong> online.</li>
      <li>Ou envie seu CPF pelo WhatsApp: <strong><a href="https://wa.me/5538998595421?text=Oi!%20Preciso%20da%202%C2%AA%20via%20do%20boleto" target="_blank" style="color:#84FF00">(38) 9 9859-5421</a></strong>.</li>
    </ul>`
  },
  protocolo: {
    title: '🔍 Consultar Protocolo',
    body: `<p>Consulte seus chamados na Central do Cliente:</p>
    <ul>
      <li><a href="https://fasttelekom.sgp.tsmx.com.br/accounts/central/login" target="_blank" style="color:#84FF00"><strong>Acessar Central do Cliente</strong></a></li>
      <li>Ou pelo WhatsApp: <a href="https://wa.me/5538998595421" target="_blank" style="color:#84FF00"><strong>(38) 9 9859-5421</strong></a></li>
    </ul>`
  },
  chamado: {
    title: '🛠️ Abrir Chamado Técnico',
    body: `
    <p style="color:var(--text-muted);margin-bottom:20px">Escolha como prefere abrir seu chamado:</p>
    <div style="display:flex;flex-direction:column;gap:12px">
      <a href="https://fasttelekom.sgp.tsmx.com.br/accounts/central/login" target="_blank"
         style="display:flex;align-items:center;gap:14px;background:rgba(92,184,0,0.1);border:1px solid rgba(132,255,0,0.3);border-radius:12px;padding:16px 20px;text-decoration:none;color:var(--text);transition:all .2s"
         onmouseover="this.style.background='rgba(92,184,0,0.2)'" onmouseout="this.style.background='rgba(92,184,0,0.1)'">
        <span style="font-size:28px">🖥️</span>
        <div>
          <strong style="display:block;color:#fff;font-size:15px">Central do Cliente</strong>
          <span style="font-size:12px;color:var(--text-muted)">Abrir chamado online — rápido e fácil</span>
        </div>
        <span style="margin-left:auto;color:#84FF00;font-size:18px">→</span>
      </a>
      <a href="https://wa.me/5538998595421?text=Ol%C3%A1!%20Preciso%20abrir%20um%20chamado%20t%C3%A9cnico.%20Podem%20me%20ajudar%3F" target="_blank"
         style="display:flex;align-items:center;gap:14px;background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.3);border-radius:12px;padding:16px 20px;text-decoration:none;color:var(--text);transition:all .2s"
         onmouseover="this.style.background='rgba(37,211,102,0.18)'" onmouseout="this.style.background='rgba(37,211,102,0.08)'">
        <span style="font-size:28px">📱</span>
        <div>
          <strong style="display:block;color:#fff;font-size:15px">WhatsApp</strong>
          <span style="font-size:12px;color:var(--text-muted)">(38) 9 9859-5421 — atendimento rápido</span>
        </div>
        <span style="margin-left:auto;color:#25d366;font-size:18px">→</span>
      </a>
    </div>
    <p style="font-size:12px;color:var(--text-dim);margin-top:16px">💡 Descreva o problema: sem internet, lentidão, Wi-Fi instável, etc.</p>`
  }
};

function selfService(type) {
  const content = selfServiceContent[type];
  if (!content) return;
  showModal(content.title, content.body);
}

// ===== MODAL =====
function showModal(title, bodyHTML) {
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      <h3>${title}</h3>
      <div class="modal-body">${bodyHTML}</div>
      <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">Entendido</button>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ===== CHAT =====
let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  const box = document.getElementById('chatBox');
  const badge = document.getElementById('chatBadge');
  box?.classList.toggle('open', chatOpen);
  if (chatOpen && badge) badge.style.display = 'none';
}

function openChat() {
  if (!chatOpen) toggleChat();
  document.getElementById('chatInput')?.focus();
}

const WA = 'https://wa.me/5538998595421';
const CENTRAL = 'https://fasttelekom.sgp.tsmx.com.br/accounts/central/login';

const botReplies = {
  '100': `🌐 <strong>Plano 100 Mbps — R$ 79,00/mês</strong><br>
Inclui: fibra óptica, 📺 aplicativo de TV, Wi-Fi e instalação grátis!<br><br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20contratar%20o%20plano%20100%20Mbps%20-%20R%2479%2C00" target="_blank" style="color:#84FF00;font-weight:700">Contratar agora pelo WhatsApp</a>`,

  '300': `🚀 <strong>Plano 300 Mbps — R$ 89,90/mês</strong><br>
O mais popular! Inclui: fibra, 📺 app de TV, Wi-Fi e instalação grátis!<br><br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20contratar%20o%20plano%20300%20Mbps%20-%20R%2489%2C90" target="_blank" style="color:#84FF00;font-weight:700">Contratar agora pelo WhatsApp</a>`,

  '500': `⚡ <strong>Plano 500 Mbps — R$ 109,90/mês</strong><br>
Ideal para home office e streaming. Inclui: fibra, 📺 app de TV, Wi-Fi e instalação grátis!<br><br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20contratar%20o%20plano%20500%20Mbps%20-%20R%24109%2C90" target="_blank" style="color:#84FF00;font-weight:700">Contratar agora pelo WhatsApp</a>`,

  'giga': `🏆 <strong>Plano Giga 1 Gbps — R$ 159,00/mês</strong><br>
Máxima velocidade! Inclui: fibra, 📺 app de TV, Wi-Fi e instalação grátis!<br><br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20contratar%20o%20plano%20Giga%201Gbps%20-%20R%24159%2C00" target="_blank" style="color:#84FF00;font-weight:700">Contratar agora pelo WhatsApp</a>`,

  'plano': `📦 <strong>Nossos Planos em Paracatu:</strong><br><br>
• 100 Mbps → <strong>R$ 79,00/mês</strong><br>
• 300 Mbps → <strong>R$ 89,90/mês</strong><br>
• 500 Mbps → <strong>R$ 109,90/mês</strong><br>
• 1 Gbps → <strong>R$ 159,00/mês</strong><br><br>
📺 Todos incluem app de TV + Wi-Fi + instalação grátis!<br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20os%20planos" target="_blank" style="color:#84FF00;font-weight:700">Falar com vendas no WhatsApp</a>`,

  'preco': `💰 <strong>Preços dos nossos planos:</strong><br><br>
• 100 Mbps → <strong>R$ 79,00/mês</strong><br>
• 300 Mbps → <strong>R$ 89,90/mês</strong><br>
• 500 Mbps → <strong>R$ 109,90/mês</strong><br>
• 1 Gbps → <strong>R$ 159,00/mês</strong><br><br>
Todos incluem 📺 app de TV, Wi-Fi e instalação grátis!<br>
👉 <a href="${WA}" target="_blank" style="color:#84FF00;font-weight:700">Contratar pelo WhatsApp</a>`,

  'tv': `📺 <strong>Aplicativo de TV incluso em todos os planos!</strong><br>
Com a Fast Telekom você tem acesso ao app de TV sem custo adicional, disponível em qualquer plano a partir de R$ 79,00/mês.<br><br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20app%20de%20TV" target="_blank" style="color:#84FF00;font-weight:700">Saber mais pelo WhatsApp</a>`,

  'contratar': `🎉 Ótimo! Vamos te conectar!<br><br>
Nossos planos em Paracatu:<br>
• 100 Mbps → R$ 79,00/mês<br>
• 300 Mbps → R$ 89,90/mês<br>
• 500 Mbps → R$ 109,90/mês<br>
• 1 Gbps → R$ 159,00/mês<br><br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20contratar%20internet%20Fast%20Telekom" target="_blank" style="color:#84FF00;font-weight:700">Falar com nossa equipe agora</a>`,

  'suporte': `🔧 <strong>Suporte Técnico Fast Telekom</strong><br><br>
• Central do Cliente: <a href="${CENTRAL}" target="_blank" style="color:#84FF00">Abrir chamado online</a><br>
• WhatsApp: <a href="${WA}" target="_blank" style="color:#84FF00">(38) 9 9859-5421</a><br>
• Ligue: <a href="tel:38998595421" style="color:#84FF00">(38) 9 9859-5421</a><br><br>
Me conta o problema que te ajudo!`,

  'lento': `😕 Internet lenta? Tente estes passos:<br><br>
1. Desligue o roteador da tomada por 30 segundos<br>
2. Ligue novamente e aguarde 2 minutos<br>
3. Teste a velocidade em <a href="https://fast.com" target="_blank" style="color:#84FF00">fast.com</a><br><br>
Ainda lento? Abra um chamado:<br>
👉 <a href="${CENTRAL}" target="_blank" style="color:#84FF00;font-weight:700">Central do Cliente</a> ou <a href="${WA}?text=Ol%C3%A1!%20Minha%20internet%20est%C3%A1%20lenta" target="_blank" style="color:#84FF00;font-weight:700">WhatsApp</a>`,

  'boleto': `📄 <strong>Segunda via de boleto:</strong><br><br>
Acesse a Central do Cliente:<br>
👉 <a href="${CENTRAL}" target="_blank" style="color:#84FF00;font-weight:700">fasttelekom.sgp.tsmx.com.br</a><br><br>
Ou chame no WhatsApp informando seu CPF:<br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Preciso%20da%202%C2%AA%20via%20do%20boleto" target="_blank" style="color:#84FF00;font-weight:700">(38) 9 9859-5421</a>`,

  'fatura': `💰 Gerencie suas faturas na Central do Cliente:<br>
👉 <a href="${CENTRAL}" target="_blank" style="color:#84FF00;font-weight:700">Acessar Central</a><br><br>
Ou fale pelo WhatsApp: <a href="${WA}" target="_blank" style="color:#84FF00">(38) 9 9859-5421</a>`,

  'chamado': `🛠️ Para abrir um chamado técnico acesse a Central:<br>
👉 <a href="${CENTRAL}" target="_blank" style="color:#84FF00;font-weight:700">Abrir Chamado Online</a><br><br>
Ou chame direto no WhatsApp:<br>
👉 <a href="${WA}" target="_blank" style="color:#84FF00;font-weight:700">(38) 9 9859-5421</a>`,

  'cancelar': `😢 Que pena! Para cancelar entre em contato:<br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20cancelar%20meu%20contrato" target="_blank" style="color:#84FF00;font-weight:700">WhatsApp (38) 9 9859-5421</a><br><br>
Antes de cancelar, podemos oferecer condições especiais! Quer conversar?`,

  'cobertura': `📍 A Fast Telekom atende <strong>Paracatu — MG</strong>!<br><br>
Com dúvida se atendemos seu bairro específico?<br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20verificar%20cobertura%20no%20meu%20endere%C3%A7o" target="_blank" style="color:#84FF00;font-weight:700">Verificar pelo WhatsApp</a>`,

  'wifi': `📶 <strong>Configurar o Wi-Fi:</strong><br><br>
1. Acesse <strong>192.168.1.1</strong> no navegador<br>
2. Login: <strong>admin</strong> / Senha: na etiqueta do roteador<br>
3. Vá em "Wi-Fi" para alterar nome e senha<br><br>
Precisa de ajuda remota? <a href="${WA}?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20para%20configurar%20o%20Wi-Fi" target="_blank" style="color:#84FF00">Fale pelo WhatsApp</a>`,

  'instalacao': `🔧 <strong>Instalação 100% gratuita!</strong><br>
Nosso técnico vai até seu endereço em Paracatu sem custo.<br><br>
Para agendar:<br>
👉 <a href="${WA}?text=Ol%C3%A1!%20Quero%20agendar%20instala%C3%A7%C3%A3o" target="_blank" style="color:#84FF00;font-weight:700">WhatsApp (38) 9 9859-5421</a>`,

  'default': `Olá! Posso te ajudar com:<br><br>
📦 <strong>Planos</strong> — de 100 Mbps a 1 Gbps<br>
📺 <strong>App de TV</strong> — incluso em todos<br>
🔧 <strong>Suporte técnico</strong><br>
📄 <strong>Faturas e boletos</strong><br><br>
Ou fale direto com nossa equipe:<br>
👉 <a href="${WA}" target="_blank" style="color:#84FF00;font-weight:700">WhatsApp (38) 9 9859-5421</a>`
};

function getBotReply(msg) {
  const lower = msg.toLowerCase();
  const map = {
    '100 mb': '100', 'plano 100': '100', '79': '100',
    '300 mb': '300', 'plano 300': '300', '89': '300',
    '500 mb': '500', 'plano 500': '500', '109': '500',
    '1 gb': 'giga', 'giga': 'giga', 'gbps': 'giga', '159': 'giga',
    'tv': 'tv', 'aplicativo': 'tv', 'streaming': 'tv',
    'preco': 'preco', 'preço': 'preco', 'valor': 'preco', 'quanto': 'preco', 'custa': 'preco',
    'contratar': 'contratar', 'assinar': 'contratar', 'quero': 'contratar',
    'plano': 'plano', 'planos': 'plano', 'internet': 'plano',
    'suporte': 'suporte', 'técnico': 'suporte', 'problema': 'suporte',
    'lento': 'lento', 'lenta': 'lento', 'caindo': 'lento', 'travando': 'lento', 'sem internet': 'lento',
    'boleto': 'boleto', '2ª via': 'boleto', 'segunda via': 'boleto',
    'fatura': 'fatura', 'cobrança': 'fatura', 'mensalidade': 'fatura',
    'chamado': 'chamado', 'abrir': 'chamado',
    'cancelar': 'cancelar', 'cancelamento': 'cancelar',
    'cobertura': 'cobertura', 'atende': 'cobertura', 'paracatu': 'cobertura',
    'wifi': 'wifi', 'wi-fi': 'wifi', 'senha': 'wifi', 'roteador': 'wifi',
    'instalação': 'instalacao', 'instalacao': 'instalacao', 'instalar': 'instalacao'
  };
  for (const [keyword, key] of Object.entries(map)) {
    if (lower.includes(keyword)) return botReplies[key] || botReplies.default;
  }
  return botReplies.default;
}

function quickReply(text) {
  const input = document.getElementById('chatInput');
  if (input) { input.value = text; sendChatMessage(); }
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  if (!input || !messages) return;

  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.innerHTML = `<span>${text}</span>`;
  messages.appendChild(userMsg);

  const typing = document.createElement('div');
  typing.className = 'chat-msg bot';
  typing.innerHTML = '<span>...</span>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    typing.innerHTML = `<span>${getBotReply(text)}</span>`;
    messages.scrollTop = messages.scrollHeight;
  }, 900);
}

function chatKeyPress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

// ===== INTERSECTION OBSERVER (animate on scroll) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('animated');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .plan-card, .channel-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.feature-card, .plan-card, .channel-card').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
  });
});

document.head.insertAdjacentHTML('beforeend', `
<style>
.animated { opacity: 1 !important; transform: translateY(0) !important; }
</style>`);
