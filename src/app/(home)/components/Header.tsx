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
                className="object-cover rounded-md sm:w-10 sm:h-6 md:w-28 md:h-28 lg:w-32 lg:h-28"
                src="/soqologo-nobg.png"
                alt="Grocery shopping made easy"
                width={100} // Default width (can be overridden by Tailwind classes)
                height={100} // Default height (can be overridden by Tailwind classes)
              />
            </Link>
            <div className="hidden ml-10 space-x-8">
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
