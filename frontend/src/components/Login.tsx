import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@/config/spabaseClient";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/useAuth";
import { useAuthAdmin } from "@/components/auth/useAuthAdmin";
import "./css/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorData, setErrorData] = useState(false);

    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const { setIsAuthenticatedAdmin } = useAuthAdmin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        setErrorData(false);

        if (!email || !password) {
            setError(true);
            return;
        }

        try {
            const tokenResp = await fetch('http://localhost:4000/api/auth/csrf-token', { credentials: 'include' });
            const tokenBody = await tokenResp.json().catch(() => null);
            const csrf = tokenBody?.csrfToken;

            const resp = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf || '' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (!resp.ok) {
                setErrorData(true);
                return;
            }

            const { user } = await resp.json();

            if (!user) {
                setErrorData(true);
                return;
            }

            // ADMIN
            if (email === "equipopsipbbca@gmail.com") {
                setIsAuthenticatedAdmin(true);
                localStorage.setItem("isAuthenticatedAdmin", "true");
                navigate("/admin");
                return;
            }

            // USUARIO NORMAL
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userName", user.email);
            navigate("/main");

        } catch {
            toast({
                title: "Error",
                description: "Error al iniciar sesión",
            });
        }
    };

    return (
        <section className="login-page">
            <div className="login-card">
                <h2 className="login-title">Iniciar Sesión</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-msg">Completá todos los campos</p>}
                    {errorData && <p className="error-msg">Usuario o contraseña incorrecta</p>}

                    <button type="submit" className="btn-submit">Entrar</button>
                </form>

                <p className="register-text">
                    ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;

