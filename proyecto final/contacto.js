let formularioContacto = document.getElementById("contact-form");
let nombre = document.querySelector(".nombre").value;
let telefono = document.querySelector(".phone-number").value;
let comensales = document.querySelector(".comensales").value
let errorNombre = document.querySelector(".errorNombre")
let errorTelefono = document.querySelector(".errorTelefono")
let errorComensales = document.querySelector(".errorComensales")


formularioContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    let entrar = false;
    errorNombre.innerText = ""
    errorComensales.innerText = ""
    errorTelefono.innerText = ""

    if(nombre.length < 3){
        errorNombre.innerText = "El nombre debe tener al menos 3 letras."
        entrar = true;
    }

    if(typeof telefono !== "number"){
        errorTelefono.innerText = "Debes registrar un numero."
        entrar = true;
    }

    if(typeof comensales !== "number"){
        errorComensales.innerText = "Indique cuantas personas asistiran."
        entrar = true;
    }

    if(entrar){
        
        Swal.fire({
            position: "top",
            icon: "success",
            title: `Bienvenido ${nombre}`,
            showConfirmButton: false,
            timer: 1500
          });
    }
})