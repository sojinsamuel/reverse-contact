import Hero from "./ui/hero/hero";
// import { getSession } from "@auth0/nextjs-auth0";
import {} from "ai/rsc";
export default async function Home() {
  // const session = await getSession();
  // const user = session?.user;
  // console.log(user);
  return <Hero />;
}
