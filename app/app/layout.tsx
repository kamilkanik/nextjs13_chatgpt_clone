import ClientProvider from "../../components/ClientProvider/ClientProvider";
import SideBar from "../../components/SideBar/SideBar";

export default async function RootAppLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <head />
      <body>
          <div className='flex'>
                <SideBar />
                <ClientProvider />
                <div className="pl-[260px] w-full h-full min-h-screen">
                  {children}
                </div>
          </div>
      </body>
    </html>
  )
}