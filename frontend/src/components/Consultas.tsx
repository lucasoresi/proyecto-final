import { useEffect, useState } from "react";
import supabase from '@/config/spabaseClient';
import TarjetaConsulta from "./tajetas/tarjetaConsultas";
import "./../components/css/Consultas.css";

const Consultas = () => { 
    const [error, setError] = useState(false);
    const [consultas, setConsultas] = useState([]);
    const [orderBy, setorderBy] = useState('date');
    const [loading, setLoading] = useState(true);//hacer despues

    const handleDelete = (id) => {
        setConsultas(prevConsultas => 
            prevConsultas.filter(cons => cons.id !== id)
        );
    }

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const {data, error} = await supabase
                .from('agendar_consultas')
                .select('*')
                .order(orderBy, { ascending: false });

                if (error) {
                    setError(true);
                    return;
                }
                if (data) {
                    setConsultas(data);
                    setError(false)
                }
            }catch (error) {
                console.error("Error fetching consultas:", error);
                setError(true);
            }
        }
        fetchConsultas();
    }, [orderBy]);
    return (
        <div className="consultas-container">
            <div>
                {error && <p>Hubo un error al cargar las consultas.</p>}
                {consultas && (
                    <div className="orderBy">
                        <p>Ordenar por:</p>
                        <button onClick={() => setorderBy('date')}>Fecha</button>
                        <button onClick={() => setorderBy('id')}>ID</button>
                    </div>
                )}
            </div>
            <div>
                {consultas && (
                    <div className="consultas">
                        {consultas.map(consulta =>(
                            <TarjetaConsulta key={consulta.id} consulta={consulta} onDelete={handleDelete} />
                        )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Consultas;