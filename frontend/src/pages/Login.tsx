import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { login } from "../services/userApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Vui lòng nhập email và password"
      );

      return;
    }

    try {
      const response = await login({
        email,
        password,
      });

      loginUser(response.data.user);

      navigate("/");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Đăng nhập thất bại"
      );
    }
  };

  return (
    <div className="auth">
      <h1>Đăng nhập</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Nhập email"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Nhập password"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">
          Đăng nhập
        </button>
      </form>

      <p>
        Chưa có tài khoản?{" "}
        <Link to="/register">
          Đăng ký
        </Link>
      </p>
    </div>
  );
}

export default Login;

