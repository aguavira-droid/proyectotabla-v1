const fs = require('fs');//archivo generarElementos.js
const path = require('path');

// Configuración de los recuadros
const anchoRec = 110;
const altoRec = 110;
const inicioX = -100;
const inicioY = 149;

// Lista de todos los elementos (simbolo y nombre)
const elementos = [
  { simbolo: "H", nombre: "Hidrógeno" },
  { simbolo: "He", nombre: "Helio" },
  { simbolo: "Li", nombre: "Litio" },
  { simbolo: "Be", nombre: "Berilio" },
  { simbolo: "B", nombre: "Boro" },
  { simbolo: "C", nombre: "Carbono" },
  { simbolo: "N", nombre: "Nitrógeno" },
  { simbolo: "O", nombre: "Oxígeno" },
  { simbolo: "F", nombre: "Flúor" },
  { simbolo: "Ne", nombre: "Neón" },
  { simbolo: "Na", nombre: "Sodio" },
  { simbolo: "Mg", nombre: "Magnesio" },
  { simbolo: "Al", nombre: "Aluminio" },
  { simbolo: "Si", nombre: "Silicio" },
  { simbolo: "P", nombre: "Fósforo" },
  { simbolo: "S", nombre: "Azufre" },
  { simbolo: "Cl", nombre: "Cloro" },
  { simbolo: "Ar", nombre: "Argón" },
  { simbolo: "K", nombre: "Potasio" },
  { simbolo: "Ca", nombre: "Calcio" },
  { simbolo: "Sc", nombre: "Escandio" },
  { simbolo: "Ti", nombre: "Titanio" },
  { simbolo: "V", nombre: "Vanadio" },
  { simbolo: "Cr", nombre: "Cromo" },
  { simbolo: "Mn", nombre: "Manganeso" },
  { simbolo: "Fe", nombre: "Hierro" },
  { simbolo: "Co", nombre: "Cobalto" },
  { simbolo: "Ni", nombre: "Níquel" },
  { simbolo: "Cu", nombre: "Cobre" },
  { simbolo: "Zn", nombre: "Zinc" },
  { simbolo: "Ga", nombre: "Galio" },
  { simbolo: "Ge", nombre: "Germanio" },
  { simbolo: "As", nombre: "Arsénico" },
  { simbolo: "Se", nombre: "Selenio" },
  { simbolo: "Br", nombre: "Bromo" },
  { simbolo: "Kr", nombre: "Kriptón" },
  { simbolo: "Rb", nombre: "Rubidio" },
  { simbolo: "Sr", nombre: "Estroncio" },
  { simbolo: "Y", nombre: "Itrio" },
  { simbolo: "Zr", nombre: "Circonio" },
  { simbolo: "Nb", nombre: "Niobio" },
  { simbolo: "Mo", nombre: "Molibdeno" },
  { simbolo: "Tc", nombre: "Tecnecio" },
  { simbolo: "Ru", nombre: "Rutenio" },
  { simbolo: "Rh", nombre: "Rodio" },
  { simbolo: "Pd", nombre: "Paladio" },
  { simbolo: "Ag", nombre: "Plata" },
  { simbolo: "Cd", nombre: "Cadmio" },
  { simbolo: "In", nombre: "Indio" },
  { simbolo: "Sn", nombre: "Estaño" },
  { simbolo: "Sb", nombre: "Antimonio" },
  { simbolo: "Te", nombre: "Telurio" },
  { simbolo: "I", nombre: "Yodo" },
  { simbolo: "Xe", nombre: "Xenón" },
  { simbolo: "Cs", nombre: "Cesio" },
  { simbolo: "Ba", nombre: "Bario" },
  { simbolo: "La", nombre: "Lantano" },
  { simbolo: "Ce", nombre: "Cerio" },
  { simbolo: "Pr", nombre: "Praseodimio" },
  { simbolo: "Nd", nombre: "Neodimio" },
  { simbolo: "Pm", nombre: "Prometio" },
  { simbolo: "Sm", nombre: "Samario" },
  { simbolo: "Eu", nombre: "Europio" },
  { simbolo: "Gd", nombre: "Gadolinio" },
  { simbolo: "Tb", nombre: "Terbio" },
  { simbolo: "Dy", nombre: "Disprosio" },
  { simbolo: "Ho", nombre: "Holmio" },
  { simbolo: "Er", nombre: "Erbio" },
  { simbolo: "Tm", nombre: "Tulio" },
  { simbolo: "Yb", nombre: "Iterbio" },
  { simbolo: "Lu", nombre: "Lutecio" },
  { simbolo: "Hf", nombre: "Hafnio" },
  { simbolo: "Ta", nombre: "Tantalio" },
  { simbolo: "W", nombre: "Wolframio" },
  { simbolo: "Re", nombre: "Renio" },
  { simbolo: "Os", nombre: "Osmio" },
  { simbolo: "Ir", nombre: "Iridio" },
  { simbolo: "Pt", nombre: "Platino" },
  { simbolo: "Au", nombre: "Oro" },
  { simbolo: "Hg", nombre: "Mercurio" },
  { simbolo: "Tl", nombre: "Talio" },
  { simbolo: "Pb", nombre: "Plomo" },
  { simbolo: "Bi", nombre: "Bismuto" },
  { simbolo: "Po", nombre: "Polonio" },
  { simbolo: "At", nombre: "Astato" },
  { simbolo: "Rn", nombre: "Radón" },
  { simbolo: "Fr", nombre: "Francio" },
  { simbolo: "Ra", nombre: "Radio" },
  { simbolo: "Ac", nombre: "Actinio" },
  { simbolo: "Th", nombre: "Torio" },
  { simbolo: "Pa", nombre: "Protactinio" },
  { simbolo: "U", nombre: "Uranio" },
  { simbolo: "Np", nombre: "Neptunio" },
  { simbolo: "Pu", nombre: "Plutonio" },
  { simbolo: "Am", nombre: "Americio" },
  { simbolo: "Cm", nombre: "Curio" },
  { simbolo: "Bk", nombre: "Berkelio" },
  { simbolo: "Cf", nombre: "Californio" },
  { simbolo: "Es", nombre: "Einsteinio" },
  { simbolo: "Fm", nombre: "Fermio" },
  { simbolo: "Md", nombre: "Mendelevio" },
  { simbolo: "No", nombre: "Nobelio" },
  { simbolo: "Lr", nombre: "Lawrencio" },
  { simbolo: "Rf", nombre: "Rutherfordio" },
  { simbolo: "Db", nombre: "Dubnio" },
  { simbolo: "Sg", nombre: "Seaborgio" },
  { simbolo: "Bh", nombre: "Bohrio" },
  { simbolo: "Hs", nombre: "Hassio" },
  { simbolo: "Mt", nombre: "Meitnerio" },
  { simbolo: "Ds", nombre: "Darmstadtio" },
  { simbolo: "Rg", nombre: "Roentgenio" },
  { simbolo: "Cn", nombre: "Copernicio" },
  { simbolo: "Nh", nombre: "Nihonio" },
  { simbolo: "Fl", nombre: "Flerovio" },
  { simbolo: "Mc", nombre: "Moscovio" },
  { simbolo: "Lv", nombre: "Livermorio" },
  { simbolo: "Ts", nombre: "Tenesino" },
  { simbolo: "Og", nombre: "Oganesón" }

  // ... Completa hasta los 118 elementos
];

