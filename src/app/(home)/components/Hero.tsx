import Link from "next/link";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import Android from "@/components/magicui/android";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Grocery shopping</span>{" "}
                <span className="block text-green-500 xl:inline">made</span>{" "}
                <span className="block text-orange-400 xl:inline">easy</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Shop fresh groceries in Uganda, all from the comfort of your
                home. Our app makes grocery shopping convenient, fast, and
                hassle-free.
              </p>
              <h1 className="text-base text-green-500 font-semibold tracking-wide uppercase">
                Download Now
              </h1>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center items-center lg:justify-start">
                <div className="rounded-md">
                  <Link href="#download" className="w-full">
                    <Image
                      src="/apple.jpeg"
                      width={200}
                      height={30}
                      alt="google play button"
                    />
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="#download" className="w-full">
                    <Image
                      src="/google.jpeg"
                      width={200}
                      height={30}
                      alt="apple play button"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 z-10 flex relative lg:pl-36 md:pl-16 pl-10">
        <div className="relative">
          <Iphone15Pro className="size-full" src="/iphoneimage.PNG" />
        </div>

        <div className="relative top-10 right-16">
          <Android className="size-full" src="/androidimage.PNG" />
        </div>
      </div>
    </div>
  );
}
