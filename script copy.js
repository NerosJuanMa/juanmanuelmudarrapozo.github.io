
// Declarar 'root' e 'icon' fuera de la función de inicialización
// para que el event listener (la función del click) pueda acceder a ellas.

const root = document.documentElement; // ¡Ahora 'root' es accesible!
const modeToggle = document.getElementById('modeToggle');
const icon = modeToggle.querySelector('.icon');  

// Envuelve el código dentro de una función de inicialización si es necesario, 
// o simplemente ejecuta el código secuencialmente.
(function initDarkToggle(){
    
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 1. Aplicar el tema inicial (guardado o del sistema)
    if(saved === 'dark' || (!saved && systemDark)){
      root.classList.add('dark-mode');
      icon.textContent = '☀️';
    }
    
    // 2. Definir el event listener para el click
    modeToggle.addEventListener('click', () => {
      // ✅ 'root' es accesible aquí ahora.
      root.classList.toggle('dark-mode'); 
      
      const active = root.classList.contains('dark-mode');
      localStorage.setItem('theme', active ? 'dark' : 'light');
      
      // Animar icono
      icon.style.opacity = '0';
      setTimeout(()=>{ 
          icon.textContent = active ? '☀️' : '🌙'; 
          icon.style.opacity = '1'; 
      }, 160);
    });
    
})(); // Asegúrate de que tu función IIFE esté correctamente cerrada si la usas

//generar fecha actual
// Obtener la fecha y hora actual
        const fecha = new Date();

        // Obtener el elemento span por su ID
        const contenedorFecha = document.getElementById('fechaActual');
        const contenedorFechah = document.getElementById('fechaActualh');
        // Formatear la fecha para mostrarla según la configuración local del usuario
        // 'es-ES' especifica el formato para España, puedes cambiarlo si necesitas otro.
        // Las opciones { dateStyle: 'full' } dan un formato completo (ej: lunes, 10 de noviembre de 2025)
        const fechaFormateada = fecha.toLocaleDateString('es-ES', { dateStyle: 'full' });

        // Insertar la fecha formateada en el elemento HTML
        contenedorFecha.textContent = fechaFormateada;
        contenedorFechah.textContent = fechaFormateada;



//AUDIO FONDO PULSO CORAZON
    const audio = document.getElementById("bg-audio");
    const btn = document.getElementById("audio-btn");

    audio.volume = 0.25;

    btn.addEventListener("click", () => {
        if (audio.muted) {
            audio.muted = false;
            btn.classList.remove("audio-off");
            btn.textContent = "🔊";
        } else {
            audio.muted = true;
            btn.classList.add("audio-off");
            btn.textContent = "🔇";
        }
    });

    window.addEventListener("click", function enableAudio() {
    const audio = document.getElementById("bg-audio");
    audio.muted = false;
    audio.play();
    window.removeEventListener("click", enableAudio);
});

//BOTONES FLOTANTES - COMPARTIR

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    })
    .then(() => console.log('Compartido con éxito'))
    .catch((error) => console.error('Error al compartir', error));
  } else {
    alert('Tu navegador no soporta compartir automáticamente');
  }
}

//COTADOR DE LIKES

const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');

// Claves únicas para ESTA página
const PAGE_KEY = 'likes_mi_pagina';
const USER_LIKED_KEY = 'user_liked_mi_pagina';

// Obtener likes actuales
let likes = parseInt(localStorage.getItem(PAGE_KEY)) || 0;
let userLiked = localStorage.getItem(USER_LIKED_KEY) === 'true';

// Inicializar contador
likeCount.textContent = likes;

// Si ya dio like
if (userLiked) {
  likeBtn.classList.add('liked');
  likeBtn.disabled = true;
}

// Click en Like
likeBtn.addEventListener('click', () => {
  if (!userLiked) {
    likes++;
    localStorage.setItem(PAGE_KEY, likes);
    localStorage.setItem(USER_LIKED_KEY, 'true');

    likeCount.textContent = likes;
    likeBtn.classList.add('liked');
    likeBtn.disabled = true;
  }
});


// OTRO LIKE

const pageId = 'mi_pagina_unica';
const btn_like = document.getElementById('likeBtn');
const count = document.getElementById('likeCount');

// Estado inicial
fetch(`http://localhost:3000/status?page_id=${pageId}`)
  .then(res => res.json())
  .then(data => {
    count.textContent = data.total;
    if (data.liked) btn_like.classList.add('liked');
  });

btn_like.addEventListener('click', () => {
  fetch('http://localhost:3000/like', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page_id: pageId })
  })
  .then(res => res.json())
  .then(data => {
    count.textContent = data.total;
    btn_like.classList.toggle('liked', data.liked);
    pop();
    if (data.liked) hearts();
  });
});

