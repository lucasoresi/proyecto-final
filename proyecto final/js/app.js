//   HEADER
let hora = document.querySelector(".hour")
let horaLocal = () => {
    hora.innerHTML = new Date().toLocaleString()

}
setInterval(horaLocal, 1000)

//  MAIN
let eventos = [
    {name: "Karaoke", when: "viernes", hour: "20hs"},
    {name: "Happy Hour", when: "lunes a domingos", hour: "19pm - 21pm"},
    {name: "Sunday Brunch", when: "sabados", hour: "11am"},
    {name: "Till' the end", when: "jueves", hour: "20pm"}
];
let divEventos = document.querySelector(".events-main")

// CARGAR EVENTOS
eventos.forEach( evento => {
    let eventoContainer = document.createElement("div");
    eventoContainer.classList.add("evento-container")
    eventoContainer.innerHTML = `
                                <hr class="divisor top">
                                <h2>${evento.name}</h2>
                                <p>Veni a disfrutar del ${evento.name}, con nosotros de ${evento.hour} todos los ${evento.when}</p>
                                <h4>${evento.when}</h4>
                                <p>${evento.hour}</p>
                                <hr class="divisor bottom">`;

    divEventos.appendChild(eventoContainer)
            
});

// CONTACT FORM

