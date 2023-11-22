
let traerProductos = async () => {
    let URL = "https://jsonplaceholder.typicode.com/photos";
    let errorContenido = `<h2>Error :( </h2>`

    let aMostrar;

    try{
        let peticion = await fetch(URL)
        let respuesta = await peticion.json();

        respuesta.forEach(post => {
            aMostrar += `
                ${post.URL}

            `
        });
    }catch(err){
        console.log(errorContenido, err)
    }finally{

    }
}