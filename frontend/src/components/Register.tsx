import { useState } from "react";
import "./../components/css/register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [errorExist, setErrorExist] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        setErrorExist(false);

        if (!name || !email || !password) {
            setError(true);
            toast({
                title: "Datos incompletos",
                description: "Completá todos los campos.",
            });
            return;
        }

        const strongPassword = /(?=.*[A-Za-z])(?=.*\d)/.test(password);
        if (password.length < 8 || !strongPassword) {
            setError(true);
            toast({
                title: "Contraseña inválida",
                description: "Debe tener al menos 8 caracteres y combinar letras y números.",
            });
            return;
        }
        try {
            const tokenResp = await fetch('http://localhost:4000/api/auth/csrf-token', { credentials: 'include' });
            const tokenBody = await tokenResp.json();
            const csrfToken = tokenBody?.csrfToken;

            if (!csrfToken) {
                toast({
                title: "Error",
                description: "No se pudo obtener el token de seguridad.",
                });
                return;
            }
            const resp = await fetch('http://localhost:4000/api/usuarios', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'X-CSRF-Token': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({ email, password, name }),
            });

            if (!resp.ok) {
                const err = await resp.json().catch(() => null);

                if (err?.error?.toLowerCase()?.includes("registrado")) {
                    setErrorExist(true);
                    toast({
                        title: "Email existente",
                        description: "Este email ya está registrado.",
                    });
                    } else {
                        toast({
                            title: "Error",
                            description: err?.error || "No se pudo crear el usuario.",
                        });
                    }
                    return;
                }
                // exito-> ir a login
                toast({
                    title: "Registro exitoso",
                    description: "Tu cuenta fue creada. Iniciá sesión.",
                });

                navigate("/login");
                } catch (err) {
                console.error(err);
                toast({
                    title: "Error",
                    description: "No se pudo completar el registro.",
                });
                }
    };

    return (
        <section className="register-page">
            <div className="register-card">
                <h2 className="register-title">Registrarse</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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

                    {error && 
                    <p className="error-msg">
                        Verificá los datos. La contraseña debe tener al menos 8 caracteres,
                        letras y números.
                    </p>}
                    {errorExist && (
                        <p className="error-msg">El email ya está registrado</p>
                    )}

                    <button type="submit" className="btn-submit">Registrarse</button>
                </form>
            </div>
        </section>
    );
};

export default Register;
