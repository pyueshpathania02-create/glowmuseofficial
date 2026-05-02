document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.close-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  mobileBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });

  // Close mobile nav when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // Handle immediate active state for elements in viewport on load
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('active');
      }
    });
  }, 100);

  // 4. Chatbot Toggle
  const chatbotBtn = document.querySelector('.chatbot-btn');
  const chatbotBubble = document.querySelector('.chatbot-bubble');
  const closeBotBtn = document.querySelector('.close-bot');

  chatbotBtn.addEventListener('click', () => {
    chatbotBubble.classList.toggle('active');
  });

  closeBotBtn.addEventListener('click', () => {
    chatbotBubble.classList.remove('active');
  });

  // Simulate basic chatbot interaction
  const botInput = document.querySelector('.bot-input input');
  const botSendBtn = document.querySelector('.bot-input button');
  const botBody = document.querySelector('.bot-body');

  function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('bot-message');
    if (isUser) {
      msgDiv.style.backgroundColor = 'var(--bg-darker)';
      msgDiv.style.alignSelf = 'flex-end';
      msgDiv.style.marginLeft = 'auto';
      msgDiv.style.display = 'block';
      msgDiv.style.marginBottom = '10px';
    } else {
      msgDiv.style.marginBottom = '10px';
    }
    msgDiv.textContent = text;
    botBody.appendChild(msgDiv);
    botBody.scrollTop = botBody.scrollHeight;
  }

  function handleSend() {
    const text = botInput.value.trim();
    if (text) {
      appendMessage(text, true);
      botInput.value = '';

      // Artificial delay for bot response
      setTimeout(() => {
        appendMessage("Thank you for your message! Our aesthetic experts will get back to you soon ✨");
      }, 1000);
    }
  }

  botSendBtn.addEventListener('click', handleSend);
  botInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
});
