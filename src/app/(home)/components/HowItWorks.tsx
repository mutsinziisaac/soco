import { Smartphone, List, ShoppingBag, Truck } from "lucide-react";

const steps = [
  {
    name: "Download the App",
    description: "Get our free app from the App Store or Google Play.",
    icon: Smartphone,
  },
  {
    name: "Browse & Select",
    description:
      "Choose from a wide variety of fresh groceries and household items.",
    icon: List,
  },
  {
    name: "Add to Cart",
    description: "Select the items you need and add them to your cart.",
    icon: ShoppingBag,
  },
  {
    name: "Fast Delivery",
    description:
      "Sit back and relax as we deliver your groceries to your doorstep.",
    icon: Truck,
  },
];

export default function HowItWorks() {
  return (
    <div className="py-12 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-orange-400 font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple steps to get your groceries
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Getting your groceries delivered is easier than ever with our simple
            4-step process.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <div key={step.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-400 text-white">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {index + 1}. {step.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {step.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
