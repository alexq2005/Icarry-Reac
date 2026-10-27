import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import { useState } from "react";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error(error);
      setLoginError(
        "No se pudo iniciar sesión. Revisá el correo y la contraseña e intentá nuevamente.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar sesión</h2>

      {location.state?.unauthorized && (
        <p className="login-error" role="alert">
          La cuenta inició sesión, pero no tiene acceso al administrador. UID
          autenticado: <code>{location.state.authenticatedUid}</code>
        </p>
      )}

      {loginError && (
        <p className="login-error" role="alert">
          {loginError}
        </p>
      )}

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Correo electronico"
          value={formData.email}
          onChange={handleChange}
          autoComplete="username"
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
      </div>

      <button className="btn bg-primary" type="submit">
        Ingresar
      </button>
    </form>
  );
};
