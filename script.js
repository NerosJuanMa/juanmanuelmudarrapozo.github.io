// ==========================
// 🌙 DARK MODE TOGGLE
// ==========================

const root = document.documentElement;
const modeToggle = document.getElementById('modeToggle');
const icon = modeToggle?.querySelector('.icon');

(function initDarkToggle() {
  if (!modeToggle || !icon) return;

  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'dark' || (!saved && systemDark)) {
    root.classList.add('dark-mode');
    icon.textContent = '☀️';
  }

  modeToggle.addEventListener('click', () => {
    root.classList.toggle('dark-mode');

    const active = root.classList.contains('dark-mode');
    localStorage.setItem('theme', active ? 'dark' : 'light');

    icon.style.opacity = '0';
    setTimeout(() => {
      icon.textContent = active ? '☀️' : '🌙';
      icon.style.opacity = '1';
    }, 160);
  });
})();

// ==========================
// 📅 FECHA ACTUAL
// ==========================

const fecha = new Date();
const contenedorFecha = document.getElementById('fechaActual');
const contenedorFechah = document.getElementById('fechaActualh');

if (contenedorFecha && contenedorFechah) {
  const fechaFormateada = fecha.toLocaleDateString('es-ES', { dateStyle: 'full' });
  contenedorFecha.textContent = fechaFormateada;
  contenedorFechah.textContent = fechaFormateada;
}

// ==========================
// 🔊 AUDIO FONDO
// ==========================

const audio = document.getElementById('bg-audio');
const btn = document.getElementById('audio-btn');

if (audio && btn) {
  audio.volume = 0.25;

  btn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    btn.textContent = audio.muted ? '🔇' : '🔊';
    btn.classList.toggle('audio-off', audio.muted);
  });

  window.addEventListener('click', function enableAudio() {
    audio.muted = false;
    audio.play().catch(() => {});
    window.removeEventListener('click', enableAudio);
  });
}

// ==========================
// 📤 SHARE
// ==========================

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    }).catch(() => {});
  } else {
    alert('Tu navegador no soporta compartir automáticamente');
  }
}

// ==========================
// 🔄 RESET DIARIO DE LIKES
// ==========================

const RESET_KEY = 'likes_last_reset';
const today = new Date().toDateString();

const lastReset = localStorage.getItem(RESET_KEY);

if (lastReset !== today) {
  localStorage.setItem('likes_mi_pagina', 0);
  localStorage.setItem('user_liked_mi_pagina', 'false');
  localStorage.setItem(RESET_KEY, today);
}



// ==========================
// ❤️ LIKE (LOCALSTORAGE + TOGGLE)
// ==========================

const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');

if (likeBtn && likeCount) {

  const PAGE_KEY = 'likes_mi_pagina';
  const USER_LIKED_KEY = 'user_liked_mi_pagina';

  let likes = parseInt(localStorage.getItem(PAGE_KEY), 10) || 0;
  let userLiked = localStorage.getItem(USER_LIKED_KEY) === 'true';

  // Inicializar
  likeCount.textContent = likes;
//   animateCount(likeCount, likes);
  if (userLiked) likeBtn.classList.add('liked');

  likeBtn.addEventListener('click', () => {

    if (userLiked) {
      // ❌ QUITAR LIKE
      likes = Math.max(0, likes - 1);
      userLiked = false;

      likeBtn.classList.remove('liked');
    } else {
      // ✅ DAR LIKE
      likes += 1;
      userLiked = true;

      likeBtn.classList.add('liked');

      saveLikeHistory(userLiked ? 'like' : 'unlike');

      pop();
      hearts();
    //   playLikeSound();
    //   safeBurst();

    }


    localStorage.setItem(PAGE_KEY, likes);
    localStorage.setItem(USER_LIKED_KEY, userLiked);

    // likeCount.textContent = likes;
    animateCount(likeCount, likes);
  });

}

function saveLikeHistory(action) {
  const key = 'likes_history';
  const history = JSON.parse(localStorage.getItem(key)) || [];

  history.push({
    action,
    date: new Date().toISOString()
  });

  localStorage.setItem(key, JSON.stringify(history));
}



let pressTimer = null;

likeBtn.addEventListener('mousedown', startPress);
likeBtn.addEventListener('touchstart', startPress);

likeBtn.addEventListener('mouseup', cancelPress);
likeBtn.addEventListener('mouseleave', cancelPress);
likeBtn.addEventListener('touchend', cancelPress);

function startPress(e) {
  e.preventDefault();

  pressTimer = setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(hearts, i * 150);
    }
  }, 600); // ⏱️ tiempo de long-press
}

function cancelPress() {
  clearTimeout(pressTimer);
}

