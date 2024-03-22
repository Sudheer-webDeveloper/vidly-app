import React from "react";
import { NavLink } from "react-router-dom";
import { useMovieContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <Navbar1 />
    </header>
  );
};

export default Navbar;



export const Navbar1 = () => {
  const Links = ["login", "register"];

  const navigate = useNavigate();

  const { user,setUser } = useMovieContext();

  const removingToken = (prop) => {
    localStorage.removeItem(prop);
    setUser("")
    navigate("/login");
  };

  return (
    <header>
      <nav className="nav">
        <section className="logo">
          <h2>Vidly</h2>
        </section>
        <section className="links">
          {user ? (
            <>
              <NavLink
                to={`/movies`}
                className={({ isActive }) => (isActive ? "active" : "normal")}
              >
                <button>Movies</button>
              </NavLink>

              <button
                className="logout"
                onClick={() => removingToken("userDataJwt")}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to={`/register`}
                className={({ isActive }) => (isActive ? "active" : "normal")}
              >
                <button>Register</button>
              </NavLink>
              <NavLink
                to={`/login`}
                className={({ isActive }) => (isActive ? "active" : "normal")}
              >
                <button>Login</button>
              </NavLink>
            </>
          )}
        </section>
      </nav>
    </header>
  );
};
