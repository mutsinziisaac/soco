import { MagicTweet } from "./twittercard";
import { Tweet } from "react-tweet/api";

interface TestimonialsProps {
  tweets: (Tweet | null | undefined)[];
}

export default function Testimonials({ tweets }: TestimonialsProps) {
  return (
    <section
      className="py-12 bg-white overflow-hidden md:py-20 lg:py-24"
      id="testimonials"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What our customers are saying
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Don`t just take our word for it. Here`s what some of our satisfied
            customers have to say about Soco.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
            {tweets[0] && <MagicTweet tweet={tweets[0]} />}
            {tweets[1] && <MagicTweet tweet={tweets[1]} className="h-fit" />}
          </div>
        </div>
      </div>
    </section>
  );
}
