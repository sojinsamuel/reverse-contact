import { SignIn } from "@clerk/nextjs";
import analytics from "@/lib/analyticsInstance";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  analytics.page({
    anonymousId: uuidv4(),
    name: "Viewed Sign In Page",
    timestamp: new Date().toISOString(),
  });
  return (
    <div className="flex h-screen justify-center items-center">
      <SignIn />;
    </div>
  );
}
