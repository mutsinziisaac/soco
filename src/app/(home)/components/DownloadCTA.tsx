import Link from "next/link";
import { Apple, PlayCircle } from "lucide-react";

export default function DownloadCTA() {
  return (
    <div className="bg-green-500" id="download">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to start shopping smarter?</span>
          <span className="block">Download our app today!</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-green-100">
          Get started with Soco and experience the convenience of grocery
          shopping from your phone. Available for both iOS and Android devices.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
            >
              <Apple className="h-5 w-5 mr-2" />
              App Store
            </Link>
          </div>
          <div className="ml-3 inline-flex">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500"
            >
              <PlayCircle className="h-5 w-5 mr-2" />
              Google Play
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
