//   HEADER
let hora = document.querySelector(".hour")
let horaLocal = () => {
    hora.innerHTML = new Date().toLocaleString()

}
setInterval(horaLocal, 1000)

//  MAIN
let eventos = [
    {name: "Karaoke", when: "fridays", hour: "20hs"},
    {name: "Happy Hour", when: "everyday", hour: "19pm - 21pm"},
    {name: "Sunday Brunch", when: "sundays", hour: "11am"}
];
let divEventos = document.querySelector(".events-main")

eventos.forEach( evento => {
    let eventoContainer = document.createElement("div");
    eventoContainer.classList.add("evento-container")
    eventoContainer.innerHTML = `<h2>${evento.name}</h2>
                                <h4>${evento.when}</h4>
                                <p>${evento.hour}</p>`;

    divEventos.appendChild(eventoContainer)
            
})
