/**
 * Cyber Shield — Cybersecurity Awareness & Education Platform
 * Modern Vanilla JavaScript (ES6+) Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  initCyberMatrixCanvas();
  initLearningHub();
  initPhishingSimulator();
  initPasswordAnalyzer();
  initWifiSimulator();
  initQuizSystem();
  initContactForm();
  initNewsletterForm();
});

/* ==========================================================================
   1. Tab Navigation & Single-Page Application (SPA) Routing
   ========================================================================== */
function initTabNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, [data-tab]');
  const tabPanels = document.querySelectorAll('.tab-content');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  // Handle Tab Switch
  function switchTab(targetTabId, targetAccordionId = null, targetQuizModule = null) {
    if (!targetTabId) return;

    // Update nav links active state
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.tab === targetTabId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update visible tab content
    let foundPanel = false;
    tabPanels.forEach(panel => {
      if (panel.id === `${targetTabId}-tab`) {
        panel.classList.add('active');
        foundPanel = true;
      } else {
        panel.classList.remove('active');
      }
    });

    // If mobile nav is open, close it
    if (mainNav && mainNav.classList.contains('mobile-active')) {
      mainNav.classList.remove('mobile-active');
    }

    // Scroll to top of window smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL hash without jump
    if (history.pushState) {
      history.pushState(null, '', `#${targetTabId}`);
    } else {
      location.hash = `#${targetTabId}`;
    }

    // If targetAccordionId specified, open that accordion item
    if (targetAccordionId) {
      setTimeout(() => {
        const accordionItem = document.getElementById(targetAccordionId);
        if (accordionItem) {
          document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('open');
            const h = item.querySelector('.accordion-header');
            if (h) h.setAttribute('aria-expanded', 'false');
            const txt = item.querySelector('.toggle-action-text');
            if (txt) txt.textContent = 'View Info';
          });
          accordionItem.classList.add('open');
          const header = accordionItem.querySelector('.accordion-header');
          if (header) header.setAttribute('aria-expanded', 'true');
          const actionText = accordionItem.querySelector('.toggle-action-text');
          if (actionText) actionText.textContent = 'Hide Info';
          accordionItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }

    // If targetQuizModule specified, switch the quiz module
    if (targetQuizModule && typeof window.selectQuizModule === 'function') {
      window.selectQuizModule(targetQuizModule);
    }
  }

  // Bind click to all tab triggers
  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-tab]');
    if (trigger) {
      e.preventDefault();
      const tabId = trigger.dataset.tab;
      const accordionId = trigger.dataset.accordion;
      const quizModule = trigger.dataset.quizModule;
      switchTab(tabId, accordionId, quizModule);
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-active');
    });
  }

  // Handle browser back/forward buttons or direct hash in URL
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && ['home', 'about', 'services', 'quizzes', 'contact'].includes(hash)) {
      switchTab(hash);
    }
  }

  window.addEventListener('popstate', handleHashChange);
  // Check initial hash
  if (window.location.hash) {
    handleHashChange();
  }
}

/* ==========================================================================
   2. Hero Canvas: Interactive Cyber Matrix Defense Perimeter
   ========================================================================== */
function initCyberMatrixCanvas() {
  const canvas = document.getElementById('cyberMatrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.clientWidth || 460);
  let height = (canvas.height = canvas.parentElement.clientHeight || 270);

  // Resize handler
  window.addEventListener('resize', () => {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    }
  });

  // Node swarm
  const nodeCount = 28;
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2.5 + 1.5,
      isCore: i < 5,
    });
  }

  let mouse = { x: width / 2, y: height / 2, active: false };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  let angle = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
    ctx.lineWidth = 1;
    const gridSize = 35;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Central Shield Perimeter Ring
    const centerX = width / 2;
    const centerY = height / 2;
    angle += 0.01;

    // Outer rotating dashed perimeter
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.arc(0, 0, 75, 0, Math.PI * 2);
    ctx.stroke();

    // Inner counter-rotating ring
    ctx.rotate(-angle * 2);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Center Shield Glow Node
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 242, 254, 0.15)';
    ctx.fill();
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Shield Emblem Icon drawn with vector lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 8);
    ctx.lineTo(centerX + 7, centerY - 3);
    ctx.lineTo(centerX + 5, centerY + 6);
    ctx.lineTo(centerX, centerY + 10);
    ctx.lineTo(centerX - 5, centerY + 6);
    ctx.lineTo(centerX - 7, centerY - 3);
    ctx.closePath();
    ctx.fillStyle = '#00f2fe';
    ctx.fill();
    ctx.restore();

    // Update and draw network nodes
    nodes.forEach((node, i) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Mouse influence
      if (mouse.active) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 80) {
          node.x += dx * 0.02;
          node.y += dy * 0.02;
        }
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.isCore ? '#10b981' : '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.shadowColor = node.isCore ? '#10b981' : '#00f2fe';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Connect nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dist = Math.hypot(node.x - other.x, node.y - other.y);
        if (dist < 75) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / 75 * 0.8})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // Connect to center shield if within proximity
      const distToCenter = Math.hypot(node.x - centerX, node.y - centerY);
      if (distToCenter < 110) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(centerX, centerY);
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.45 * (1 - distToCenter / 110)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. Services Tab: Learning Hub (Accordions, Search & Progress)
   ========================================================================== */
