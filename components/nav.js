import Link from "next/link";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";

const Nav = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useUser();

  // useEffect(() => {
  //   const fetchProfile = () => {
  //     const userData = user;
  //     if (userData) {
  //       setProfile(userData);
  //     }
  //   };
  //   fetchProfile();
  // }, []);

  // if (!profile) return null;

  return (
    <nav className="flex py-4 px-6 border-b border-gray-200">
      <Link href="/">
        <a>Home</a>
      </Link>
      {!!user && (
        <Link href="/dashbord">
          <a className="ml-2">Dashbord</a>
        </Link>
      )}
      <Link href="/demo1">
        <a className="ml-2">Demo1</a>
      </Link>
      <Link href="/pricing">
        <a className="ml-2">Pricing</a>
      </Link>

      <Link href={user ? "/logout" : "/login"}>
        <a className="ml-auto"> {user ? "Logout" : "Login"} </a>
      </Link>

      {/* {!profile && (
        <Link href="/login">
          <a className="ml-auto">Login</a>
        </Link>
      )}
      {profile && (
        <Link href="/logout">
          <a className="ml-auto">Logout</a>
        </Link>
      )} */}
    </nav>
  );
};

export default Nav;
