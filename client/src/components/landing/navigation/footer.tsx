import Icons from "@/components/landing/global/icons";
import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32">
      <div className="hidden lg:block absolute -top-1/3 -right-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>
      <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>

      <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
        <div className="flex flex-col items-start justify-start md:max-w-[200px]">
          <div className="flex items-start">
            <Icons.logo className="w-7 h-7" />
          </div>
          <p className="text-muted-foreground mt-4 text-sm text-start">
            Build beautiful, functional websites, without writing code
          </p>
          <span className="mt-4 text-neutral-200 text-sm flex items-center">
            Made in India with
            <Heart className="w-3.5 h-3.5 ml-1 fill-primary text-primary" />
          </span>
        </div>

        <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="">
              <h3 className="text-base font-medium text-white">Product</h3>
              <ul className="mt-4 text-sm text-muted-foreground">
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Features
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Testimonials
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Integration
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-10 md:mt-0 flex flex-col">
              <h3 className="text-base font-medium text-white">Integrations</h3>
              <ul className="mt-4 text-sm text-muted-foreground">
                <li className="">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Facebook
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Instagram
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Twitter
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="">
              <h3 className="text-base font-medium text-white">Resources</h3>
              <ul className="mt-4 text-sm text-muted-foreground">
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Case Studies
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-10 md:mt-0 flex flex-col">
              <h3 className="text-base font-medium text-white">Company</h3>
              <ul className="mt-4 text-sm text-muted-foreground">
                <li className="">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href=""
                    className="hover:text-foreground transition-all duration-300"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
        <p className="text-sm text-muted-foreground mt-8 md:mt-0">
          &copy; {new Date().getFullYear()} QChatAI AI INC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
