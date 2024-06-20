import "@/styles/home.css";

import { Image } from "@nextui-org/react";
import UnderLine from "@/app/ui/underline";
import InputField from "@/app/ui/input-field";

export default function Home() {
  return (
    <main className="">
      <article className="grid lg:grid-cols-2">
        <div className="px-8 py-20 md:px-20 lg:py-48">
          <h1 className="text-5xl font-semibold text-transparent md:text-5xl lg:text-6xl gradient sm:text-3xl">
            <span className=" whitespace-nowrap  ">
              Reverse Contact <br />
              <span className="relative text-[#6c47ff]">
                Lookup for Business{" "}
              </span>
              <UnderLine />
            </span>
          </h1>
          <p className="mt-6 text-lg">
            Gather real-time data and background information on businesses and
            individuals.
          </p>
          {/* <div className="flex justify-center items-center mt-8">
            <InputField />
          </div> */}
        </div>
        <div className="flex flex-col justify-center ">
          <Image
            width={800}
            height={800}
            src="./components.svg"
            alt="Clerk embeddable components"
            loading="lazy"
            className="object-contain"
          />
        </div>
      </article>
    </main>
  );
}
