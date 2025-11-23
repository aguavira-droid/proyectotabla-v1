// archivo: mapa.js - Tabla periódica interactiva Fase II

const canvas = document.getElementById('tablaCanvas');
const ctx = canvas.getContext('2d');
const recuadroInfo = document.getElementById('recuadro-info');

// Configuración de casillas
const casillas = [
  { idElemento: 1, x: 10, y: 10, ancho: 110, alto: 110 },
  { idElemento: 2, x: 130, y: 10, ancho: 110, alto: 110 },
  { idElemento: 3, x: 250, y: 10, ancho: 110, alto: 110 }
];

// Datos de elementos de ejemplo
const elementos = {
  1: { img: 'assets/amigos/Amigo001.png', simbolo: 'H', nombre: 'Hidrógeno' },
  2: { img: 'assets/amigos/Amigo002.png', simbolo: 'He', nombre: 'Helio' },
  3: { img: 'assets/amigos/Amigo003.png', simbolo: 'Li', nombre: 'Litio' }
};

// Estado actual
let hoverElemento = null;

// Función para dibujar hover pequeño
function dibujarHover() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (hoverElemento) {
    const el = elementos[hoverElemento.idElemento];
    const img = new Image();
    img.src = el.img;
    img.onload = () => {
      ctx.drawImage(img, hoverElemento.x, hoverElemento.y, hoverElemento.ancho, hoverElemento.alto);
    };
  }
}

// Mousemove - detectar hover
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  let found = false;
  for (let c of casillas) {
    if (mouseX >= c.x && mouseX <= c.x + c.ancho &&
        mouseY >= c.y && mouseY <= c.y + c.alto) {
      hoverElemento = c;
      found = true;
      break;
    }
  }
  if (!found) hoverElemento = null;
  dibujarHover();
});

// Mouseleave del canvas - limpiar hover
canvas.addEventListener('mouseleave', () => {
  hoverElemento = null;
  dibujarHover();
});

// Click - mostrar recuadro grande
canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  for (let c of casillas) {
    if (mouseX >= c.x && mouseX <= c.x + c.ancho &&
        mouseY >= c.y && mouseY <= c.y + c.alto) {
      mostrarInfo(c.idElemento);
      return;
    }
  }
});

// Mostrar información en recuadro grande
function mostrarInfo(idElemento) {
  const el = elementos[idElemento];
  recuadroInfo.innerHTML = `
    <img src="${el.img}" width="500" height="500">
    <p>${el.simbolo} - ${el.nombre}</p>
  `;
  recuadroInfo.style.display = 'block';

  // Desaparece al salir del recuadro
  recuadroInfo.onmouseleave = () => {
    ocultarInfo();
  };
}

// Ocultar recuadro grande
function ocultarInfo() {
  recuadroInfo.style.display = 'none';
  recuadroInfo.innerHTML = '';
  recuadroInfo.onmouseleave = null;
}
