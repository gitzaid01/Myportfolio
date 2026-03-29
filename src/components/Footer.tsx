export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800">
      {/* Top section */}
      <div className="px-4 pt-12 pb-4">
        {/* Headline */}
        <p className="text-2xl sm:text-3xl font-semibold text-zinc-100 max-w-xl m-4">
          Welcome to my portfolio! I'm Zaid, a passionate developer crafting digital
          experiences that are clean, modern, and user-friendly.
        </p>

        {/* Three-column info row */}
        <div className="mb-8 px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-6 w-full">
          {/* Intro */}
          <div className="w-full md:w-1/2">
            <p className="text-left text-xs sm:text-sm text-zinc-400 max-w-md">
              Explore my diverse projects showcasing creativity and technical expertise,
              connect with me on various social platforms to stay updated, and let's
              collaborate to build innovative, impactful, and unforgettable digital
              experiences that push boundaries and bring your ideas to life!
            </p>
          </div>

          {/* Terms & Conditions */}
          <div className="w-full md:w-1/6">
            <h2 className="text-lg font-bold mb-2 text-zinc-100">Terms & Conditions</h2>
            <ul className="text-xs sm:text-sm text-zinc-400 space-y-1 list-disc list-inside">
              <li>
                <a href="/terms-of-service" className="hover:text-violet-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="hover:text-violet-400 transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="hover:text-violet-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-2 text-zinc-100">Contact</h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Email:{" "}
              <a
                href="mailto:contact@myportfolio.com"
                className="hover:text-violet-400 transition-colors"
              >
                contact@myportfolio.com
              </a>
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="hover:text-violet-400 transition-colors"
              >
                +1 234 567 890
              </a>
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Location: Your City, Your Country
            </p>
          </div>
        </div>
      </div>

      {/* Giant ZAID wordmark — violet tint on hover */}
      <div className="overflow-hidden leading-none">
        <h1
          className="w-full font-black tracking-tighter leading-none select-none uppercase
                     text-[41vw] text-center antialiased
                     text-zinc-800 hover:text-violet-900 transition-colors duration-500 cursor-default"
        >
          ZAID
        </h1>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 px-4 py-4 flex flex-col  items-center gap-2">
        <p className="text-center text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
        </p>

        {/* Social icons row */}
        <div className="flex space-x-5">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-500 hover:text-violet-400 transition-colors"
          >
            
            <i className="fab fa-github text-xl" aria-hidden="true" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-500 hover:text-violet-400 transition-colors"
          >
            <i className="fab fa-linkedin text-xl" aria-hidden="true" />
          </a>
          <a
            href="mailto:youremail@example.com"
            aria-label="Email"
            className="text-zinc-500 hover:text-violet-400 transition-colors"
          >
            <i className="fas fa-envelope text-xl" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}