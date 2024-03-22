// import React, { Component } from "react";
// import TableBody from "./TableBody";
// import TableHead from "./TableHead";
// import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../../Context/Context";

export default function Table() {
  const navigate = useNavigate();
  const { user } = useMovieContext();
  const [deletee, setDeletee] = useState(user ? true : false);

  return (
    <>
      <section className="new-user">
        <button onClick={() => navigate("/new")} className="new-button">
          new
        </button>
        <h2>
          Hi <span>{user.name ? user.name : "user"}</span> , here are the
          Awesome Movies waiting for you !{" "}
        </h2>
      </section>
      <table className="table">
        <TableHead />

        <TableBody deletee={deletee} setDeletee={setDeletee} />
      </table>
    </>
  );
}
