// ============================================================
// === FLOATING AI CHAT WIDGET (Gemini-powered) =============
// ============================================================
// Sử dụng: thêm vào cuối <body> mọi trang bằng <script src="chat.js"></script>

(function() {
  'use strict';

  // ===== CONFIG =====
  const ZALO_OA_URL = 'https://zalo.me/[YOUR_ZALO_OA_ID]';  // Bạn thay sau
  const MESSENGER_URL = 'https://m.me/[YOUR_FB_PAGE]';      // Bạn thay sau
  const API_ENDPOINT = '/api/gemini-backend';
  
  // ===== STATE =====
  let chatHistory = [];      // [{ role: 'user'|'assistant', content: '...' }]
  let isWaiting = false;     // Đang chờ AI trả lời
  let isOpen = false;
  
  // ===== INITIAL GREETING =====
  const GREETING = 'Xin chào! 👋 Em là Trợ lý ViệcNhà247.\nEm có thể giúp anh/chị tư vấn về 8 dịch vụ và đặt lịch nhanh chóng. Anh/chị cần dịch vụ gì hôm nay ạ?';
  
  const QUICK_SUGGESTIONS = [
    '🧹 Giá dọn nhà',
    '🚛 Chuyển nhà bao nhiêu?',
    '⚡ Sửa điện 24/7?',
    '👴 Chăm sóc người già'
  ];
  
  // ===== TẠO CHAT WIDGET HTML =====
  function createChatHTML() {
    const container = document.createElement('div');
    container.id = 'chatContainer';
    container.innerHTML = `
      <!-- Floating button -->
      <button class="chat-fab" id="chatFab" aria-label="Mở chat trợ lý">
        💬
        <span class="badge" id="chatBadge">1</span>
      </button>
      
      <!-- Chat panel -->
      <div class="chat-panel" id="chatPanel" role="dialog" aria-label="Chat với ViệcNhà247">
        <div class="chat-header">
          <div class="chat-avatar">🏠</div>
          <div class="chat-header-text">
            <div class="chat-header-title">Trợ lý ViệcNhà247</div>
            <div class="chat-header-status">Đang online · Trả lời ngay</div>
          </div>
          <button class="chat-close" id="chatClose" aria-label="Đóng chat">✕</button>
        </div>
        
        <div class="chat-messages" id="chatMessages"></div>
        
        <div class="chat-suggestions" id="chatSuggestions"></div>
        
        <div class="chat-input-wrap">
          <textarea 
            class="chat-input" 
            id="chatInput" 
            placeholder="Nhập câu hỏi..."
            rows="1"
            aria-label="Nhập tin nhắn"
          ></textarea>
          <button class="chat-send" id="chatSend" aria-label="Gửi">→</button>
        </div>
        
        <div class="chat-footer">
          Cần hỗ trợ ngay? Nhắn 
          <a href="${ZALO_OA_URL}" target="_blank">Zalo OA</a> hoặc 
          <a href="${MESSENGER_URL}" target="_blank">Messenger</a>
        </div>
      </div>
    `;
    document.body.appendChild(container);
  }
  
  // ===== HIỂN THỊ TIN NHẮN =====
  function renderMessage(role, text) {
    const messagesEl = document.getElementById('chatMessages');
    if (!messagesEl) return;
    
    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${role === 'user' ? 'user' : 'bot'}`;
    
    const avatar = role === 'user' ? 'B' : '🏠';
    
    // Parse text để xử lý markers
    let bubbleHTML = '';
    let parsedText = text;
    
    // Action: [ACTION:OPEN_FORM:service-id]
    const formMatch = parsedText.match(/\[ACTION:OPEN_FORM:([\w-]+)\]/);
    let actionButton = '';
    
    if (formMatch) {
      const serviceId = formMatch[1];
      parsedText = parsedText.replace(/\[ACTION:OPEN_FORM:[\w-]+\]/, '').trim();
      actionButton = `<br><a class="chat-action-btn" href="/index.html#dat-lich" onclick="window.openWizardForService && window.openWizardForService('${serviceId}'); return true;">📋 Mở form đặt lịch</a>`;
    }
    
    // Action: [ACTION:OPEN_ZALO]
    if (parsedText.includes('[ACTION:OPEN_ZALO]')) {
      parsedText = parsedText.replace(/\[ACTION:OPEN_ZALO\]/g, '').trim();
      actionButton = `<br><a class="chat-action-btn" href="${ZALO_OA_URL}" target="_blank">💬 Mở Zalo OA</a>`;
    }
    
    // Format text: xuống dòng + bold đơn giản
    const safeText = escapeHTML(parsedText);
    const formattedText = safeText
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    bubbleHTML = formattedText + actionButton;
    
    msgEl.innerHTML = `
      <div class="chat-msg-avatar">${avatar}</div>
      <div class="chat-msg-bubble">${bubbleHTML}</div>
    `;
    
    messagesEl.appendChild(msgEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  
  function escapeHTML(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  // ===== TYPING INDICATOR =====
  function showTyping() {
    const messagesEl = document.getElementById('chatMessages');
    if (!messagesEl) return;
    
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-typing';
    typingEl.id = 'chatTyping';
    typingEl.innerHTML = `
      <div class="chat-typing-dot"></div>
      <div class="chat-typing-dot"></div>
      <div class="chat-typing-dot"></div>
    `;
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  
  function hideTyping() {
    const t = document.getElementById('chatTyping');
    if (t) t.remove();
  }
  
  // ===== RENDER QUICK SUGGESTIONS =====
  function renderSuggestions() {
    const sugEl = document.getElementById('chatSuggestions');
    if (!sugEl) return;
    
    if (chatHistory.length > 1) {
      // Ẩn suggestions sau khi user đã chat
      sugEl.style.display = 'none';
      return;
    }
    
    sugEl.innerHTML = QUICK_SUGGESTIONS.map(s => 
      `<button class="chat-suggest" data-text="${s.replace(/[🧹🚛⚡👴]\s*/g, '')}">${s}</button>`
    ).join('');
    
    sugEl.querySelectorAll('.chat-suggest').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.text;
        sendMessage(text);
      });
    });
  }
  
  // ===== GỬI TIN NHẮN =====
  async function sendMessage(text) {
    if (!text || isWaiting) return;
    
    text = text.trim();
    if (!text) return;
    
    // Hiển thị tin nhắn user
    renderMessage('user', text);
    chatHistory.push({ role: 'user', content: text });
    
    // Clear input
    const input = document.getElementById('chatInput');
    if (input) input.value = '';
    
    // Ẩn suggestions
    const sugEl = document.getElementById('chatSuggestions');
    if (sugEl) sugEl.style.display = 'none';
    
    // Show typing
    isWaiting = true;
    document.getElementById('chatSend').disabled = true;
    showTyping();
    
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory })
      });
      
      const data = await res.json();
      hideTyping();
      
      const reply = data.reply || data.error || 'Em xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.';
      
      renderMessage('assistant', reply);
      chatHistory.push({ role: 'assistant', content: reply });
      
    } catch (err) {
      console.error('Chat error:', err);
      hideTyping();
      const fallback = 'Em xin lỗi, hệ thống chat đang gặp sự cố. Anh/chị vui lòng nhắn Zalo OA để được hỗ trợ ngay nhé! [ACTION:OPEN_ZALO]';
      renderMessage('assistant', fallback);
      chatHistory.push({ role: 'assistant', content: fallback });
    } finally {
      isWaiting = false;
      document.getElementById('chatSend').disabled = false;
    }
  }
  
  // ===== TOGGLE CHAT =====
  function toggleChat(forceState) {
    const panel = document.getElementById('chatPanel');
    const fab = document.getElementById('chatFab');
    const badge = document.getElementById('chatBadge');
    if (!panel || !fab) return;
    
    if (forceState !== undefined) {
      isOpen = forceState;
    } else {
      isOpen = !isOpen;
    }
    
    if (isOpen) {
      panel.classList.add('open');
      fab.style.display = 'none';
      
      // Xóa badge
      if (badge) badge.style.display = 'none';
      
      // Hiển thị greeting nếu chưa có
      if (chatHistory.length === 0) {
        renderMessage('assistant', GREETING);
        chatHistory.push({ role: 'assistant', content: GREETING });
        renderSuggestions();
      }
      
      // Focus input
      setTimeout(() => {
        const input = document.getElementById('chatInput');
        if (input) input.focus();
      }, 300);
    } else {
      panel.classList.remove('open');
      fab.style.display = '';
    }
  }
  
  // ===== EVENT LISTENERS =====
  function setupEventListeners() {
    document.getElementById('chatFab').addEventListener('click', () => toggleChat(true));
    document.getElementById('chatClose').addEventListener('click', () => toggleChat(false));
    
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    
    sendBtn.addEventListener('click', () => sendMessage(input.value));
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });
    
    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });
  }
  
  // ===== HELPER: Mở wizard form với dịch vụ chọn sẵn =====
  // Hàm này sẽ được trang index.html implement, cho phép chat dẫn về form
  window.openWizardForService = window.openWizardForService || function(serviceId) {
    // Default behavior: scroll xuống form
    setTimeout(() => {
      const formSection = document.getElementById('dat-lich');
      if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
      
      // Auto-select service card nếu có
      const card = document.querySelector(`.service-card-wizard[data-service="${serviceId}"]`);
      if (card) {
        document.querySelectorAll('.service-card-wizard').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        if (window.wizardState) {
          window.wizardState.service = serviceId;
        }
      }
      
      // Đóng chat
      toggleChat(false);
    }, 200);
  };
  
  // ===== INIT =====
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    createChatHTML();
    setupEventListeners();
    
    // Auto-show badge sau 3 giây để thu hút
    setTimeout(() => {
      const badge = document.getElementById('chatBadge');
      if (badge && !isOpen) {
        badge.style.animation = 'pulse 1.5s infinite';
      }
    }, 3000);
  }
  
  init();
  
})();
