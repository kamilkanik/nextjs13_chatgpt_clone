import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

import SessionProvider from "../components/SessionProvider/SessionProvider";
import "../styles/globals.css";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  return (
    <html>
      <head />
      <body>
          <SessionProvider session={session}>
              {children}
          </SessionProvider>
      </body>
    </html>
  )
}