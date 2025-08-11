// app.js - Código para la interactividad (click/hover)  
document.querySelectorAll('.casilla').forEach(casilla => {  
    // Móvil (click)  
    casilla.addEventListener('click', () => {  
        casilla.classList.toggle('activo');  
    });  
    // PC (hover)  
    casilla.addEventListener('mouseleave', () => {  
        casilla.classList.remove('activo');  
    });  
});  