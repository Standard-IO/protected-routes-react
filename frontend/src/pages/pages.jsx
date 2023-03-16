import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import credentialsContext from "../context";

export function Landing() {
  return (
    <h1>Landing (Public)</h1>
  )
};

export function Home() {
  return (
    <h1>Home</h1>
  )
};

export function Dasboard() {
  return (
    <h1>Dashboard</h1>
  )
};
export function Analytics() {
  return (
    <h1>Analitics</h1>
  )
};

export function Admin() {
  return (
    <h1>Admin</h1>
  )
};

export function Root() {
  const {user, setUser} = useContext(credentialsContext)

  const manageOnClick = () => {
    // Dummy way to get credentials this is usuall taken from the backend facility
    // then is used here to give permission for the view but the security is not here
    // is in the backend, this is only visual.


    console.log('This is user value', user)

    if (!user) {
      setUser({
        id: 1,
        name: "standard-io",
        permissions: ["analize"],
        // roles: ["admin"],
        roles: []

      });
    }
    else {
      setUser(null);
    }
  };
  return (
    <div>
      <Navbar />
      {
        user ? (
          <button type='button' onClick={manageOnClick}>Log out</button>
        )
          : (
            <button type='button' onClick={manageOnClick} >Log in</button>
          )
      }
      <Outlet />
    </div>
  )
};