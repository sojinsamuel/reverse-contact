import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { Knock } from "@knocklabs/node";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { AI } from "@/app/actions";
import Banner from "@/app/ui/banner";
import NavigationBar from "@/app/ui/navbar";
import TanstackProvider from "@/providers/tanstack-provider";
import "@/styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://localhost:3000/"),
  title: "Reverse contact lookup",
  description:
    "Reverse contact lookup is a tool that allow you to find information about a person or business using their email address.",
  // openGraph: { images: ["/og.png"] },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);
  const { userId } = auth();
  const session = await currentUser();
  if (userId) {
    const email = session?.emailAddresses[0].emailAddress[0];
    const knockUser = await knockClient.users.identify(userId, {
      name: email,
      email,
    });
    // console.log(session.user.sub);
    console.log("knockUser", knockUser);
  }
  return (
    <AI>
      <html lang="en">
        <body className={inter.className}>
          <ClerkProvider>
            <NavigationBar />
            <NextUIProvider>
              <Banner />
              <TanstackProvider>{children}</TanstackProvider>
            </NextUIProvider>
          </ClerkProvider>
        </body>
      </html>
    </AI>
  );
}
