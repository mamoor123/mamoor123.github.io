/* ============================================
   MAMOOR AHMAD — AI Chatbot Widget
   ============================================ */

(function () {
  'use strict';

  // Create widget HTML
  const widgetHTML = `
    <div id="ai-chatbot" class="chatbot" role="complementary" aria-label="AI Assistant">
      <button class="chatbot__trigger" aria-label="Open AI assistant" title="Chat with AI">
        <span class="chatbot__trigger-icon">💬</span>
        <span class="chatbot__trigger-close" style="display:none">✕</span>
      </button>
      <div class="chatbot__window" style="display:none" role="dialog" aria-label="AI Chat">
        <div class="chatbot__header">
          <div class="chatbot__header-info">
            <span class="chatbot__avatar">🤖</span>
            <div>
              <div class="chatbot__name">Mamoor's AI</div>
              <div class="chatbot__status">Online • Ask me anything</div>
            </div>
          </div>
          <button class="chatbot__close" aria-label="Close chat">✕</button>
        </div>
        <div class="chatbot__messages" role="log" aria-live="polite">
          <div class="chatbot__msg chatbot__msg--bot">
            <div class="chatbot__msg-content">
              Hey! 👋 I'm Mamoor's AI assistant. I can help you learn about his work, services, or projects. What would you like to know?
            </div>
          </div>
        </div>
        <div class="chatbot__quick-actions">
          <button class="chatbot__quick-btn" data-query="What services do you offer?">Services</button>
          <button class="chatbot__quick-btn" data-query="Show me your best projects">Projects</button>
          <button class="chatbot__quick-btn" data-query="What are your rates?">Pricing</button>
          <button class="chatbot__quick-btn" data-query="How can I contact you?">Contact</button>
        </div>
        <form class="chatbot__input-area" aria-label="Send message">
          <input type="text" class="chatbot__input" placeholder="Ask about projects, services..." aria-label="Type your message" autocomplete="off">
          <button type="submit" class="chatbot__send" aria-label="Send message">→</button>
        </form>
      </div>
    </div>
  `;

  // Styles
  const styles = document.createElement('style');
  styles.textContent = `
    .chatbot { position: fixed; bottom: 24px; right: 24px; z-index: 900; font-family: var(--font-body); }
    .chatbot__trigger {
      width: 56px; height: 56px; border-radius: 50%;
      background: var(--accent, #64ffda); color: var(--bg-primary, #0a192f);
      border: none; cursor: pointer; font-size: 1.5rem;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(100, 255, 218, 0.3);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      position: relative;
    }
    .chatbot__trigger:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(100, 255, 218, 0.4); }
    .chatbot__trigger-close { font-size: 1.25rem; }
    .chatbot__window {
      position: absolute; bottom: 72px; right: 0;
      width: min(380px, calc(100vw - 48px)); height: 500px;
      background: var(--bg-secondary, #112240);
      border: 1px solid var(--border, #233554);
      border-radius: 16px; overflow: hidden;
      display: flex; flex-direction: column;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      animation: chatbotSlideUp 0.3s ease;
    }
    @keyframes chatbotSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .chatbot__header {
      padding: 16px 20px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid var(--border, #233554);
      background: var(--bg-primary, #0a192f);
    }
    .chatbot__header-info { display: flex; align-items: center; gap: 12px; }
    .chatbot__avatar { font-size: 1.5rem; }
    .chatbot__name { font-family: var(--font-mono, monospace); font-size: 0.875rem; font-weight: 600; color: var(--text-primary, #e6f1ff); }
    .chatbot__status { font-size: 0.6875rem; color: var(--accent, #64ffda); }
    .chatbot__close {
      background: none; border: none; color: var(--text-secondary, #8892b0);
      cursor: pointer; font-size: 1.125rem; padding: 4px;
      transition: color 0.15s ease;
    }
    .chatbot__close:hover { color: var(--text-primary, #e6f1ff); }
    .chatbot__messages {
      flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px;
    }
    .chatbot__msg { display: flex; }
    .chatbot__msg--bot { justify-content: flex-start; }
    .chatbot__msg--user { justify-content: flex-end; }
    .chatbot__msg-content {
      max-width: 85%; padding: 12px 16px; border-radius: 12px;
      font-size: 0.875rem; line-height: 1.6;
    }
    .chatbot__msg--bot .chatbot__msg-content {
      background: var(--bg-tertiary, #1d3461); color: var(--text-primary, #e6f1ff);
      border-bottom-left-radius: 4px;
    }
    .chatbot__msg--user .chatbot__msg-content {
      background: var(--accent, #64ffda); color: var(--bg-primary, #0a192f);
      border-bottom-right-radius: 4px;
    }
    .chatbot__quick-actions {
      padding: 8px 16px; display: flex; gap: 6px; flex-wrap: wrap;
      border-top: 1px solid var(--border, #233554);
    }
    .chatbot__quick-btn {
      font-family: var(--font-mono, monospace); font-size: 0.6875rem;
      background: var(--accent-dim, rgba(100,255,218,0.08));
      color: var(--accent, #64ffda); border: 1px solid var(--border, #233554);
      border-radius: 100px; padding: 4px 12px; cursor: pointer;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .chatbot__quick-btn:hover {
      border-color: var(--accent, #64ffda); background: rgba(100,255,218,0.15);
    }
    .chatbot__input-area {
      padding: 12px 16px; display: flex; gap: 8px;
      border-top: 1px solid var(--border, #233554);
    }
    .chatbot__input {
      flex: 1; background: var(--bg-primary, #0a192f);
      border: 1px solid var(--border, #233554); border-radius: 8px;
      padding: 10px 14px; color: var(--text-primary, #e6f1ff);
      font-family: var(--font-body, sans-serif); font-size: 0.8125rem;
      outline: none; transition: border-color 0.15s ease;
    }
    .chatbot__input:focus { border-color: var(--accent, #64ffda); }
    .chatbot__input::placeholder { color: var(--text-muted, #495670); }
    .chatbot__send {
      width: 40px; height: 40px; border-radius: 8px;
      background: var(--accent, #64ffda); color: var(--bg-primary, #0a192f);
      border: none; cursor: pointer; font-size: 1.125rem; font-weight: 700;
      transition: transform 0.15s ease;
    }
    .chatbot__send:hover { transform: scale(1.05); }
    .chatbot__typing { display: flex; gap: 4px; padding: 12px 16px; }
    .chatbot__typing-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--text-muted, #495670);
      animation: typingBounce 1.4s infinite;
    }
    .chatbot__typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .chatbot__typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typingBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }
    [data-theme="light"] .chatbot__window { box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
  `;
  document.head.appendChild(styles);

  // Insert HTML
  const container = document.createElement('div');
  container.innerHTML = widgetHTML;
  document.body.appendChild(container.firstElementChild);

  // Elements
  const chatbot = document.getElementById('ai-chatbot');
  const trigger = chatbot.querySelector('.chatbot__trigger');
  const triggerIcon = chatbot.querySelector('.chatbot__trigger-icon');
  const triggerClose = chatbot.querySelector('.chatbot__trigger-close');
  const window_ = chatbot.querySelector('.chatbot__window');
  const closeBtn = chatbot.querySelector('.chatbot__close');
  const messagesEl = chatbot.querySelector('.chatbot__messages');
  const inputEl = chatbot.querySelector('.chatbot__input');
  const formEl = chatbot.querySelector('.chatbot__input-area');
  const quickBtns = chatbot.querySelectorAll('.chatbot__quick-btn');

  let isOpen = false;

  function toggleChat(open) {
    isOpen = open;
    window_.style.display = open ? 'flex' : 'none';
    triggerIcon.style.display = open ? 'none' : 'inline';
    triggerClose.style.display = open ? 'inline' : 'none';
    if (open) inputEl.focus();
  }

  trigger.addEventListener('click', () => toggleChat(!isOpen));
  closeBtn.addEventListener('click', () => toggleChat(false));

  // Knowledge base for responses
  const responses = {
    services: `Mamoor offers 6 core services:\n\n🤖 **AI Agent Systems** — from $2,000\nSaaS MVP Development — from $3,000\n🔌 Chrome Extensions — from $1,500\n📊 Data & Viz Tools — from $1,500\n🌍 Climate & ESG — from $2,000\n⚡ Custom Dev — Let's discuss\n\nWant details on any specific service?`,

    projects: `Mamoor has shipped 31+ projects! Here are some highlights:\n\n🐝 **HiveOps** — AI Company OS (9⭐)\n🌍 **Planetary Pulse** — Earth Dashboard\n🧬 **AgentDNA** — DNS for AI Agents\n🤖 **AgentForge** — AI Marketplace\n⚒️ **ClawForge** — Multi-Agent Dev Team\n🔥 **LeadForge** — Lead Intelligence\n\nVisit the Projects page to see all 31!`,

    pricing: `Here's the pricing overview:\n\n🤖 AI Agent Systems — from $2,000\n💻 SaaS MVP — from $3,000\n🔌 Chrome Extensions — from $1,500\n📊 Data Tools — from $1,500\n🌍 Climate/ESG — from $2,000\n⚡ Custom — Let's discuss\n\nEvery project is scoped individually. Want a quote?`,

    contact: `You can reach Mamoor through:\n\n📧 Email: mamoor.ahmed86@gmail.com\n💬 WhatsApp: +92 327 985 8009\n🔗 LinkedIn: /in/mamoor-ahmad\n🐙 GitHub: @mamoor123\n\nOr just fill out the contact form on this page!`,

    default: `I can help with info about:\n\n• **Services** & pricing\n• **Projects** & tech stack\n• **Contact** details\n• Mamoor's experience\n\nWhat would you like to know?`,

    experience: `Mamoor Ahmad — AI & Full-Stack Developer from Pakistan 🇵🇰\n\n• 2+ years of experience\n• 31+ projects shipped\n• 15+ AI products built\n• 8+ SaaS platforms launched\n\nSpecializes in AI agents, SaaS, Chrome extensions, and climate tech.`,

    tech: `Tech stack highlights:\n\n⚡ JavaScript (95%) • TypeScript (92%)\n🐍 Python (90%) • React (90%)\n▲ Next.js (88%) • Node.js (85%)\n🐘 PostgreSQL (82%) • Tailwind (93%)\n🤖 AI/LLMs (85%) • Docker (70%)\n🎨 Data Viz (82%) • Stripe (78%)`
  };

  function getResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('service') || q.includes('offer') || q.includes('do you do')) return responses.services;
    if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built')) return responses.projects;
    if (q.includes('pric') || q.includes('rate') || q.includes('cost') || q.includes('how much') || q.includes('budget')) return responses.pricing;
    if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('whatsapp') || q.includes('hire')) return responses.contact;
    if (q.includes('experience') || q.includes('about') || q.includes('who')) return responses.experience;
    if (q.includes('tech') || q.includes('stack') || q.includes('skill') || q.includes('language')) return responses.tech;
    if (q.match(/\b(hi|hello|hey|howdy|sup|yo)\b/)) return `Hey there! 👋 Welcome to Mamoor's portfolio. I can help you with:\n\n• **Services** & pricing\n• **Projects** & tech stack\n• **Contact** details\n\nWhat would you like to know?`;
    if (q.match(/\b(thanks|thank you|thx|cheers)\b/)) return `You're welcome! 😊 Let me know if you have any other questions. Feel free to reach out to Mamoor directly via WhatsApp or email!`;
    if (q.match(/\b(bye|goodbye|see you|later)\b/)) return `Goodbye! 👋 Thanks for visiting. Don't hesitate to reach out if you need anything. Good luck with your project!`;
    return responses.default;
  }

  function addMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.className = `chatbot__msg chatbot__msg--${isUser ? 'user' : 'bot'}`;
    msg.innerHTML = `<div class="chatbot__msg-content">${text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>`;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chatbot__msg chatbot__msg--bot';
    typing.innerHTML = '<div class="chatbot__typing"><span class="chatbot__typing-dot"></span><span class="chatbot__typing-dot"></span><span class="chatbot__typing-dot"></span></div>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return typing;
  }

  function handleSubmit(query) {
    if (!query.trim()) return;
    addMessage(query, true);
    inputEl.value = '';

    const typingEl = showTyping();
    setTimeout(() => {
      typingEl.remove();
      addMessage(getResponse(query), false);
    }, 800 + Math.random() * 400);
  }

  formEl.addEventListener('submit', e => {
    e.preventDefault();
    handleSubmit(inputEl.value);
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      handleSubmit(btn.getAttribute('data-query'));
    });
  });
})();
