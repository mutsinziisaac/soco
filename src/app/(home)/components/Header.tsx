import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-md"
                src="/soqologo-nobg.png"
                alt="Grocery shopping made easy"
                width={100}
                height={100}
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link
                href="#features"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Testimonials
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
