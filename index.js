console.log("conectado") // Mensaje en la consola para verificar que el script se ha cargado
console.log("-----     -----     -----") // Separador visual en la consola
// Seleccion de div´s
const pantalla = document.getElementById("pantalla");
const button = document.querySelectorAll(".button");
const historial = document.getElementById("historial");

// Función para evaluar expresiones matemáticas de forma segura
function evaluarExpresion(expresion) {
    try {
        // Permite solo números y los operadores básicos
        const resultado = Function('"use strict"; return (' + expresion + ')')(); // 'use strict' activa el modo estricto para evitar errores comunes
        return resultado;
    } catch (error) {
        return "¡Error!"; // Si hay un error, devuelve "¡Error!"
    }
}

// Función para agregar operaciones al historial
function agregarAlHistorial(operacion) {
    const nuevaOperacion = document.createElement("div"); // Crea un nuevo div para la operación
    nuevaOperacion.textContent = operacion; // Establece el texto del nuevo div
    historial.appendChild(nuevaOperacion); // Añade la nueva operación al div de historial
    historial.scrollTop = historial.scrollHeight; // Desplaza el scroll al final del historial
}

// Función para reiniciar el historial
function reiniciarHistorial() {
    historial.innerHTML = ""; // Limpia todo el contenido del div de historial
    const tituloHistorial = document.createElement("h1"); // Crea un nuevo h1
    tituloHistorial.textContent = "Historial"; // Establece el texto del nuevo h1
    historial.appendChild(tituloHistorial); // Añade el nuevo h1 al div de historial
}

// Recorre cada botón y añade un evento de clic
button.forEach(element => {
    element.addEventListener("click", () => { // Añade un listener para el evento de clic
        const buttonApretado = element.textContent; // Obtiene el texto del botón presionado
        
        // Lógica para el botón de reinicio
        if(element.id === "reset"){
            pantalla.textContent = "0";
            reiniciarHistorial(); // Reinicia el historial al presionar AC
            return;
        }
       
        // Lógica para el botón de borrar
        if(element.id === "borrar"){
            // Verifica si la longitud del texto en pantalla es 1 o si muestra un error
            if(pantalla.textContent.length === 1 || pantalla.textContent === "¡Error!"){
                pantalla.textContent = "0"; // Si es así, restablece la pantalla a 0
            }else{
                pantalla.textContent = pantalla.textContent.slice(0, -1); // Elimina el último carácter
            }
            return;
        }

        // Lógica para el botón de igual
        if(element.id === "igual"){
            // Evalúa la expresión y muestra el resultado
            pantalla.textContent = evaluarExpresion(pantalla.textContent);
            const operacion = " = " + pantalla.textContent;
            // Agrega la operación al historial
            agregarAlHistorial(operacion); 
            return;
        }
        
        // Lógica para los demás botones numéricos y de operaciones
        if(pantalla.textContent === "0" || pantalla.textContent === "¡Error!"){
            pantalla.textContent = buttonApretado; // Si la pantalla es 0 o muestra error, muestra el número presionado
        } else {
            pantalla.textContent += buttonApretado; // De lo contrario, añade el número presionado a la pantalla
        }
    });
});