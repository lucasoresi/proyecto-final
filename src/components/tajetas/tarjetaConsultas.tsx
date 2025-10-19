import supabase from "@/config/spabaseClient";
import { error } from "console";

const TarjetaConsulta = ({consulta, onDelete}) =>{
   const handleDelete = async () => {
        const {data, error} = await supabase
        .from('agendar_consultas')
        .delete()
        .eq('id', consulta.id)
        .select('*');
        
        if(error){
            console.error("Error deleting consulta:", error);
            return;
        }
        if(data){
            onDelete(consulta.id);
        }
   }
    return(
        <div className="consulta-tarjeta">
            <h1>{consulta.name}</h1>
            <p>{consulta.message}</p>
            <p>{consulta.email}</p>
            <p>{consulta.phone}</p>
            <p>{consulta.date}</p>
            <div className="consulta-delete">
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    )
}

export default TarjetaConsulta