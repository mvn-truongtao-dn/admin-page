import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  const handleSignin = (e: any) => {
    e.preventDefault();
    signIn();
  };

  const handleSignout = (e: any) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className="header">
      <Link href="/">
        <p className="logo">NextAuth.js</p>
      </Link>
      {session && (
        <Link href="#" onClick={handleSignout} className="btn-signin">
          Sign out
        </Link>
      )}
      {!session && (
        <Link href="#" onClick={handleSignin} className="btn-signin">
          Sign in
        </Link>
      )}
    </div>
  );
}
