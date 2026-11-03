import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { register } from "../services/userApi";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (
      !fullName ||
      !email ||
      !age ||
      !password
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password phải có ít nhất 6 ký tự"
      );
      return;
    }

    if (Number(age) <= 0) {
      setError("Tuổi không hợp lệ");
      return;
    }

    try {
      await register({
        fullName,
        email,
        password,
        age: Number(age),
      });

      alert("Đăng ký thành công");

      navigate("/login");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Đăng ký thất bại"
      );
    }
  };

  return (
    <div className="auth">
      <h1>Đăng ký</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Họ tên</label>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            placeholder="Nhập họ tên"
          />
        </div>

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
          <label>Tuổi</label>

          <input
            type="number"
            value={age}
            onChange={(e) =>
              setAge(e.target.value)
            }
            placeholder="Nhập tuổi"
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
          Đăng ký
        </button>
      </form>

      <p>
        Đã có tài khoản?{" "}
        <Link to="/login">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}

export default Register;

