import { Link } from "react-router";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header_body">
          <div className="navbar_left">
            <div className="logo">
              <Link to="/" className="logo_heading">
                ToolNest
              </Link>
            </div>

            <nav className="navbar">
              <ul className="navbar__list">
                <li className="navbar__item">
                  <Link to="/" className="navbar__link">
                    Trang chủ
                  </Link>
                </li>

                <li className="navbar__item">
                  <Link to="/about-us" className="navbar__link">
                    Giới thiệu
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="navbar__tion">
            <button className="btn">Đăng nhập</button>
            <button className="btn">Đăng ký</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;