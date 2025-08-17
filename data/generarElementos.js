const fs = require('fs');
const path = require('path');

// Configuración de la tabla
const anchoRec = 110;
const altoRec = 110;
const inicioX = -12;
const inicioY = 149;

// Definimos filas y columnas
const filasPrincipales = 7;
const colsPrincipales = 18;
const filasEspeciales = 2;
const colsEspeciales = 14;
const inicioFilaEspecial = 9;
const inicioColEspecial = 5;

// Lista de elementos de ejemplo (solo con símbolos y nombres)
const elementos = [
  { simbolo: "H", nombre: "Hidrógeno" },
  { simbolo: "He", nombre: "Helio" },
  { simbolo: "Li", nombre: "Litio" },
  { simbolo: "Be", nombre: "Berilio" },
  // ... agrega todos los elementos que necesites
];

// Array donde se guardarán los elementos con posiciones
let elementosConPosicion = [];

// Generamos posiciones principales
for (let fila = 0; fila < filasPrincipales; fila++) {
  for (let col = 0; col < colsPrincipales; col++) {
    const idx = fila * colsPrincipales + col;
    if (idx >= elementos.length) break;

    elementosConPosicion.push({
      ...elementos[idx],
      posicion_x: inicioX + col * anchoRec,
      posicion_y: inicioY + fila * altoRec,
      ancho: anchoRec,
      alto: altoRec,
      imagen_amigo: `assets/amigos/placeholder${idx + 1}.jpg`,
      propiedades: {}
    });
  }
}

// Generamos posiciones especiales (filas 9-10)
for (let fila = 0; fila < filasEspeciales; fila++) {
  for (let col = 0; col < colsEspeciales; col++) {
    const idx = filasPrincipales * colsPrincipales + fila * colsEspeciales + col;
    if (idx >= elementos.length) break;

    elementosConPosicion.push({
      ...elementos[idx],
      posicion_x: inicioX + (inicioColEspecial - 1 + col) * anchoRec,
      posicion_y: inicioY + (inicioFilaEspecial - 1 + fila) * altoRec,
      ancho: anchoRec,
      alto: altoRec,
      imagen_amigo: `assets/amigos/placeholder${idx + 1}.jpg`,
      propiedades: {}
    });
  }
}

// Guardamos en elementos.json dentro de la carpeta data
const rutaArchivo = path.join(__dirname, 'elementos.json');
fs.writeFileSync(rutaArchivo, JSON.stringify(elementosConPosicion, null, 2));

console.log(`Archivo elementos.json generado con ${elementosConPosicion.length} elementos.`);
