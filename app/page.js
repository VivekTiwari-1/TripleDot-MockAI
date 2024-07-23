"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import HoverBorderGradient from "@/components/ui/hover-border-gradient";
import { InfiniteMovingCards } from "@/components/ui/infinite_moving_card";
import { BarChart, CheckSquare, Contact, HeartIcon, Timer } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import HeroImg from "./Images/Untitled design (1).png";
import img1 from "./Images/dark-mode-dashboard.png";
import img2 from "./Images/OIP (15).jpeg";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const [boxNumber, setBoxNumber] = useState(1);

  const disableBox1 = () => {
    setBoxNumber(2);
  };
  const disableBox2 = () => {
    setBoxNumber(1);
  };

  return (
    <div className="bg-black text-white px-28 py-4 flex items-center flex-col">
      <div className="Navbar w-full h-fit md:w-[75%] flex justify-between items-center border-gray-700 rounded-full border px-12 py-5">
        <h1 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
          BRANDING
        </h1>
        <ul className="flex gap-6 items-center text-gray-400">
          <li className="cursor-pointer hover:text-gray-300">Pricing</li>
          <li className="cursor-pointer hover:text-gray-300">Company</li>
          <li className="cursor-pointer hover:text-gray-300">How it Works?</li>
        </ul>
        {/* <div className="h-10 w-10 flex justify-center items-center border-2 border-gray-800 rounded-full">
          <UserButton />
        </div> */}
        <Link href={"./dashboard"}>
          <h2 className="text-gray-400 cursor-pointer hover:text-gray-200">
            Sign In
          </h2>
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="Hero relative flex justify-center items-center mt-8 ">
        <div className="absolute flex justify-center flex-col items-center z-40">
          <div className="flex justify-center flex-col items-center">
            <h1 className="font-bold text-6xl mb-7 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-gray-500">
              Master Your Interviews with AI
            </h1>
            <div className="flex flex-col text-lg text-gray-500 items-center">
              <p>
                Practice real-world interview scenarios and receive personalized
                feedback
              </p>
              <p> to improve your performance and land your dream job.</p>
            </div>
          </div>
          <div className="mt-8">
            <Link href={"./dashboard"}>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black text-gray-400 flex items-center space-x-2"
              >
                <span>Try it now </span>
              </HoverBorderGradient>
            </Link>
          </div>
        </div>

        <div className="h-[80vh] w-[100vw] flex justify-center items-center">
          <Image src={HeroImg} alt="" className="absolute h-full w-full" />

          <div className="absolute h-full w-full z-10 bg-[rgba(0,0,0,0.5)]"></div>
          <div className="absolute h-full w-full z-10 bg-gradient-to-r from-black via-transparent to-black"></div>
          <div className="absolute h-[80%] w-full z-10 bg-gradient-to-t from-black via-transparent to-black"></div>
        </div>
      </div>

      {/* HOW IT WORKS? */}
      <div className="h-[85vh] w-full flex flex-col items-center bg-gradient-to-t from-gray-950 rounded-3xl px-24">
        <h1 className="text-3xl font-bold mt-16 text-gray-400">
          <p>How it Works?</p>
          <p className="h-[2px] w-48 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 mt-2"></p>
        </h1>

        <div className="flex mt-4 items-center gap-12">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="border-4 rounded-full text-gray-300 border-blue-950 p-5 ">
              <CheckSquare />
            </div>
            <h2 className="font-bold text-xl text-gray-400">
              Select Interview type
            </h2>
            <p className="text-gray-500 text-center">
              Choose the type of interview you want to practice from our
              extensive library like Technical, Behavioural, etc.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 mt-32">
            <div className="border-4 rounded-full text-gray-300 border-blue-950 p-5 ">
              <Timer />
            </div>
            <h2 className="font-bold text-xl text-gray-400">
              Practice with Timer
            </h2>
            <p className="text-gray-500 text-center">
              We have a timer for each questions so that you can practice in
              time bounded situation to improve your speed.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 mt-32">
            <div className="border-4 rounded-full text-gray-300 border-blue-950 p-5 ">
              <Contact />
            </div>
            <h2 className="font-bold text-xl text-gray-400">
              Get Instant Feedback
            </h2>
            <p className="text-gray-500 text-center">
              Receive detailed, actionable and personalized feedback immediately
              after your practice session with correct answer.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="border-4 rounded-full text-gray-300 border-blue-950 p-5 ">
              <BarChart />
            </div>
            <h2 className="font-bold text-xl text-gray-400">
              Track Your Progress
            </h2>
            <p className="text-gray-500 text-center">
              Monitor your improvements with our intuitive performance analytics
              dashboard. Currently it is under development.
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="h-[100vh] w-full mt-16 flex flex-col items-center rounded-3xl">
        <h1 className="text-4xl font-bold mt-16 text-gray-400 mb-20">
          <p>Features</p>
          <p className="h-[2px] w-36 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 mt-2"></p>
        </h1>
        <div className="flex w-full">
          <div className="w-[30%]">
            <div
              onClick={disableBox2}
              className={`${
                boxNumber == 1
                  ? "bg-gradient-to-r from-gray-900 to-black border-l border-t border-b border-gray-700 rounded-lg"
                  : ""
              } p-4 z-10 cursor-pointer`}
            >
              <h2 className="text-gray-300 font-bold mb-2">
                Tailored Interview Scenarios
              </h2>
              <p className="text-gray-400">
                Choose from a wide range of interview types, from coding
                challenges to behavioral questions, and everything in between.
              </p>
            </div>

            <div
              onClick={disableBox1}
              className={`${
                boxNumber == 2
                  ? "bg-gradient-to-r from-gray-900 to-black border-l border-t border-b border-gray-700 rounded-lg"
                  : ""
              } p-4 z-10 cursor-pointer`}
            >
              <h2 className="text-gray-300 font-bold mb-2">
                AI-Powered Feedback
              </h2>
              <p className="text-gray-400">
                Receive instant, detailed feedback on your performance to help
                you understand your strengths and areas for improvement.
              </p>
            </div>
          </div>
          <div className="w-[70%] h-[70vh] rounded-2xl shadow-[25px_5px_60px_10px_rgb(31,41,55)] z-0">
            {boxNumber == 2 ? (
              <div className="h-full w-full rounded-2xl">
                <div className="h-[70%] w-[60%] absolute bg-[rgba(0,0,0,0.4)]"></div>
                <Image src={img1} alt="" className="h-full w-full" />
              </div>
            ) : (
              <div className="h-full w-full ">
                <div className="h-[70%] w-[60%] absolute bg-gradient-to-r from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.1)]"></div>
                <Image
                  src={img2}
                  alt=""
                  className="h-full w-full rounded-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="Features flex flex-col items-center my-28">
        <h1 className="text-3xl font-bold mb-10 text-gray-400">
          <p>Testimonials</p>
          <p className="h-[2px] w-44 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 mt-2"></p>
        </h1>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>

      {/* FAQs SECTION */}
      <div className="FAQs w-full bg-gray-950 my-24 pt-12 pb-16 rounded-3xl flex flex-col items-center gap-7">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500">
          Frequently asked Questions
        </h1>
        <div>
          {FAQsList.map((item, index) => (
            <Collapsible key={index} className="mt-4">
              <CollapsibleTrigger className="p-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg my-2 flex justify-between w-[60vw] text-gray-400">
                {index + 1 + ") "}
                {item.question}{" "}
                <ChevronsUpDown className="h-5 w-5 ml-4 text-gray-600" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-gray-400 w-[60vw] px-7">{item.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="Footer w-full">
        <p className="h-[2px] w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 mt-16"></p>
        <div className=" flex justify-center text-sm gap-28 py-8">
          <h1 className="text-gray-700 flex items-center">
            <span>Designed & Developed with&nbsp;</span>
            <HeartIcon className="w-4 h-4" />
            <span>&nbsp;by Vivek Tiwari</span>
          </h1>
          <div className="flex flex-col gap-1 text-gray-700">
            <p>Terms of Services</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const FAQsList = [
  {
    question: "What types of interviews can I practice?",
    answer:
      "     You can practice coding, behavioral, technical, and industry-specific interviews tailored to various roles and levels.",
  },
  {
    question: "How does the AI provide feedback?",
    answer:
      "     Our AI analyzes your responses based on key performance metrics, offering detailed, actionable feedback to help you improve.",
  },
  {
    question: "Can I track my progress over time?",
    answer:
      "     Yes, our platform offers comprehensive performance analytics, allowing you to monitor your improvements and see tangible results.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "     Yes, we offer a free trial for our Pro plan, so you can experience all the features and benefits before committing to a subscription.",
  },
  {
    question:
      "What types of questions are included in the practice interviews?",
    answer:
      "    Our platform includes questions curated by industry experts, covering a wide range of topics and difficulty levels to simulate real-world interview conditions.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "     Yes, we offer a free trial for our Pro plan, so you can experience all the features and benefits before committing to a subscription.",
  },
  {
    question:
      "What types of questions are included in the practice interviews?",
    answer:
      "    Our platform includes questions curated by industry experts, covering a wide range of topics and difficulty levels to simulate real-world interview conditions.",
  },
];

const testimonials = [
  {
    quote:
      "This platform transformed my interview prep. The AI feedback was incredibly detailed and helped me identify areas I needed to work on.",
    name: "Emily Chen",
    job_position: "Software Engineer",
    firm: "Microsoft",
  },
  {
    quote:
      "Using this tool was like having a personal interview coach. The realistic scenarios and instant feedback were game-changers for me.",
    name: "Michael Turner",
    job_position: "Data Analyst",
    firm: "Google",
  },
  {
    quote:
      "I loved the variety of questions and the ability to practice different interview types. It definitely boosted my confidence.",
    name: "Sarah Johnson",
    job_position: "Product Manager",
    firm: "Meta",
  },
  {
    quote:
      "The performance analytics helped me track my progress and see tangible improvements. I highly recommend this platform to anyone serious about their career.",
    name: "Gaurav Tiwari",
    job_position: "Blockchain Developer",
    firm: "Polygon",
  },
  {
    quote:
      "Preparing for my technical interviews with this AI tool was a great experience. The feedback was spot-on and helped me secure my current role.",
    name: "Priya Patel",
    job_position: "DevOps Engineer",
    firm: "Uber",
  },
];
