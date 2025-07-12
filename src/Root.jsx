import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import isTokenExpired from "./isTokenExpired.js";

function Root() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      if (isTokenExpired(user.token)) {
        localStorage.removeItem("user");
        return;
      }
      setUser(user);
    }
  }, []);
  console.log(user);
  return (
    <>
      <Outlet context={{ user, setUser }}></Outlet>
    </>
  );
}
export default Root;
