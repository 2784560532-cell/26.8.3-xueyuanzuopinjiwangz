import { NavLink } from "react-router-dom";
import { assetPaths } from "../data/works.js";

const navItems = [
  { label: "学员作品", to: "/" },
  { label: "菜心课堂", to: "/classroom" },
  { label: "讲师介绍", to: "/teachers" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="brand" to="/" aria-label="菜心设计铺首页">
          <img src={assetPaths.logo} alt="菜心设计铺" />
        </NavLink>
        <nav className="site-nav" aria-label="主导航">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => `site-nav__link${isActive ? " is-active" : ""}`}
              end={item.to === "/"}
              key={item.label}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
