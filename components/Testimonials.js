import { useEffect, useState } from "react";
import cn from "classnames";
import { GoPrimitiveDot } from "react-icons/go";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const testimonials = [
  {
    name: "John Doe",
    content:
      "WorkNow has completely improvised the way we work. It adds a lot of value to our company as our work has become more efficient.",
  },
  {
    name: "Jane Doe",
    content:
      "I have never imagined I could do so many things in one place. What's more to it is that it is really easy to use.",
  },
  {
    name: "Jack Doe",
    content:
      "I was having problems with organizing and managing my day-to-day tasks. I came across WorkNow and I am relieved to have a tool that does everything for me.",
  },
];

const TestimonialCard = ({ name, content }) => {
  return (
    <div className="w-1/3 h-full flex flex-col justify-center px-20 items-center shrink-0">
      <p className="text-2xl font-medium mb-5 relative text-indigo-900">
        <span className="absolute -left-2">"</span>
        {content}
        <span>"</span>
      </p>
      <h4 className="text-lg self-end text-indigo-900">{`- ${name}`}</h4>
    </div>
  );
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (currentIndex === testimonials.length - 1) {
      timeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => 0);
      }, 10000);
    } else {
      timeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 10000);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <section className="container mx-auto mb-28">
      <h3 className="text-3xl font-semibold text-center mb-10">
        See What People Are Saying About WorkNow
      </h3>
      <div className="mx-auto h-72 bg-blue-100 rounded-2xl overflow-hidden relative group">
        <div
          className={cn(
            "flex w-[300%] h-full shrink-0 transition-all duration-500",
            {
              "-translate-x-0": currentIndex === 0,
              "-translate-x-1/3": currentIndex === 1,
              "-translate-x-2/3": currentIndex === 2,
            }
          )}
        >
          {testimonials.map(({ name, content }, index) => (
            <TestimonialCard
              name={name}
              content={content}
              key={index}
              index={index}
            />
          ))}
        </div>
        <div className="flex absolute z-10 bottom-5 justify-center w-full">
          {testimonials.map((_, index) => (
            <GoPrimitiveDot
              key={index}
              className={cn("transition-color", {
                "text-indigo-900": index === currentIndex,
                "text-blue-300": index !== currentIndex,
              })}
            />
          ))}
        </div>
        <div
          className="absolute left-0 top-0 flex items-center h-full opacity-0"
          onClick={() => {
            if (currentIndex === 0) {
              setCurrentIndex(testimonials.length - 1);
            } else {
              setCurrentIndex((prevIndex) => prevIndex - 1);
            }
          }}
        >
          <BsChevronCompactLeft className="text-5xl text-white cursor-pointer" />
        </div>
        <div className="absolute right-0 top-0 flex items-center h-full opacity-0 group-hover:opacity-100 transition">
          <BsChevronCompactRight
            className="text-5xl text-white cursor-pointer group-hover:opacity-100 transition"
            onClick={() => {
              if (currentIndex === testimonials.length - 1) {
                setCurrentIndex(0);
              } else {
                setCurrentIndex((prevIndex) => prevIndex + 1);
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}
