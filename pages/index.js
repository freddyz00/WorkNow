import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useRef } from "react";

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Testimonials from "../components/Testimonials";
import Link from "next/link";

import Fade from "react-reveal/Fade";

export default function Home({ _session }) {
  const navRef = useRef();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > navRef?.current?.scrollHeight) {
        navRef?.current?.classList.add("bg-white");
      } else {
        navRef?.current?.classList.remove("bg-white");
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  useEffect(() => {
    if (_session) {
      router.push("/dashboard");
    }
  }, []);

  if (_session) return <Loading />;

  return (
    <div>
      <Head>
        <title>WorkNow</title>
      </Head>

      {/* nav bar */}
      <NavBar navRef={navRef} />

      {/* view on page load */}
      <section className="flex h-screen py-12 bg-gradient-to-t from-violet-100 to-white justify-center mb-28">
        <div className="container h-full grid grid-cols-1 md:grid-cols-2">
          {/* left */}
          <div className="flex flex-col justify-center items-start h-full w-full pl-24 pr-12">
            <h1 className="text-3xl md:text-5xl font-semibold leading-snug my-5">
              Collaboration Made Simple.
            </h1>
            <p className="text-lg md:text-xl mb-5">
              Manage all of your organization's projects, tasks, and activities.
              All your members, All in one place.
            </p>
            <Link href="/signup">
              <a>
                <Button title="Get started for free" large type="primary" />
              </a>
            </Link>
          </div>

          {/* right */}
          <div className="flex h-full justify-center items-center">
            <Image
              className="h-full max-w-full"
              src="/images/home-page-img.png"
              width="1000"
              height="750"
            />
          </div>
        </div>
      </section>

      <Fade bottom>
        <section className="container mx-auto mb-28">
          <h2 className="text-3xl font-semibold mx-20 text-center mb-5">
            Keep all your work neat, clean, and organized.
          </h2>
          <p className="mx-20 text-xl text-center mb-5">
            Achieve greater work efficiency by integrating different tools into
            your workflow
          </p>
          <div className="mx-20 text-center ">
            <Link href="/signup">
              <a>
                <Button title="Start Working" type="primary" large />
              </a>
            </Link>
          </div>
        </section>
      </Fade>

      <Fade bottom>
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 mb-28 place-items-center">
          <div className="justify-self-center mx-10 md:mx-auto md:ml-20">
            <p className="text-3xl font-semibold text-center mb-5 md:text-left">
              Boost your productivity by keeping track of your tasks
            </p>
            <p className="text-xl text-justify m-5 md:m-0">
              Add new task, sort existing lists, customize each individual item.
              You have full control.
            </p>
          </div>
          <div className="justify-self-center">
            <Image src="/images/to-do.png" height="350" width="350" />
          </div>
        </section>
      </Fade>

      <Fade bottom>
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 mb-28 place-items-center">
          <div className="justify-self-center order-1 md:order-0">
            <Image
              src="/images/chat-functionality.png"
              height="350"
              width="350"
            />
          </div>
          <div className="justify-self-center mx-10 md:mx-auto md:mr-20 order-0 md:order-1">
            <p className="text-3xl font-semibold mb-5 text-center md:text-left">
              Seamless communication between your team
            </p>
            <p className="text-xl text-justify m-5 md:m-0">
              Embrace teamwork by communicating with members across different
              departments that are all working on the same project. Zero hassle
              indeed.
            </p>
          </div>
        </section>
      </Fade>

      <Fade bottom>
        <Testimonials />
      </Fade>

      <footer className="bg-gray-100">
        <div className="container sm:mx-auto flex flex-col sm:flex-row justify-between items-center py-10">
          <div className="mb-5 sm:mb-0">
            <h1 className="font-righteous text-3xl text-center sm:text-left">
              <span className="text-yellow-500">Work</span>
              <span className="text-pink-500">Now</span>
            </h1>
            <p>© Copyright 2022. All rights reserved.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <a href="/">
              <p className="ml-5 hover:text-blue-700 hover:underline">
                About us
              </p>
            </a>
            <a href="/">
              <p className="ml-5 hover:text-blue-700 hover:underline">
                Contact us
              </p>
            </a>
            <a href="/">
              <p className="ml-5 hover:text-blue-700 hover:underline">Help</p>
            </a>
            <a href="/">
              <p className="ml-5 hover:text-blue-700 hover:underline">
                Privacy
              </p>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: { _session: session } };
}
