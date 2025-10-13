let currentState = 'PRINCIPAL';
let chatInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  if (userInput) {
    userInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') processUserQuery();
    });
  }
});

function displayWelcomeMessage() {
  appendMessage(RESPUESTAS_FAMILIA['WELCOME'] + '<br><br>' + RESPUESTAS_FAMILIA['MENU_PRINCIPAL'], 'bot');
  currentState = 'PRINCIPAL';
  chatInitialized = true;
}

window.toggleChat = function() {
  const container = document.getElementById('chatbot');
  if (container.classList.contains('show')) {
    container.classList.remove('show');
  } else {
    container.classList.add('show');
    if (!chatInitialized) displayWelcomeMessage();
  }
};

function showTyping() {
  const body = document.getElementById('chatbot-messages');
  const el = document.createElement('div');
  el.classList.add('message', 'bot', 'typing');
  el.textContent = 'Escribiendo...';
  body.appendChild(el);
  body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
}

function removeTyping() {
  const typing = document.querySelector('.typing');
  if (typing) typing.remove();
}

window.processUserQuery = function() {
  const input = document.getElementById('user-input');
  const raw = input.value.trim();
  if (!raw) return;
  const query = raw.toUpperCase();
  input.value = '';
  appendMessage(raw, 'user');
  showTyping();
  setTimeout(() => {
    removeTyping();
    handleQuery(query);
  }, 600);
};

function handleQuery(query) {
  let key = 'ERROR';
  let next = currentState;

  if (['MENÚ', 'MENU', 'INICIO', 'REINICIAR'].includes(query)) {
    key = 'MENU_PRINCIPAL';
    next = 'PRINCIPAL';
  } else if (currentState === 'PRINCIPAL' && ['1','2','3','4','5'].includes(query)) {
    key = `OPCIONES_${query}`;
    next = query;
  } else if (RESPUESTAS_FAMILIA[query]) {
    const prefix = query.split('.')[0];
    key = prefix === currentState ? query : 'ERROR';
  }

  appendMessage(RESPUESTAS_FAMILIA[key], 'bot');
  currentState = next;
}

function appendMessage(text, sender) {
  const body = document.getElementById('chatbot-messages');
  if (!body) return;
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  let html = text
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  msg.innerHTML = html;
  body.appendChild(msg);
  body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
}
