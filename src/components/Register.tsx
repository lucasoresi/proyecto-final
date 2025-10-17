import { useEffect, useState } from "react";
import  "./../components/css/register.css";
import { useNavigate } from "react-router-dom";
import supabase from '@/config/spabaseClient';
import { set } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { se } from "date-fns/locale";
import { useAuth } from "./auth/AuthProvider";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name === "" || email === "" || password === "") {
            setError(true);
            toast({
            title: "Error",
            description: "Hubo un error al iniciar sesión. Por favor, intentá nuevamente.",
            });
            return;
        }
        const {data, error} = await supabase
        .from('usuarios')
        .insert([{email, password, name}])
        .select();
        if (error) {
            setError(true);
            toast({
            title: "Error",
            description: "Hubo un error al iniciar sesión. Por favor, intentá nuevamente.",
        });
        return;
        }
        if (data) {
            setError(false);
            console.log(data);
            auth.isAuthenticated = true;
            navigate("/main");
            toast({
            title: "Éxito",
            description: "Te has registrado correctamente.",
        });
            
        }
    }
    useEffect(() => {
        console.log(auth.isAuthenticated);
    }, []);



    return(
    <section className="register-page">
        <div className="register-card">
        <h2 className="register-title">Registrarse</h2>

        <form onSubmit={handleSubmit}>

            <div className="from-grup">
            <label>Nombre
            <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresá tu nombre"
            />
            </label>
            </div>
            <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresá tu email"
            />
            </div>

            <div className="form-group">
            <label>Contraseña</label>
            <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresá tu contraseña"
            />
            </div>

            {error && (
            <p className="error-msg">Por favor completá todos los campos.</p>
            )}

            <button type="submit" className="btn-submit" >
            Entrar
            </button>
        </form>

       
        </div>
    </section>
);
}

export default Register;