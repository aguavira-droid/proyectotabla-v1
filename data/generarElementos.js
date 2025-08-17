const fs = require('fs');
const path = require('path');

/* ========= Configuración de la tabla (ajustaremos después si hace falta) ========= */
const anchoRec = 110;   // ancho de cada “recuadro” de la tabla
const altoRec  = 110;   // alto de cada “recuadro”
const inicioX  = -12;   // offset X desde el borde izquierdo de la imagen
const inicioY  = 149;   // offset Y desde la parte superior de la imagen

// Bloque principal (períodos 1–7 en la tabla superior)
const filasPrincipales = 7;
const colsPrincipales  = 18;

// Bloques especiales (lantánidos y actínidos, 2 filas en la parte inferior)
const filasEspeciales  = 2;
const colsEspeciales   = 14;
const inicioFilaEspecial = 9; // la fila “visual” donde empiezan (contando desde 1)
const inicioColEspecial  = 5; // la columna “visual” donde empiezan (contando desde 1)

/* ========= Elementos (por ahora, ejemplo corto; luego pondremos los 118) ========= */
const elementos = [
  { simbolo: "H",  nombre: "Hidrógeno" },
  { simbolo: "He", nombre: "Helio" },
  { simbolo: "Li", nombre: "Litio" },
  { simbolo: "Be", nombre: "Berilio" },
  // TODO: aquí añadiremos el resto hasta 118
];

/* ========= Generación de posiciones ========= */
const elementosConPosicion = [];

// Generar posiciones del bloque principal (7x18)
for (let fila = 0; fila < filasPrincipales; fila++) {
  for (let col = 0; col < colsPrincipales; col++) {
    const idx = fila * colsPrincipales + col;
    if (idx >= elementos.length) break;

    elementosConPosicion.push({
      ...elementos[idx],
      posicion_x: inicioX + col  * anchoRec,
      posicion_y: inicioY + fila * altoRec,
      ancho: anchoRec,
      alto: altoRec,
      imagen_amigo: `assets/amigos/placeholder${idx + 1}.jpg`,
      propiedades: {}
    });
  }
}

// Generar posiciones de las filas especiales (lantánidos/actínidos)
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

/* ========= Envolvemos en la estructura que tu app espera ========= */
const tablaPeriodica = {
  titulo: "Tabla Periódica Interactiva",
  dimensiones: { ancho: 1916, alto: 1800 },
  elementos: elementosConPosicion
};

/* ========= Guardado en data/elementos.json ========= */
const rutaArchivo = path.join(__dirname, 'elementos.json');
fs.writeFileSync(rutaArchivo, JSON.stringify(tablaPeriodica, null, 2), 'utf-8');

console.log(`Archivo elementos.json generado con ${elementosConPosicion.length} elementos.`);
