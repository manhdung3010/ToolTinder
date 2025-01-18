/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function DefaultLayout({ children }: { children: any }) {
  const router = useRouter();

  const { token, login, handleInputChange } = useAuth();

  const isActive = (href: string) => router.pathname === href;

  return (
    <div>
      <nav className=" bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 gap-5">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Tool
            </span>
          </Link>

          <div className="flex gap-3">
            <input
              type="text"
              className="p-2 block"
              defaultValue={token || ""}
              placeholder="Enter token"
              onChange={handleInputChange}
            />
            <button
              onClick={login}
              className="bg-blue-500 px-3 py-1 rounded-md"
            >
              Login
            </button>
          </div>

          <div className=" w-full md:w-auto">
            <ul className="flex gap-5">
              <li>
                <Link
                  href="/"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    isActive("/")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  }`}
                  aria-current={isActive("/") ? "page" : undefined}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/my-like"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    isActive("/my-like")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  }`}
                >
                  My Like
                </Link>
              </li>

              <li>
                <Link
                  href="/matches"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    isActive("/matches")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  }`}
                >
                  Matches
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
