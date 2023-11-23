let hora = document.querySelector(".hour")
let horaLocal = () => {
    hora.innerHTML = new Date().toLocaleString()

}
setInterval(horaLocal, 1000)


let formularioContacto = document.getElementById("contact-form");
let nombre = document.querySelector(".nombre");
let telefono = document.querySelector(".phone-number");
let comensales = document.querySelector(".comensales");
let errorNombre = document.querySelector(".errorNombre")
let errorTelefono = document.querySelector(".errorTelefono")
let errorComensales = document.querySelector(".errorComensales")


formularioContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    errorNombre.innerText = ""
    errorComensales.innerText = ""
    errorTelefono.innerText = ""
    let entrar = false;

    if(nombre.value.length < 3){
        errorNombre.innerText = "El nombre debe tener al menos 3 letras."
        entrar = true;
    }

    if(telefono.value.length < 3){
        errorTelefono.innerText = "Debes registrar un numero."
        entrar = true;
    }

    if(comensales.value.length === 0){
        errorComensales.innerText = "Indique cuantas personas asistiran."
        entrar = true;
    }

    if(!entrar){
        
        
        Swal.fire({
            position: "top",
            icon: "success",
            title: `Reserva hecha, ${nombre.value}!`,
            showConfirmButton: false,
            timer: 1500
          });
    }
})