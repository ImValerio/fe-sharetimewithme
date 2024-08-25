"use client"
import { Bungee_Hairline, Montserrat } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { LoadingProvider } from "@/components/loadingContext";
import App from "@/components/app";

const inter = Montserrat({ subsets: ["latin"] });
// const navTitle = Bungee_Hairline({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "ShareTimeWithMe",
//   description: "The easiest way to share your schedule with your friends!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()

  return (
    <html lang="en">
      <head>
        <title>ShareTimeWithMe</title>
        <meta name="description" content="The easiest way to share your schedule with your friends" />
        <meta name="keywords" content="schedule,schedule time with friends, time management" />
        <meta name="author" content="Valerio Valletta" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee+Hairline&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>

        <nav className='w-full p-2 bg-gray-900 text-white text-center flex justify-start items-center'>


          <div onClick={() => router.push("/")} className="flex items-center cursor-pointer">
            <img className="max-w-10" src='logo_lg_blu.png' />
            <h3 className="mx-2 text-2xl bungee-hairline-regular">
              Share Time With Me
            </h3>
          </div>
        </nav>
        <LoadingProvider>
          <App children={children} />
        </LoadingProvider>
        <footer className='w-full p-2 bg-gray-900 text-white text-center'>Made with ❤️ by <a href='https://www.valeriovalletta.it'>Valerio Valletta</a></footer>
      </body>
    </html >
  );
}
