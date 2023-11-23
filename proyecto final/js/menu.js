//   HEADER
let hora = document.querySelector(".hour")
let horaLocal = () => {
    hora.innerHTML = new Date().toLocaleString()

}
setInterval(horaLocal, 1000)

// TRAER INFO MEDIANTE API, NO ENCOTRE UNA QUE TERNGA ESPECIFICAMENTE LO QUE QUERIA, POR ESO ELEGI ESA.
const galeriaContenedor = document.querySelector(".galeria-contenedor")

async function getData(){
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/photos")
    const fotos = await respuesta.json();
    
    fotos.forEach( foto => {

        const card = document.createElement("div")
        card.className = "galeria"

        const imagen = document.createElement("img")
        imagen.src = foto.url;

        const titulo = document.createElement("h3")
        titulo.textContent = foto.title

        card.append(imagen, titulo)
        galeriaContenedor.append(card)
    });
}

getData();