import { useState } from "react";
import  "./../components/css/login.css";
import { useNavigate } from "react-router-dom";
import supabase from '@/config/spabaseClient';
import { set } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { se } from "date-fns/locale";
import { useAuth } from "./auth/AuthProvider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        if (!email || !password) {
            setError(true);
            toast({
                title: "Error",
                description: "Completá email y contraseña.",
            });
            return;
        }
        try {

            const { data, error: queryError } = await supabase
                .from("usuarios")
                .select("*")
                .eq("email", email)
                .maybeSingle();

                if (queryError) {
                    console.error("Supabase error:", queryError);
                    toast({
                    title: "Error",
                    description: "Hubo un problem, intena de nuevo.",
                    });
                    return;
                }

        
                if (!data || data.password !== password) {
                    setError(true);
                    toast({
                    title: "Credenciales inválidas",
                    description: "Email o contraseña incorrectos.",
                    });
                    return;
                }

                auth.isAuthenticated = true;
                localStorage.setItem('userName', data.name ?? '');
                navigate("/main");
                toast({
                    title: "Bienvenido",
                    description: "Has iniciado sesión correctamente.",
                });
                } catch (err) {
                console.error(err);
                toast({
                    title: "Error",
                    description: "Error al iniciar sesión. Intentá nuevamente.",
                });
        }
  };


    return(
    <section className="login-page">
        <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
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

        <p className="register-text">
            ¿No tenés cuenta? <a href="/Register" >Registrate</a>
        </p>
        </div>
    </section>
);
}

export default Login;