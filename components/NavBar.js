import Link from "next/link";

import Button from "../components/Button";

export default function NavBar({ navRef }) {
  return (
    <nav
      ref={navRef}
      className="h-16 w-full flex flex-row justify-between items-center px-20 fixed top-0 transition-background duration-300 z-10"
    >
      <div>
        <Link href="/">
          <a>
            <h1 className="font-righteous text-3xl">
              <span className="text-yellow-500">Work</span>
              <span className="text-pink-500">Now</span>
            </h1>
          </a>
        </Link>
      </div>
      <div>
        <ul className="flex flex-row">
          <li className="mx-2">
            <Link href="/login">
              <a>
                <Button title="Sign In" type="primary" />
              </a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/signup">
              <a>
                <Button title="Sign Up" type="secondary" />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
