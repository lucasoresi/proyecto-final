import { useEffect, useState } from "react";
import  "./../components/css/register.css";
import { useNavigate } from "react-router-dom";
import supabase from '@/config/spabaseClient';
import { set } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { se, tr } from "date-fns/locale";
import { useAuth } from "./auth/AuthProvider";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [errorexist, setErrorexist] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(name === "" || email === "" || password === "") {
                setErrorexist(false);
                setError(true);
                toast({
                title: "Error",
                description: "Hubo un error al iniciar sesión. Por favor, intentá nuevamente.",
                });
                return;
            }

            const {data: existingUser, error: fetchError} = await supabase
            .from('usuarios')
            .select('email')
            .eq('email', email)
            .maybeSingle();

            if (fetchError) {
                setError(true);
                toast({
                    title: "Error",
                    description: "Hubo un error al verificar el email. Por favor, intentá nuevamente.",
                    duration: 3000,
                });
                return;
            }
            if (existingUser){
                setError(false);
                setErrorexist(true);

                
                toast({
                    title: "Error",
                    description: "El email ya está registrado. Por favor, usá otro.",
                    duration: 3000,
                });
                return;
            }
            

            const {data, error} = await supabase
            .from('usuarios')
            .insert([{email, password, name}])
            .select(); 
            localStorage.setItem('userName', data[0].name);           
            if (error) {
                setError(true);
                toast({
                title: "Error",
                description: "Hubo un error al iniciar sesión. Por favor, intentá nuevamente.",
                duration: 3000,
            });
            return;
            }
            if (data) {
            setError(false);
            auth.isAuthenticated = true;
            navigate("/main");
            toast({
                title: "Éxito",
                description: "Te has registrado correctamente.",
                duration: 3000,
            });
            }
        
        }catch (err) {
            toast({
                title: "Error",
                description: "Hubo un error al iniciar sesión. Por favor, intentá nuevamente.",
                duration: 3000,
            });
            return;
    }
    };


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
            {errorexist && (
            <p className="error-msg">El email ya está registrado. Por favor, usá otro.</p>
            )}
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