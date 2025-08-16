document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-interactivo');
    const imagenTabla = document.getElementById('imagen-tabla');
    const contenedorTabla = document.getElementById('contenedor-tabla');
    const interaccionElemento = document.getElementById('interaccion-elemento');
    let ctx = null; 

    let elementos = [];
    let elementoHover = null;
    let elementoActivo = null;

    const tamanoInteraccion = 100;

    const ajustarCanvas = () => {
        if (imagenTabla && canvas) {
            canvas.width = imagenTabla.offsetWidth;
            canvas.height = imagenTabla.offsetHeight;
            ctx = canvas.getContext('2d');
        } else {
            console.error("No se pudo encontrar la imagen de la tabla o el canvas.");
        }
    };

    const cargarElementos = async () => {
        try {
            const respuesta = await fetch('data/elementos.json');
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            elementos = await respuesta.json();
        } catch (error) {
            console.error('Error al cargar los datos de los elementos. Por favor, asegúrate de usar un servidor web local:', error);
        }
    };

    const posicionarElementoInteractivo = (elemento) => {
        const left = elemento.posicion_x + contenedorTabla.offsetLeft + (elemento.ancho / 2) - (tamanoInteraccion / 2);
        const top = elemento.posicion_y + contenedorTabla.offsetTop + (elemento.alto / 2) - (tamanoInteraccion / 2);
        
        interaccionElemento.style.left = `${left}px`;
        interaccionElemento.style.top = `${top}px`;
        interaccionElemento.classList.remove('oculto');
    };

    const manejarHover = (e) => {
        if (!ctx || !elementos || !elementos.elementos) return; 

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let nuevoElementoHover = null;
        for (const elemento of elementos.elementos) {
            const { posicion_x, posicion_y, ancho, alto } = elemento;
            if (x >= posicion_x && x <= posicion_x + ancho && y >= posicion_y && y <= posicion_y + alto) {
                nuevoElementoHover = elemento;
                break;
            }
        }
        
        if (nuevoElementoHover && nuevoElementoHover !== elementoHover) {
            // Si el mouse se mueve a un nuevo elemento, mostramos la imagen.
            interaccionElemento.style.backgroundImage = `url(${nuevoElementoHover.imagen_amigo})`;
            interaccionElemento.innerHTML = '';
            
            posicionarElementoInteractivo(nuevoElementoHover);
            elementoHover = nuevoElementoHover;
        } else if (!nuevoElementoHover && elementoHover && elementoActivo === null) {
            // Si el mouse se va y no hay un elemento clicado, lo ocultamos.
            interaccionElemento.classList.add('oculto');
            elementoHover = null;
        }
    };

    const manejarClick = () => {
        // ✅ CAMBIO AQUÍ: La lógica de clic ahora se basa en el elemento que está activo en ese momento.
        if (elementoActivo) {
            // Si hay un elemento activo, lo desactivamos y volvemos a mostrar el hover.
            interaccionElemento.style.backgroundImage = `url(${elementoActivo.imagen_amigo})`;
            interaccionElemento.innerHTML = '';
            elementoActivo = null;
        } else if (elementoHover) {
            // Si no hay elemento activo, pero sí uno en hover, lo activamos.
            interaccionElemento.style.backgroundImage = 'none';
            interaccionElemento.innerHTML = `
                ${elementoHover.simbolo}<br>
                ${elementoHover.nombre}
            `;
            elementoActivo = elementoHover;
        }
    };

    const inicializar = async () => {
        if (imagenTabla.complete) {
            ajustarCanvas();
            await cargarElementos(); 
            canvas.addEventListener('mousemove', manejarHover);
            interaccionElemento.addEventListener('click', manejarClick); // ✅ CAMBIO AQUÍ
        } else {
            imagenTabla.addEventListener('load', async () => {
                ajustarCanvas();
                await cargarElementos(); 
                canvas.addEventListener('mousemove', manejarHover);
                interaccionElemento.addEventListener('click', manejarClick); // ✅ CAMBIO AQUÍ
            });
        }
    };

    inicializar();
});