function animateCount(el, to) {
  const from = parseInt(el.textContent, 10) || 0;
  const duration = 300;
  const start = performance.now();

  function frame(time) {
    const progress = Math.min((time - start) / duration, 1);
    el.textContent = Math.floor(from + (to - from) * progress);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}


// <audio id="like-sound" src="like.mp3" preload="auto"></audio>

// const likeSound = document.getElementById('like-sound');

// function playLikeSound() {
//   if (!likeSound) return;
//   likeSound.currentTime = 0;
//   likeSound.volume = 0.25;
//   likeSound.play().catch(() => {});
// }

// let lastBurst = 0;

// function safeBurst() {
//   const now = Date.now();
//   if (now - lastBurst < 500) return;
//   lastBurst = now;
//   hearts(20);
// }

/*
— Reset manual (botón oculto o admin)

Si algún día quieres resetear a mano desde consola:

localStorage.removeItem('likes_mi_pagina');
localStorage.removeItem('user_liked_mi_pagina');


O botón admin:

document.getElementById('resetLikes')?.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
*/


// ==========================
// 💥 ANIMACIONES LIKE
// ==========================

function pop() {
  likeBtn.classList.add('pop');
  setTimeout(() => likeBtn.classList.remove('pop'), 200);
}

// 
function hearts(amount = 12) {
  for (let i = 0; i < amount; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = '❤️';

    // Direcciones aleatorias
    const x = (Math.random() * 300 - 150) + 'px';
    const y = (Math.random() * 300 - 150) + 'px';

    h.style.setProperty('--x', x);
    h.style.setProperty('--y', y);

    document.body.appendChild(h);

    setTimeout(() => h.remove(), 2500);
  }
}

/*-------------------*/
let pressStart = 0;
let heartInterval = null;

likeBtn.addEventListener('mousedown', startPress);
likeBtn.addEventListener('touchstart', startPress);

likeBtn.addEventListener('mouseup', endPress);
likeBtn.addEventListener('mouseleave', endPress);
likeBtn.addEventListener('touchend', endPress);

function startPress(e) {
  e.preventDefault();
  pressStart = Date.now();

  // Vibración inicial
  vibrate(20);

  // Stream continuo de corazones
  heartInterval = setInterval(() => {
    hearts(6);
    vibrate(5);
  }, 300);
}

function endPress() {
  if (!pressStart) return;

  clearInterval(heartInterval);

  const duration = Date.now() - pressStart;
  pressStart = 0;

  // Burst final proporcional al tiempo
  const burstAmount = Math.min(40, Math.floor(duration / 100));
  hearts(burstAmount);

  vibrate(40);
}



// ==========================
// 💬 POPUP
// ==========================

const poppup = document.getElementById('poppup');
const zona = document.getElementById('zona-hover');

if (window.innerWidth > 768 && poppup && zona) {
  window.onload = () => {
    poppup.style.display = 'block';
    setTimeout(() => poppup.style.display = 'none', 25000);
  };

  zona.addEventListener('mouseenter', () => poppup.style.display = 'block');
  zona.addEventListener('mouseleave', () => poppup.style.display = 'none');
}

// ==========================
// ⌨️ CABECERA TYPING
// ==========================

document.addEventListener('DOMContentLoaded', () => {
  const roleContainer = document.querySelector('.header__role');
  if (!roleContainer) return;

  const roles = roleContainer.querySelectorAll('.role-item');
  let index = 0;

  const typingSpeed = 75;
  const eraseSpeed = 25;
  const stopAtChar = 10;
  const pauseAtStop = 100;
  const delayBeforeErase = 1500;

  async function cycle() {
    while (true) {
      const el = roles[index];
      const text = el.textContent;

      roles.forEach(r => r.classList.remove('active'));
      el.classList.add('active');

      await type(el, text);
      await new Promise(r => setTimeout(r, delayBeforeErase));
      await erase(el);

      index = (index + 1) % roles.length;
    }
  }

  function type(el, text) {
    return new Promise(resolve => {
      let w = 0;
      let paused = false;

      const i = setInterval(async () => {
        if (paused) return;

        if (w === stopAtChar && stopAtChar < text.length) {
          paused = true;
          await new Promise(r => setTimeout(r, pauseAtStop));
          paused = false;
        }

        if (w < text.length) {
          w++;
          el.style.width = w + 'ch';
        }

        if (w >= text.length) {
          clearInterval(i);
          resolve();
        }
      }, typingSpeed);
    });
  }

  function erase(el) {
    return new Promise(resolve => {
      let w = el.textContent.length;

      const i = setInterval(() => {
        w--;
        el.style.width = w + 'ch';

        if (w <= 0) {
          clearInterval(i);
          el.classList.remove('active');
          resolve();
        }
      }, eraseSpeed);
    });
  }

  cycle();
});

// ==========================
// 🍔 MENU HAMBURGUESA
// ==========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}
// ==========================
//  Vibracion de Movil
// ==========================
function vibrate(ms) {
  if (navigator.vibrate) {
    navigator.vibrate(ms);
  }
}
