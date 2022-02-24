import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Link from "next/link";

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

      {/*  */}
      <section className="flex h-screen py-12 bg-gradient-to-t from-blue-100 to-white justify-center mb-28">
        <div className="container columns-1 md:columns-2">
          {/* left */}
          <div className="flex flex-col justify-center items-start h-full w-full pl-24 pr-12">
            <h1 className="text-3xl md:text-5xl font-semibold leading-snug my-4">
              Collaboration Made Simple.
            </h1>
            <p className="text-lg md:text-xl mb-4">
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
          <div className="flex justify-center items-center h-full w-full">
            <Image
              className="max-w-full"
              src="/images/home-page-img.png"
              width="1000"
              height="750"
            />
          </div>
        </div>
      </section>

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

      <section className="container mx-auto grid grid-cols-2 mb-28 place-items-center">
        <div className="justify-self-center ml-20">
          <p className="text-3xl font-semibold mb-5">
            Boost your productivity by keeping track of your tasks
          </p>
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            veniam omnis, velit dolore ducimus natus distinctio saepe nesciunt
            provident iste.
          </p>
        </div>
        <div className="justify-self-center">
          <Image src="/images/to-do.png" height="350" width="350" />
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-2 mb-28 place-items-center">
        <div className="justify-self-center">
          <Image
            src="/images/chat-functionality.png"
            height="350"
            width="350"
          />
        </div>
        <div className="justify-self-center mr-20">
          <p className="text-3xl font-semibold mb-5">
            Seamless communication between your team
          </p>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            officia tenetur odit animi dicta, amet repellat laudantium nam.
            Voluptate, architecto?
          </p>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: { _session: session } };
}