function initLearningHub() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const searchInput = document.getElementById('moduleSearchInput');
  const completionButtons = document.querySelectorAll('.complete-checkbox-btn');
  const progressText = document.getElementById('modulesCompletedText');
  const progressFill = document.getElementById('hubProgressFill');

  // Accordion Independent Toggle
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    function toggleItem() {
      const isOpen = item.classList.contains('open');
      const actionText = item.querySelector('.toggle-action-text');
      if (isOpen) {
        item.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
        if (actionText) actionText.textContent = 'View Info';
      } else {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        if (actionText) actionText.textContent = 'Hide Info';
      }
      updateToggleAllBtnState();
    }

    header.addEventListener('click', (e) => {
      // Don't toggle if click was on completion button or an inner button
      if (e.target.closest('.complete-checkbox-btn') || e.target.closest('button')) return;
      toggleItem();
    });

    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.complete-checkbox-btn') || e.target.closest('button')) return;
        e.preventDefault();
        toggleItem();
      }
    });
  });

  // Expand / Collapse All Toggle
  const toggleAllBtn = document.getElementById('btnToggleAllAccordions');
  const toggleAllText = document.getElementById('toggleAllText');

  function updateToggleAllBtnState() {
    const anyClosed = Array.from(accordionItems).some(item => !item.classList.contains('open'));
    if (toggleAllText) {
      toggleAllText.textContent = anyClosed ? 'Expand All' : 'Collapse All';
    }
  }

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', () => {
      const anyClosed = Array.from(accordionItems).some(item => !item.classList.contains('open'));
      accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const actionText = item.querySelector('.toggle-action-text');
        if (anyClosed) {
          item.classList.add('open');
          header?.setAttribute('aria-expanded', 'true');
          if (actionText) actionText.textContent = 'Hide Info';
        } else {
          item.classList.remove('open');
          header?.setAttribute('aria-expanded', 'false');
          if (actionText) actionText.textContent = 'View Info';
        }
      });
      updateToggleAllBtnState();
    });
  }

  // Module Completion Tracker
  const completedModules = new Set();

  function updateProgressBar() {
    const total = 3;
    const count = completedModules.size;
    if (progressText) {
      progressText.textContent = `${count} of ${total}`;
    }
    if (progressFill) {
      const percentage = (count / total) * 100;
      progressFill.style.width = `${percentage}%`;
    }
  }

  completionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const moduleId = btn.dataset.moduleId;
      const isChecked = btn.classList.contains('checked');

      if (isChecked) {
        btn.classList.remove('checked');
        btn.innerHTML = `<i class="fa-regular fa-circle-check"></i> Mark Completed`;
        completedModules.delete(moduleId);
      } else {
        btn.classList.add('checked');
        btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Completed`;
        completedModules.add(moduleId);
      }
      updateProgressBar();
    });
  });

  // Search Filter
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      accordionItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          item.style.display = 'block';
          if (query.length > 2) {
            item.classList.add('open');
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* ==========================================================================
   4. Interactive Tool: Phishing Email Threat Simulator
   ========================================================================== */
function initPhishingSimulator() {
  const fromField = document.getElementById('simFromField');
  const urgentBanner = document.getElementById('simUrgentBanner');
  const linkField = document.getElementById('simLinkField');
  const attachField = document.getElementById('simAttachField');
  const feedbackBox = document.getElementById('phishingFeedbackBox');

  if (!feedbackBox) return;

  const threatDetails = {
    from: {
      title: 'CRITICAL RED FLAG: Domain Spoofing & Typo-Squatting',
      desc: 'The sender address uses "corprate-update-portal.org" (with "corporate" intentionally misspelled). Legitimate IT departments will never use external, newly registered .org domains for internal infrastructure.',
      danger: true
    },
    urgent: {
      title: 'PSYCHOLOGICAL TRAP: Manufactured Urgency & Coercion',
      desc: 'Attackers create artificial 45-minute countdowns to trigger panic, short-circuiting your analytical thinking before you have time to consult colleagues or IT support.',
      danger: true
    },
    link: {
      title: 'CREDENTIAL HARVESTER: Malicious Destination URL',
      desc: 'The link directs to an unverified third-party token endpoint designed to mimic your single-sign-on (SSO) login page and harvest both username and password in plaintext.',
      danger: true
    },
    attach: {
      title: 'MALICIOUS PAYLOAD: Executable Binary Camouflage',
      desc: 'The file "employee_patch_v2.exe" is a Windows executable, not a harmless document. Running this delivers a Remote Access Trojan (RAT) or silent ransomware dropper onto your system.',
      danger: true
    }
  };

  function displayFeedback(type) {
    const info = threatDetails[type];
    if (!info) return;

    feedbackBox.innerHTML = `
      <div style="color: #f87171; font-weight: 700; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid fa-triangle-exclamation"></i> ${info.title}
      </div>
      <div style="color: #cbd5e1; font-size: 0.85rem; line-height: 1.55;">
        ${info.desc}
      </div>
    `;
    feedbackBox.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    feedbackBox.style.background = 'rgba(239, 68, 68, 0.08)';
  }

  fromField?.addEventListener('click', () => displayFeedback('from'));
  urgentBanner?.addEventListener('click', () => displayFeedback('urgent'));
  linkField?.addEventListener('click', () => displayFeedback('link'));
  attachField?.addEventListener('click', () => displayFeedback('attach'));
}

/* ==========================================================================
   5. Interactive Tool: Real-Time Password Strength & Entropy Analyzer
   ========================================================================== */
function initPasswordAnalyzer() {
  const input = document.getElementById('passwordAnalyzerInput');
  const toggleVisBtn = document.getElementById('togglePasswordVis');
  const eyeIcon = document.getElementById('eyeIcon');
  const barFill = document.getElementById('strengthBarFill');
  const textLabel = document.getElementById('strengthTextLabel');
  const charCountLabel = document.getElementById('charCountLabel');
  const entropyBitsVal = document.getElementById('entropyBitsVal');
  const crackTimeVal = document.getElementById('crackTimeVal');
  const guidanceBox = document.getElementById('entropyGuidanceBox');

  if (!input) return;

  // Toggle visibility
  if (toggleVisBtn && eyeIcon) {
    toggleVisBtn.addEventListener('click', () => {
      if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  }

  function calculateEntropy(pwd) {
    if (!pwd) return { bits: 0, poolSize: 0, crackTime: 'Instant', label: 'Empty', color: '#64748b', percent: 0 };

    let pool = 0;
    if (/[a-z]/.test(pwd)) pool += 26;
    if (/[A-Z]/.test(pwd)) pool += 26;
    if (/[0-9]/.test(pwd)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 33;

    if (pool === 0) pool = 1;

    // Entropy in bits: Length * log2(pool)
    let bits = Math.round(pwd.length * (Math.log(pool) / Math.LN2));

    // Penalties for repetitive or predictable sequences
    if (/^[0-9]+$/.test(pwd)) bits = Math.max(8, bits - 15);
    if (/^[a-zA-Z]+$/.test(pwd) && pwd.length < 8) bits = Math.max(10, bits - 10);
    if (/(.)\1{2,}/.test(pwd)) bits = Math.max(10, bits - 12); // repeats like "aaa"

    let crackTime = 'Instant';
    let label = 'Very Weak';
    let color = '#ef4444';
    let percent = Math.min(100, (bits / 85) * 100);

    if (bits < 30) {
      label = 'Very Vulnerable';
      crackTime = '< 1 Millisecond';
      color = '#ef4444';
    } else if (bits < 45) {
      label = 'Weak (Dictionary Risk)';
      crackTime = 'A Few Minutes';
      color = '#f97316';
    } else if (bits < 60) {
      label = 'Moderate Defense';
      crackTime = 'Several Months';
      color = '#eab308';
    } else if (bits < 80) {
      label = 'Strong (Resistant)';
      crackTime = 'Decades / Centuries';
      color = '#10b981';
    } else {
      label = 'Uncrackable Fortress';
      crackTime = 'Billions of Years';
      color = '#00f2fe';
    }

    return { bits, crackTime, label, color, percent };
  }

  function updateAnalysis() {
    const val = input.value;
    const len = val.length;
    if (charCountLabel) charCountLabel.textContent = `${len} char${len === 1 ? '' : 's'}`;

    const analysis = calculateEntropy(val);

    if (barFill) {
      barFill.style.width = `${analysis.percent}%`;
      barFill.style.backgroundColor = analysis.color;
    }

    if (textLabel) {
      textLabel.textContent = analysis.label;
      textLabel.style.color = analysis.color;
    }

    if (entropyBitsVal) {
      entropyBitsVal.textContent = `${analysis.bits} bits`;
      entropyBitsVal.style.color = analysis.color;
    }

    if (crackTimeVal) {
      crackTimeVal.textContent = analysis.crackTime;
    }

    if (guidanceBox) {
      if (len === 0) {
        guidanceBox.textContent = 'Enter characters to evaluate information entropy and dictionary brute-force resistance.';
      } else if (analysis.bits < 45) {
        guidanceBox.innerHTML = '<span style="color: #f87171;"><i class="fa-solid fa-triangle-exclamation"></i> Caution:</span> Short passwords or single-word patterns can be cracked in seconds using hash tables. Extend length to 15+ characters.';
      } else if (analysis.bits < 65) {
        guidanceBox.innerHTML = '<span style="color: #facc15;"><i class="fa-solid fa-info"></i> Good progress:</span> Adding 1 more unrelated dictionary word or special separator easily boosts this to military-grade entropy.';
      } else {
        guidanceBox.innerHTML = '<span style="color: #34d399;"><i class="fa-solid fa-circle-check"></i> Excellent entropy!</span> High combinatorial complexity renders offline brute-force mathematically infeasible.';
      }
    }
  }

  input.addEventListener('input', updateAnalysis);
  updateAnalysis(); // initial run
}

/* ==========================================================================
   6. Interactive Tool: Safe Browsing & Wi-Fi Packet Simulator
   ========================================================================== */
function initWifiSimulator() {
  const btnUnsecured = document.getElementById('btnWifiUnsecured');
  const btnSecured = document.getElementById('btnWifiSecured');
  const display = document.getElementById('packetStreamDisplay');
  const explanation = document.getElementById('wifiModeExplanation');

  if (!display) return;

  let currentMode = 'unsecured';
  let streamInterval = null;

  const unsecuredPackets = [
    '<span class="packet-danger">[PACKET INTERCEPT]</span> GET /login HTTP/1.1 | Host: portal.example | User-Agent: Mozilla/5.0',
    '<span class="packet-danger">[SNIFFED CLEARTEXT]</span> Cookie: session_id=98f82a1e0b; auth_token=USER_ALEX_LOGGED_IN',
    '<span class="packet-danger">[DNS SPOOF DETECTED]</span> Query: "mybank.com" -> Intercepted & Resolved to Rogue IP: 192.168.1.105',
    '<span class="packet-danger">[EXPOSED FORM DATA]</span> POST /auth | Payload: {"username":"alex@corp.com", "pass":"Summer2026!"}',
    '<span class="packet-danger">[MAC BEACON]</span> Client BSSID 48:2C:A0:84:11:F2 broadcasting unencrypted probe requests'
  ];

  const securedPackets = [
    '<span class="packet-secure">[VPN ENCRYPTED TUNNEL]</span> WireGuard UDP:51820 | ChaCha20-Poly1305 Ciphertext (Payload Obfuscated)',
    '<span class="packet-secure">[TLS 1.3 HANDSHAKE]</span> ECDHE Curve25519 Ephemeral Key Exchange Confirmed | Perfect Forward Secrecy',
    '<span class="packet-secure">[DNS-OVER-HTTPS]</span> Query securely encapsulated in HTTP/2 TLS stream via Cloudflare 1.1.1.1',
    '<span class="packet-secure">[PACKET INTERCEPT]</span> [SNI Encrypted / ECH Active] Destination domain hidden from local router sniffer',
    '<span class="packet-secure">[INTEGRITY CHECK]</span> HMAC-SHA256 authenticated header verified | Zero plaintext leakage'
  ];

  function runSimulation(mode) {
    if (streamInterval) clearInterval(streamInterval);
    display.innerHTML = '';
    const packets = mode === 'unsecured' ? unsecuredPackets : securedPackets;
    let index = 0;

    function addLine() {
      if (index < packets.length) {
        const line = document.createElement('div');
        line.style.marginBottom = '6px';
        line.innerHTML = `<span style="color: #64748b;">${new Date().toLocaleTimeString()}</span> &nbsp; ${packets[index]}`;
        display.appendChild(line);
        display.scrollTop = display.scrollHeight;
        index++;
      } else {
        clearInterval(streamInterval);
      }
    }

    addLine();
    streamInterval = setInterval(addLine, 900);

    if (explanation) {
      if (mode === 'unsecured') {
        explanation.innerHTML = '<span style="color: #f87171;">Threat Identified:</span> On an open public Wi-Fi network without encryption, an attacker running a packet analyzer sees your plaintext session tokens, visited domains, and unencrypted credentials.';
      } else {
        explanation.innerHTML = '<span style="color: #34d399;">Protection Active:</span> An authenticated VPN or TLS 1.3 tunnel encrypts all packets into random-looking ciphertext before leaving your laptop or phone. Local network sniffers see only meaningless bytes.';
      }
    }
  }

  btnUnsecured?.addEventListener('click', () => {
    btnUnsecured.classList.add('active');
    btnSecured.classList.remove('active');
    currentMode = 'unsecured';
    runSimulation('unsecured');
  });

  btnSecured?.addEventListener('click', () => {
    btnSecured.classList.add('active');
    btnUnsecured.classList.remove('active');
    currentMode = 'secured';
    runSimulation('secured');
  });

  // initial load
  runSimulation('unsecured');
}

/* ==========================================================================
   7. Quizzes Tab: Modular Cyber Defense Assessment System
   ========================================================================== */
function initQuizSystem() {
  // Comprehensive Question Bank Categorized by Module
  const questionsByModule = {
    phishing: [
      {
        module: 'phishing',
        moduleName: 'Phishing Awareness',
        question: "You receive an urgent email from 'Accounts Support' claiming your company VPN certificate will be revoked in 15 minutes unless you verify credentials via an included link. What is your safest immediate action?",
        options: [
          "Click the link immediately to prevent losing your connection to work servers.",
          "Reply to the email asking the sender to confirm their staff badge number.",
          "Inspect the raw sender address, do not click the link, and verify independently through your official company IT channel.",
          "Forward the email to all teammates asking if they also received it."
        ],
        correctIndex: 2,
        explanation: "Urgency paired with authentication deadlines is the premier hallmark of spear phishing. Never trust the display name or links inside an unverified urgent request. Always verify via an out-of-band known channel."
      },
      {
        module: 'phishing',
        moduleName: 'Phishing Awareness',
        question: "An incoming email links to 'https://login.micros0ft-security.com/auth'. What deceptive technique is the threat actor utilizing?",
        options: [
          "Cross-Site Scripting (XSS) injection.",
          "Typo-squatting / homoglyph spoofing substituting the letter 'o' with zero '0' to mimic a legitimate domain.",
          "Distributed Denial of Service (DDoS) reflection.",
          "SQL injection on your local mail client."
        ],
        correctIndex: 1,
        explanation: "Typo-squatting and character substitution (e.g. replacing 'o' with '0', or 'rn' with 'm') trick victims into believing they are on a genuine brand portal. Attackers register these lookalike domains specifically to harvest credentials."
      },
      {
        module: 'phishing',
        moduleName: 'Phishing Awareness',
        question: "A vendor sends an unexpected email with an attachment titled 'Outstanding_Invoice_Q4.pdf.exe'. Why should you NEVER double-click this file?",
        options: [
          "Double-clicking will automatically print 1,000 blank copies.",
          "It uses double-extension obfuscation to camouflage a malicious Windows executable (.exe) as a harmless PDF document.",
          "It will corrupt your monitor's display resolution settings.",
          "It will immediately reset your computer's system clock."
        ],
        correctIndex: 1,
        explanation: "Windows by default hides known file extensions. Attackers add '.pdf.exe' so users only see '.pdf'. When clicked, the file executes malicious binaries, dropping trojans, keyloggers, or ransomware onto the workstation."
      },
      {
        module: 'phishing',
        moduleName: 'Phishing Awareness',
        question: "What is 'Quishing' (QR Code Phishing) and why does it represent a heightened risk compared to standard email hyperlinks?",
        options: [
          "It only targets users who have outdated graphics cards.",
          "QR codes obscure the destination URL from visual inspection and force victims to transition to unmanaged personal mobile browsers.",
          "QR codes automatically burn your smartphone camera lens.",
          "It requires entering your Wi-Fi router password on a physical keypad."
        ],
        correctIndex: 1,
        explanation: "QR codes prevent desktop security gateways from easily analyzing links and bypass visual URL scrutiny. Users scanning with mobile phones often lack enterprise endpoint protection on personal devices."
      }
    ],

    passwords: [
      {
        module: 'passwords',
        moduleName: 'Password Hygiene & MFA',
        question: "Which of the following approaches generates the most resilient, brute-force-resistant master password?",
        options: [
          "A 4-word random passphrase like 'velvet-anchor-falcon-orbit' (27 characters).",
          "An 8-character password with symbols like 'P@ssw0rd!'.",
          "Your childhood street name followed by your graduation year.",
          "A dictionary word with letters swapped for numbers like 'B4n4n4'."
        ],
        correctIndex: 0,
        explanation: "Mathematical entropy scales primarily with length. 'velvet-anchor-falcon-orbit' provides over 60 bits of entropy and would take specialized GPU clusters centuries to crack, while common substitution passwords ('P@ssw0rd!') are cracked in milliseconds."
      },
      {
        module: 'passwords',
        moduleName: 'Password Hygiene & MFA',
        question: "Why is reusing the same password across multiple online accounts considered an extremely hazardous practice?",
        options: [
          "It causes your computer memory to fill up five times faster.",
          "If a single low-security site experiences a data breach, automated bots will test that identical password on your email, banking, and social accounts (Credential Stuffing).",
          "Web browsers will automatically revoke your user profile after 30 days.",
          "It prevents web pages from loading CSS stylesheets."
        ],
        correctIndex: 1,
        explanation: "Credential stuffing is an automated cyberattack where criminals use massive databases of stolen credentials from past breaches to log into hundreds of other major online services where victims reused the same password."
      },
      {
        module: 'passwords',
        moduleName: 'Password Hygiene & MFA',
        question: "Why do modern cybersecurity standards strongly recommend hardware security keys (FIDO2 / WebAuthn) over SMS-based Two-Factor Authentication?",
        options: [
          "SMS is only available during standard business hours.",
          "SMS messages are vulnerable to telecom SIM-swapping, mobile malware, and on-path interception.",
          "Hardware security keys are required by federal law for personal web accounts.",
          "SMS verification requires installing a heavy mobile app."
        ],
        correctIndex: 1,
        explanation: "SMS text messages travel in cleartext across telecom infrastructure and are susceptible to SIM-swapping attacks. FIDO2 hardware keys (like YubiKey) use public-key cryptography origin-bound to the exact website domain, neutralizing phishing proxies."
      },
      {
        module: 'passwords',
        moduleName: 'Password Hygiene & MFA',
        question: "How does a reputable zero-knowledge password manager (e.g. Bitwarden, 1Password) protect your master vault?",
        options: [
          "It stores master passwords in cleartext on a public Google Drive sheet.",
          "Vault data is encrypted and decrypted locally on your device using keys derived from your master password; the cloud host never possesses the decryption key.",
          "It relies entirely on Windows Defender to hide files.",
          "It sends your unencrypted passwords to the software company via SMS."
        ],
        correctIndex: 1,
        explanation: "Zero-knowledge architecture ensures that only ciphertext is sent to synchronization servers. Even if the password manager company is compromised or subpoenaed, attackers only see encrypted data they cannot decrypt without your local master key."
      }
    ],

    browsing: [
      {
        module: 'browsing',
        moduleName: 'Safe Browsing & Networks',
        question: "When connecting your laptop to an open, password-free Wi-Fi network at an airport or coffee shop, what is the primary security risk?",
        options: [
          "Your laptop's screen brightness will be remotely manipulated.",
          "Eavesdroppers on the same network can inspect unencrypted traffic, capture session cookies, and perform rogue DNS redirection.",
          "Your laptop battery will drain at triple the normal rate.",
          "The router will automatically delete your installed applications."
        ],
        correctIndex: 1,
        explanation: "Open networks lack link-layer encryption. Any user on the same Wi-Fi can run packet sniffers or set up rogue 'Evil Twin' access points to manipulate DNS queries and snoop on cleartext data."
      },
      {
        module: 'browsing',
        moduleName: 'Safe Browsing & Networks',
        question: "What does the padlock icon and 'https://' in your browser's address bar signify?",
        options: [
          "The website has been thoroughly vetted and guaranteed 100% legitimate by law enforcement.",
          "Communication between your browser and the remote server is encrypted using TLS, but the website itself could still be a fraudulent phishing site.",
          "The website contains zero malware or tracking scripts.",
          "The website cannot store any cookies on your device."
        ],
        correctIndex: 1,
        explanation: "HTTPS guarantees encrypted in-transit communication and server identity matching the domain certificate. However, criminals can easily acquire free TLS certificates for phishing websites (e.g. 'https://fake-login-bank.com')."
      },
      {
        module: 'browsing',
        moduleName: 'Safe Browsing & Networks',
        question: "How does an encrypted Virtual Private Network (VPN) protect your privacy on untrusted networks?",
        options: [
          "It completely makes your computer immune to downloading viruses.",
          "It encapsulates all incoming and outgoing IP traffic in an encrypted tunnel to the VPN server, hiding destination URLs and DNS queries from local network eavesdroppers.",
          "It automatically deletes all emails older than 7 days.",
          "It blocks all physical access to your laptop ports."
        ],
        correctIndex: 1,
        explanation: "A VPN routes your network packets through an encrypted tunnel (using protocols like WireGuard or OpenVPN). Eavesdroppers on public Wi-Fi or local ISPs see only obfuscated ciphertext routed to the VPN exit node."
      },
      {
        module: 'browsing',
        moduleName: 'Safe Browsing & Networks',
        question: "Why does private browsing (Incognito Mode) fail to completely prevent third-party tracking across the web?",
        options: [
          "Incognito mode only works if your monitor is turned off.",
          "Incognito deletes local cookies/cache upon closing, but websites can still track you via IP addresses, browser fingerprinting, and account logins.",
          "It requires a paid monthly subscription to enable encryption.",
          "It only protects downloads, not web browsing."
        ],
        correctIndex: 1,
        explanation: "Incognito mode is purely a local hygiene tool preventing your family or roommates from viewing your local browsing history. Websites and ad networks can still track you via IP geolocation and browser fingerprinting."
      }
    ],

    threats: [
      {
        module: 'threats',
        moduleName: 'Ransomware & Zero-Days',
        question: "Your organization experiences a ransomware outbreak that encrypts local hard drives. Which backup strategy guarantees full recovery without paying the extortion fee?",
        options: [
          "Keeping a daily backup synced to an always-connected external USB drive.",
          "A 3-2-1 backup strategy with an immutable, air-gapped or offline offsite copy that cannot be reached or overwritten over the network.",
          "Saving files in two different subfolders on the same computer.",
          "Trusting Google Drive or OneDrive default version history alone."
        ],
        correctIndex: 1,
        explanation: "Modern ransomware systematically traverses mapped network shares and connected external drives to encrypt backups too. Only an isolated, immutable (write-once-read-many) or air-gapped backup copy guarantees recovery."
      },
      {
        module: 'threats',
        moduleName: 'Ransomware & Zero-Days',
        question: "What distinguishes a 'Zero-Day' vulnerability from standard common software bugs?",
        options: [
          "It can only be exploited during the first day of every calendar month.",
          "It is a vulnerability known to attackers but completely unknown to the vendor, leaving zero days for a protective patch before potential weaponization.",
          "It only affects computers that have zero antivirus software installed.",
          "It automatically self-destructs after 24 hours of infection."
        ],
        correctIndex: 1,
        explanation: "A 'Zero-Day' exploit means the security community and software vendor have had 'zero days' to prepare or release a patch because threat actors discovered or utilized the flaw before discovery by developers."
      },
      {
        module: 'threats',
        moduleName: 'Ransomware & Zero-Days',
        question: "Why is the Principle of Least Privilege (PoLP) essential for reducing the blast radius of malware infections?",
        options: [
          "It automatically limits user internet speeds during non-working hours.",
          "Users and processes operate with only the minimum privileges required; if compromised, malware cannot silently modify system files or install kernel drivers.",
          "It forces all passwords to be at least 50 characters long.",
          "It prevents employees from opening more than three browser tabs."
        ],
        correctIndex: 1,
        explanation: "Malware executes with the security context of the user who triggered it. Operating as a standard non-administrative account prevents malicious payloads from modifying the Windows registry, tampering with drivers, or infecting system directories."
      },
      {
        module: 'threats',
        moduleName: 'Ransomware & Zero-Days',
        question: "An employee receives an urgent call from someone who sounds convincingly like their company CEO demanding an emergency financial transfer. What emerging threat is at play?",
        options: [
          "Bluetooth signal jamming.",
          "AI voice cloning / deepfake audio vishing using synthetic voice models trained on public corporate interviews or podcasts.",
          "Cryptocurrency mining exhaustion.",
          "DNS cache poisoning."
        ],
        correctIndex: 1,
        explanation: "Generative AI voice synthesis models can clone a target's vocal tone, pitch, and cadence using under 30 seconds of public audio. Organizations counter this using strict multi-person verification procedures and spoken challenge phrases."
      }
    ]
  };

  // Compile 'all' module list containing all 16 questions
  questionsByModule.all = [
    ...questionsByModule.phishing,
    ...questionsByModule.passwords,
    ...questionsByModule.browsing,
    ...questionsByModule.threats
  ];

  const moduleMetadata = {
    all: {
      title: "Comprehensive Security Assessment",
      desc: "16 Scenario questions testing phishing heuristics, passphrase entropy, hardware MFA, network defense, and ransomware mitigation.",
      tag: "Module: All Topics (16 Questions)"
    },
    phishing: {
      title: "Module 1: Phishing & Deception Awareness",
      desc: "4 Targeted questions on typo-squatted domains, urgent coercion, quishing, and malicious attachments.",
      tag: "Module: Phishing & Deception (4 Questions)"
    },
    passwords: {
      title: "Module 2: Password Hygiene & MFA Architectures",
      desc: "4 Targeted questions on passphrase entropy, credential stuffing, password managers, and FIDO2 keys.",
      tag: "Module: Passwords & MFA (4 Questions)"
    },
    browsing: {
      title: "Module 3: Safe Browsing & Network Defense",
      desc: "4 Targeted questions on public Wi-Fi risks, TLS 1.3 encryption, VPN tunnels, and browser tracker mitigation.",
      tag: "Module: Safe Browsing & Wi-Fi (4 Questions)"
    },
    threats: {
      title: "Module 4: Ransomware & Threat Mitigation",
      desc: "4 Targeted questions on air-gapped immutable backups, zero-day vulnerabilities, least privilege, and AI voice cloning.",
      tag: "Module: Ransomware & Zero-Days (4 Questions)"
    }
  };

  // State
  let currentModule = 'all';
  let activeQuestions = questionsByModule.all;
  let currentQuestion = 0;
  let score = 0;
  let selectedOption = null;

  // DOM Elements
  const moduleChips = document.querySelectorAll('.quiz-chip-btn[data-quiz-module]');
  const activeModuleTagEl = document.getElementById('quizActiveModuleTag');
  const bannerTitleEl = document.getElementById('quizBannerTitle');
  const bannerDescEl = document.getElementById('quizBannerDesc');

  const counterEl = document.getElementById('quizQuestionCounter');
  const scoreEl = document.getElementById('quizScoreText');
  const barFillEl = document.getElementById('quizProgressBarFill');
  const questionTextEl = document.getElementById('quizQuestionText');
  const optionsListEl = document.getElementById('quizOptionsList');
  const expBoxEl = document.getElementById('quizExplanationBox');
  const expTitleEl = document.getElementById('quizExpTitle');
  const expTextEl = document.getElementById('quizExpText');
  const nextBtnEl = document.getElementById('quizNextBtn');
  const activeViewEl = document.getElementById('quizActiveView');
  const resultsScreenEl = document.getElementById('quizResultsScreen');
  const retakeBtnEl = document.getElementById('quizRetakeBtn');
  const allModulesBtnEl = document.getElementById('quizAllModulesBtn');

  const resultBadgeIcon = document.getElementById('resultBadgeIcon');
  const resultBadgeRank = document.getElementById('resultBadgeRank');
  const resultScoreStat = document.getElementById('resultScoreStat');
  const resultFeedbackText = document.getElementById('resultFeedbackText');

  if (!questionTextEl) return;

  // Update badge count numbers in chips
  const countAll = document.getElementById('countAll');
  const countPhishing = document.getElementById('countPhishing');
  const countPasswords = document.getElementById('countPasswords');
  const countBrowsing = document.getElementById('countBrowsing');
  const countThreats = document.getElementById('countThreats');

  if (countAll) countAll.textContent = questionsByModule.all.length;
  if (countPhishing) countPhishing.textContent = questionsByModule.phishing.length;
  if (countPasswords) countPasswords.textContent = questionsByModule.passwords.length;
  if (countBrowsing) countBrowsing.textContent = questionsByModule.browsing.length;
  if (countThreats) countThreats.textContent = questionsByModule.threats.length;

  // Function to switch module
  function setQuizModule(moduleId) {
    if (!questionsByModule[moduleId]) moduleId = 'all';
    currentModule = moduleId;
    activeQuestions = questionsByModule[moduleId];
    currentQuestion = 0;
    score = 0;

    // Update Chips UI
    moduleChips.forEach(chip => {
      if (chip.dataset.quizModule === moduleId) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    // Update Module Banner & Tag
    const meta = moduleMetadata[moduleId] || moduleMetadata.all;
    if (activeModuleTagEl) {
      activeModuleTagEl.innerHTML = `<i class="fa-solid fa-bullseye"></i> ${meta.tag}`;
    }
    if (bannerTitleEl) {
      bannerTitleEl.textContent = meta.title;
    }
    if (bannerDescEl) {
      bannerDescEl.textContent = meta.desc;
    }

    // Reset View
    activeViewEl.style.display = 'block';
    resultsScreenEl.classList.remove('active');
    loadQuestion(0);
  }

  // Expose globally so external buttons (e.g. from Services tab) can activate modules
  window.selectQuizModule = function(moduleId) {
    setQuizModule(moduleId);
  };

  // Bind clicks on module chips
  moduleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      setQuizModule(chip.dataset.quizModule);
    });
  });

  // Load a single question
  function loadQuestion(idx) {
    selectedOption = null;
    const q = activeQuestions[idx];

    if (counterEl) counterEl.textContent = `Question ${idx + 1} of ${activeQuestions.length}`;
    if (scoreEl) scoreEl.textContent = `${score}`;
    if (barFillEl) barFillEl.style.width = `${((idx + 1) / activeQuestions.length) * 100}%`;

    questionTextEl.textContent = q.question;
    optionsListEl.innerHTML = '';
    expBoxEl.classList.remove('active');
    nextBtnEl.style.display = 'none';

    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `
        <span class="quiz-opt-letter">${letters[optIdx]}</span>
        <span>${optText}</span>
      `;
      btn.addEventListener('click', () => handleOptionSelect(optIdx));
      optionsListEl.appendChild(btn);
    });
  }

  function handleOptionSelect(optIdx) {
    if (selectedOption !== null) return;
    selectedOption = optIdx;

    const q = activeQuestions[currentQuestion];
    const isCorrect = optIdx === q.correctIndex;
    const optionButtons = optionsListEl.querySelectorAll('.quiz-opt-btn');

    // Disable all options and show colors
    optionButtons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correctIndex) {
        btn.classList.add('correct');
      } else if (i === optIdx && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    if (isCorrect) {
      score += 10;
      if (scoreEl) scoreEl.textContent = `${score}`;
      expTitleEl.className = 'quiz-exp-title correct';
      expTitleEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Correct Recommendation';
    } else {
      expTitleEl.className = 'quiz-exp-title wrong';
      expTitleEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> High-Risk Recommendation';
    }

    expTextEl.textContent = q.explanation;
    expBoxEl.classList.add('active');
    nextBtnEl.style.display = 'inline-flex';
  }

  nextBtnEl.addEventListener('click', () => {
    if (currentQuestion < activeQuestions.length - 1) {
      currentQuestion++;
      loadQuestion(currentQuestion);
    } else {
      showResults();
    }
  });

  function showResults() {
    activeViewEl.style.display = 'none';
    resultsScreenEl.classList.add('active');

    const totalPossible = activeQuestions.length * 10;
    const percentage = Math.round((score / totalPossible) * 100);

    resultScoreStat.textContent = `You scored ${score} / ${totalPossible} (${percentage}%)`;

    const moduleName = moduleMetadata[currentModule]?.title || 'Assessment';

    if (percentage >= 90) {
      resultBadgeIcon.innerHTML = '<i class="fa-solid fa-shield-halved" style="color: #00f2fe;"></i>';
      resultBadgeRank.textContent = `${currentModule === 'all' ? 'Cyber Sentinel' : 'Module Master'}`;
      resultBadgeRank.style.color = '#00f2fe';
      resultFeedbackText.textContent = `Outstanding work on ${moduleName}! You demonstrate exemplary security awareness across modern threat vectors and defensive countermeasures.`;
    } else if (percentage >= 70) {
      resultBadgeIcon.innerHTML = '<i class="fa-solid fa-user-shield" style="color: #10b981;"></i>';
      resultBadgeRank.textContent = 'Security Defender';
      resultBadgeRank.style.color = '#10b981';
      resultFeedbackText.textContent = `Solid defense fundamentals on ${moduleName}! You recognize core attack patterns. Consider reviewing the corresponding guide in the Services tab to reach 100%.`;
    } else {
      resultBadgeIcon.innerHTML = '<i class="fa-solid fa-graduation-cap" style="color: #f59e0b;"></i>';
      resultBadgeRank.textContent = 'Cyber Apprentice';
      resultBadgeRank.style.color = '#f59e0b';
      resultFeedbackText.textContent = `A valuable learning opportunity on ${moduleName}. These threat patterns catch millions of people every year. Re-read the interactive guide in the Services tab and try again!`;
    }
  }

  retakeBtnEl?.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    activeViewEl.style.display = 'block';
    resultsScreenEl.classList.remove('active');
    loadQuestion(0);
  });

  allModulesBtnEl?.addEventListener('click', () => {
    setQuizModule('all');
  });

  // Initialize with All Topics
  setQuizModule('all');
}

/* ==========================================================================
   8. Contact Tab: Form Validation & Incident Response Triage
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFormFeedback');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      feedback.className = 'form-feedback-alert';
      feedback.style.display = 'flex';
      feedback.style.background = 'rgba(239, 68, 68, 0.15)';
      feedback.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      feedback.style.color = '#f87171';
      feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please complete all required fields before submitting.';
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.className = 'form-feedback-alert';
      feedback.style.display = 'flex';
      feedback.style.background = 'rgba(239, 68, 68, 0.15)';
      feedback.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      feedback.style.color = '#f87171';
      feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please provide a valid email address.';
      return;
    }

    // Simulate encrypted submission state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Encrypting Payload...';

    setTimeout(() => {
      const ticketNum = 'CS-' + Math.floor(100000 + Math.random() * 900000);
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Submit Encrypted Inquiry';

      feedback.className = 'form-feedback-alert success';
      feedback.style.display = 'flex';
      feedback.innerHTML = `
        <div>
          <div style="font-weight: 700; margin-bottom: 0.2rem;">
            <i class="fa-solid fa-check"></i> Inquiry Securely Dispatched [Ref: ${ticketNum}]
          </div>
          <div style="font-size: 0.825rem; opacity: 0.9;">
            Thank you, ${name}. Our security team has received your message and will review it promptly.
          </div>
        </div>
      `;
      form.reset();
    }, 900);
  });
}

/* ==========================================================================
   9. Footer Newsletter Subscription
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const successBox = document.getElementById('newsletterSuccess');

  if (!form || !successBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    successBox.style.display = 'block';
  });
}
