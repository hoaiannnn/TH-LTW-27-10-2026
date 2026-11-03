import { Link } from "react-router";

import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header_body">

          <div className="navbar_left">

            <div className="logo">
              <Link
                to="/"
                className="logo_heading"
              >
                ToolNest
              </Link>
            </div>

            <nav className="navbar">
              <ul className="navbar__list">

                <li className="navbar__item">
                  <Link
                    to="/"
                    className="navbar__link"
                  >
                    Trang chủ
                  </Link>
                </li>

                <li className="navbar__item">
                  <Link
                    to="/about-us"
                    className="navbar__link"
                  >
                    Giới thiệu
                  </Link>
                </li>

              </ul>
            </nav>

          </div>

          <div className="navbar__tion">

            {user ? (
              <>
                <span>
                  Xin chào, {user.fullName}
                </span>

                <button
                  className="btn"
                  onClick={logout}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn"
                >
                  Đăng nhập
                </Link>

                <Link
                  to="/register"
                  className="btn"
                >
                  Đăng ký
                </Link>
              </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