function pop() {
  btn_like.classList.add('pop');
  setTimeout(() => btn_like.classList.remove('pop'), 200);
}

function hearts() {
  for (let i = 0; i < 6; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = '❤️';
    const r = btn_like.getBoundingClientRect();
    h.style.left = (r.left + Math.random() * r.width) + 'px';
    h.style.top = r.top + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  }
}


//poppup:
const poppup = document.getElementById("poppup");
const zona = document.getElementById("zona-hover");


if (window.innerWidth > 768) {   

// Mostrar poppup al cargar la página
window.onload = () => {
    poppup.style.display = "block";

    // Ocultarlo después de 3 segundos =3000
    setTimeout(() => {
        poppup.style.display = "none";
    }, 25000);
};

// Mostrar al pasar el ratón
zona.addEventListener("mouseenter", () => {
    poppup.style.display = "block";
});

// Ocultar al quitar el ratón
zona.addEventListener("mouseleave", () => {
    poppup.style.display = "none";
});
}

//Cabecera3
document.addEventListener('DOMContentLoaded', (event) => {
    const roleContainer = document.querySelector('.header__role');
    const roles = roleContainer.querySelectorAll('.role-item');
    let currentRoleIndex = 0;
    
    // --- NUEVAS Y AJUSTADAS VARIABLES DE CONFIGURACIÓN ---
    const typingSpeed = 75;      // Velocidad de escritura (ms por letra)
    const eraseSpeed = 25;       // Velocidad de borrado (ms por letra)
    
    const stopAtChar = 10;       // ✨ NÚMERO DE CARACTERES DONDE SE DETENDRÁ LA ESCRITURA.
    const pauseAtStop = 100;    // ✨ TIEMPO DE ESPERA EN LA DETENCIÓN INTERMEDIA (ms).
    const delayBeforeErase = 1500; // Pausa antes de que comience el borrado final (ms).
    
    // --- FUNCIÓN PRINCIPAL PARA INICIAR EL CICLO (MODIFICADA LA PAUSA) ---
    async function startTypingCycle() {
        while (true) {
            const currentRole = roles[currentRoleIndex];
            const text = currentRole.textContent;
            
            // Asegurarse de que solo el rol actual sea visible/activo
            roles.forEach(role => role.classList.remove('active'));
            currentRole.classList.add('active');

            // 1. ESCRIBIR (Type)
            await typeText(currentRole, text);
            
            // 2. PAUSA FINAL (Delay) - Usa la nueva variable
            await new Promise(resolve => setTimeout(resolve, delayBeforeErase));
            
            // 3. BORRAR (Erase)
            await eraseText(currentRole);
            
            // 4. CICLO AL SIGUIENTE ROL
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        }
    }
    
    // --- typeText MODIFICADA CON PAUSA INTERMEDIA ---
    function typeText(element, fullText) {
        return new Promise(resolve => {
            let currentWidth = 0;
            let isPaused = false; // Bandera para controlar la pausa

            const typeInterval = setInterval(async () => {
                // Si estamos en pausa, no hacemos nada y salimos de la iteración
                if (isPaused) return; 

                // Lógica de Detención y Pausa
                if (currentWidth === stopAtChar && stopAtChar < fullText.length) {
                    isPaused = true;
                    // Detiene la escritura, espera, y luego la reanuda
                    await new Promise(pauseResolve => setTimeout(pauseResolve, pauseAtStop));
                    isPaused = false;
                }

                // Lógica de Escritura
                if (currentWidth < fullText.length) {
                    currentWidth += 1;
                    element.style.width = currentWidth + 'ch';
                }
                
                // Lógica de Finalización
                if (currentWidth >= fullText.length) {
                    clearInterval(typeInterval);
                    resolve();
                }
            }, typingSpeed);
        });
    }

    // --- eraseText (Sin cambios, para borrar el texto completo) ---
    function eraseText(element) {
        return new Promise(resolve => {
            // Se puede simplificar a element.textContent.length ya que typeText
            // garantiza que el ancho final es igual a la longitud del texto.
            let currentWidth = element.textContent.length; 

            const eraseInterval = setInterval(() => {
                // Disminuimos el ancho
                currentWidth -= 1;
                element.style.width = currentWidth + 'ch';
                
                // Comprobar si hemos terminado de borrar
                if (currentWidth <= 0) {
                    clearInterval(eraseInterval);
                    element.classList.remove('active'); // Ocultar después de borrar
                    resolve();
                }
            }, eraseSpeed);
        });
    }

    // Iniciar el ciclo de escritura
    startTypingCycle();
});