// Matriz que representa la tabla periódica (índices de elementos o null si vacía)
const tablaPrincipal = [
  [0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1], // H, He
  [2, 3, null, null, null, null, null, null, null, null, null, null, 4, 5, 6, 7, 8, 9], // Li → Ne
  [10,11,null, null, null, null, null, null, null, null, null, null, 12, 13, 14, 15, 16, 17],
  [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
  [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],
  [54,55,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85],
  [86,87,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117],

];
  // Completar todas las filas principales
const tablaTierrasRaras = [
  [null, null, null, null, 56,57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,68,69], // La → Dy
  [null, null, null, null, 88,89,90,91,92,93,94,95,96,97,98,99,100,101], // Ho → Lu
];
let elementosConPosicion = [];

// Generar elementos de la tabla principal
// tablaPrincipal.push(Array(18).fill(null));// Opcional a [Null,...]

tablaPrincipal.forEach((fila, filaIdx) => {
  fila.forEach((elementoIdx, colIdx) => {
    if (elementoIdx === null) return;

    elementosConPosicion.push({
      ...elementos[elementoIdx],
      posicion_x: inicioX + colIdx * anchoRec,
      posicion_y: inicioY + filaIdx * altoRec,
      ancho: anchoRec,
      alto: altoRec,
      imagen_amigo: `assets/amigos/placeholder${elementoIdx + 1}.png`,
      propiedades: {}
    });
  });
});

// Generar elementos de tierras raras
tablaTierrasRaras.forEach((fila, filaIdx) => {
  fila.forEach((elementoIdx, colIdx) => {
    if (elementoIdx === null) return;

    elementosConPosicion.push({
      ...elementos[elementoIdx],
      posicion_x: inicioX + colIdx * anchoRec,
      posicion_y: inicioY + (filaIdx + 8) * altoRec, // desplazamiento de 7 filas
      ancho: anchoRec,
      alto: altoRec,
      imagen_amigo: `assets/amigos/placeholder${elementoIdx + 1}.png`,
      propiedades: {}
    });
  });
});

// Crear objeto final
const tablaJSON = {
  titulo: "Tabla Periódica Interactiva",
  dimensiones: { ancho: 1916, alto: 1800 },
  elementos: elementosConPosicion
};

// Guardar en elementos.json
const rutaArchivo = path.join(__dirname, 'elementos.json');
fs.writeFileSync(rutaArchivo, JSON.stringify(tablaJSON, null, 2));

console.log(`Archivo elementos.json generado con ${elementosConPosicion.length} elementos.`);
