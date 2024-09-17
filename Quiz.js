//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"¿Que significan las siglas (RAEE)?",
        op0:"Residuos de aparatos eléctricos y electrónicos",
        op1:"Residuos almacenados especiales empacados",
        op2:"Residuos aprovechables estables especiales",
        correcta:"0"
    },
    {
        id:1,
        pregunta:"¿En que consiste la regla de las tres R?",
        op0:"Reducir, Reutilizar y Reincorporar",
        op1:"Reciclar, Reducir y Recuperar",
        op2:"Reducir, Reutilizar y Reciclar",
        correcta:"1"
    },
    {
        id:2,
        pregunta:"¿Qué tipo de residuos se consideran residuos domésticos?",
        op0:"Residuos generados en hogares y servicios",
        op1:"Residuos generados en la construcción",
        op2:"Residuos generados en industrias",
        correcta:"0"
    },
    {
        id:3,
        pregunta:"Corrosivos, reactivos hacen referencia a residuos",
        op0:"Peligroso",
        op1:"No aprovechables",
        op2:"Aprovechables",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"¿Cuales son los residuos aprovechables?",
        op0:"Peligrosos, residuos generales",
        op1:"Vidrio, papel, cartón y metal",
        op2:"Peligroso, plásticos y orgánicos",
        correcta:"2"
    },
    {
        id:5,
        pregunta:"¿Que residuos se pueden depositar en el recipiente amarillo?",
        op0:"Latas de conserva, chatarra, restos de comida",
        op1:"Botellas plásticas, bolsas plásticas, cartón",
        op2:"Clavos, chatarra y latas de conserva",
        correcta:"0"
    },
    {
        id:6,
        pregunta:"El esquema de gestion de residuos se da así:",
        op0:"Generacion, separacion, disposicio final, almacenamiento, aprovechamiento, recoleccion",
        op1:"Generacion,Separacion, recoleccion y transporte, almacenamiento, disposicion final",
        op2:"Generacion, separacion, almacenamiento, recoleccion y tansporte, aprovechamiento, disposicion final",
        correcta:"2"
    },
    {
        id:7,
        pregunta:"Se conoce como separación",
        op0:"Al proceso de clasificación",
        op1:"Al proceso de transporte",
        op2:"Al proceso de recolección",
        correcta:"0"
    },
    {
        id:8,
        pregunta:"De acuerdo a la clasificación de los colores de las bolsas los residuos se disponen de la siguiente manera:",
        op0:"Bolsa negra: no aprovechables, bolsa blanca: aprovechables, bolsa verde: orgánicos",
        op1:"Bolsa verde: Orgánicos, bolsa negra: aprovechables, bolsa blanca: no aprovechables",
        op2:"Bolsa blanca: no aprovechables, bolsa negra: orgánicos, bolsa verde: aprovechables",
        correcta:"1"
    },
    {
        id:9,
        pregunta:"Una de las medidas para disminuir el uso de plastico",
        op0:"Recicla tu basura al menos en orgánicos e inorgánicos",
        op1:"Lavar los plásticos de un solo uso",
        op2:"No usar bolsas de plástico, lleva bolsas de tela o recicladas al supermercado",
        correcta:"2"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}