// Seleccionar elementos
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Toggle del menú al hacer clic
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});



//Cabecera2_ 

    // document.addEventListener('DOMContentLoaded', (event) => {
    //     const roleContainer = document.querySelector('.header__role2');
    //     const roles = roleContainer.querySelectorAll('.role-item');
    //     let currentRoleIndex = 0;
    //     const typingSpeed = 75;  // Velocidad de escritura (ms por letra)
    //     const eraseSpeed = 25;   // Velocidad de borrado (ms por letra)
    //     const delayBetweenRoles = 10; // Pausa después de escribir antes de borrar (ms)

    //     // --- Función principal para iniciar el ciclo ---
    //     async function startTypingCycle() {
    //         while (true) {
    //             const currentRole = roles[currentRoleIndex];
    //             const text = currentRole.textContent;
                
    //             // Asegurarse de que solo el rol actual sea visible/activo
    //             roles.forEach(role => role.classList.remove('active'));
    //             currentRole.classList.add('active');

    //             // 1. ESCRIBIR (Type)
    //             await typeText(currentRole, text);
                
    //             // 2. PAUSA (Delay)
    //             await new Promise(resolve => setTimeout(resolve, delayBetweenRoles));
                
    //             // 3. BORRAR (Erase)
    //             await eraseText(currentRole);
                
    //             // 4. CICLO AL SIGUIENTE ROL
    //             currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    //         }
    //     }
        
    //     // --- Funciones de utilidad para escribir y borrar ---

    //     // Revela el texto letra a letra (aumentando el ancho)
    //     function typeText(element, fullText) {
    //         return new Promise(resolve => {
    //             let currentWidth = 0;
    //             const totalWidth = element.scrollWidth; // Ancho total del texto
                
    //             const typeInterval = setInterval(() => {
    //                 // Aumentamos el ancho en un pequeño porcentaje o cantidad fija
    //                 currentWidth += 1; // Incremento por "letra" (ajustado por JS)
    //                 element.style.width = currentWidth + 'ch'; // Usamos 'ch' para unidades de ancho de caracter
                    
    //                 // Comprobar si hemos terminado de escribir
    //                 if (currentWidth >= fullText.length) {
    //                     clearInterval(typeInterval);
    //                     resolve();
    //                 }
    //             }, typingSpeed);
    //         });
    //     }

    //     // Oculta el texto letra a letra (disminuyendo el ancho)
    //     function eraseText(element) {
    //         return new Promise(resolve => {
    //             // Obtenemos el ancho actual (que debe ser el ancho total)
    //             let currentWidth = element.scrollWidth / (window.innerWidth / element.getBoundingClientRect().width) * (element.textContent.length / 1.1) + 1;

    //             // Si no podemos calcular bien, empezamos desde el ancho que debería ser
    //             if (currentWidth <= 1) {
    //                 currentWidth = element.textContent.length;
    //             }
                
    //             const eraseInterval = setInterval(() => {
    //                 // Disminuimos el ancho
    //                 currentWidth -= 1;
    //                 element.style.width = currentWidth + 'ch';
                    
    //                 // Comprobar si hemos terminado de borrar
    //                 if (currentWidth <= 0) {
    //                     clearInterval(eraseInterval);
    //                     element.classList.remove('active'); // Ocultar después de borrar
    //                     resolve();
    //                 }
    //             }, eraseSpeed);
    //         });
    //     }

    //     // Iniciar el ciclo de escritura
    //     startTypingCycle();
    // });


//CABECERA MOSTRAR ROLES
// document.addEventListener('DOMContentLoaded', (event) => {
//         const roles = document.querySelectorAll('.header__role .role-item');
//         let currentRoleIndex = 0;
//         const delay = 3000; // Tiempo en milisegundos (3 segundos) que se muestra cada rol

//         function updateRole() {
//             // 1. Inicia el proceso de ocultar el rol visible actual
//             roles[currentRoleIndex].classList.remove('visible');
            
//             // 2. Calcula el índice del siguiente rol
//             // Usa el operador módulo (%) para volver al inicio (0) cuando se alcanza el final.
//             currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            
//             // 3. Muestra el siguiente rol después de un pequeño retraso
//             // Este retraso (p. ej., 50ms) ayuda a que la animación de fade-out del CSS se complete,
//             // aunque el navegador lo maneja casi instantáneamente.
//             setTimeout(() => {
//                 roles[currentRoleIndex].classList.add('visible');
//             }, 50); // Un pequeño retraso para asegurar la transición

//         }

//         // Ejecuta la función 'updateRole' cada 'delay' milisegundos
//         setInterval(updateRole, delay);
//     });