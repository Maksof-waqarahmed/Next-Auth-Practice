// "use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
// import { useSession } from "next-auth/react"; for client side
import { auth } from "@/app/auth"; //for server side
import { handleSignOut } from "@/app/actions/authActions";
const NavBar = async () => {
  //   const { data: session } = useSession(); for client side
  const session = await auth();
  return (
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold">
        Auth.js
      </Link>
      {!session ? (
        <Link href="/auth/signin">
          <Button variant="default">Sign In</Button>
        </Link>
      ) : (
        <form action={handleSignOut}>
          <Button variant="default" type="submit">
            Sign Out
          </Button>
        </form>
      )}
    </nav>
  );
};

export default NavBar;
