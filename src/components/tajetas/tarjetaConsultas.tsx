import supabase from "@/config/spabaseClient";

const TarjetaConsulta = ({consulta, onDelete}) =>{
   const handleDelete = async () => { 
        try  {
                if (!confirm("¿Estás seguro de eliminar esta consulta?")) {
                    return;
                }
            const {data, error} = await supabase
                .from('agendar_consultas')
                .delete()
                .eq('id', consulta.id)
                .select();
                
                
                if(error){
                    console.error("Error deleting consulta:", error);
                    return;
                }
                if(data){
                    console.log("Consulta deleted:", data);
                    onDelete(consulta.id);
            }
        } catch (error) {
        console.error("Unexpected error deleting consulta:", error);
        }
   }
    return(
        <div className="consulta-tarjeta">
            <h1>Nombre: {consulta.name}</h1>
            <p>Modalidad: {consulta.modalidad}</p>
            <p>Email: {consulta.email}</p>
            <p>Teléfono: {consulta.phone}</p>
            <p>Fecha de solicitud: {consulta.date}</p>
            <div className="consulta-delete">
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    )
}

export default TarjetaConsulta