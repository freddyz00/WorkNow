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
    <div className="mx-auto">
      <Head>
        <title>WorkNow</title>
      </Head>

      {/* nav bar */}
      <NavBar navRef={navRef} />

      {/*  */}
      <section className="flex h-screen py-12 bg-gradient-to-t from-blue-100 to-white justify-center">
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
      <div>sakdfj</div>
      <div>sakdfj</div>
      <div>sakdfj</div>
      <div>sakdfj</div>
      <div>sakdfj</div>
      <div>sakdfj</div>
      <div>sakdfj</div>
      <div>sakdfj</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: { _session: session } };
}
