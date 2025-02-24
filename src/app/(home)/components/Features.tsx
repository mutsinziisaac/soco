import { ShoppingCart, Clock, CreditCard, List } from "lucide-react";

const features = [
  {
    name: "Wide Selection",
    description:
      "Choose from thousands of products across multiple local stores.",
    icon: ShoppingCart,
  },
  {
    name: "Fast Delivery",
    description:
      "Get your fresh groceries delivered to your doorstep in as little as 1 hour.",
    icon: Clock,
  },
  {
    name: "Secure Payments",
    description: "Pay safely and securely using your preferred payment method.",
    icon: CreditCard,
  },
  {
    name: "Create Shopping Lists",
    description: "Effortlessly Create Grocery Lists for Stress-Free Shopping.",
    icon: List,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-500 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for easy grocery shopping
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our app is designed to make your grocery shopping experience as
            smooth and convenient as possible.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
