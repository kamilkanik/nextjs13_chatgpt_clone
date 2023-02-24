"use client";
import { signIn } from "next-auth/react";

function Auth() {
  return (
    <div>
        <button onClick={() => { signIn('github'); }}>Sign In with GitHub</button>
        <button onClick={() => { signIn('google'); }}>Sign In with Google</button>
    </div>
  )
}

export default Auth