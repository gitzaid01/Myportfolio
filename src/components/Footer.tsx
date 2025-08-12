export default function Footer() {
  return (
    <footer className="bg-orange-600 text-black py-6 flex flex-col items-center justify-center">
      <div >
        <div>
        <div className="text-3xl text-left max-w-xl  m-4">
            <p className="text-2xl  sm:text-3xl font-semibold">
      Welcome to my portfolio! I’m Zaid, a passionate developer crafting digital
      experiences that are clean, modern, and user-friendly.
    </p>
        </div>
<div className="mb-8 px-4 flex flex-col  md:flex-row md:justify-between md:items-start gap-6 w-full">
  {/* Left side: Intro Text */}
  <div className="w-full md:w-1/2 text-center md:text-left">
    
    <p className="mt-2 text-left text-xs sm:text-sm text-gray-900 max-w-md mx-auto md:mx-0">
      Explore my diverse projects showcasing creativity and technical expertise, connect with me on various social platforms to stay updated, and let’s collaborate to build innovative, impactful, and unforgettable digital experiences that push boundaries and bring your ideas to life!
    </p>
  </div>

  {/* Middle: Terms & Conditions */}
  <div className="w-full md:w-1/6  md:text-left">
    <h2 className="text-lg font-bold mb-2">Terms & Conditions</h2>
    <ul className="text-xs sm:text-sm text-gray-900 space-y-1 list-disc list-inside">
      <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
      <li><a href="/refund-policy" className="hover:underline">Refund Policy</a></li>
      <li><a href="/cookie-policy" className="hover:underline">Cookie Policy</a></li>
    </ul>
  </div>

  {/* Right side: Contact */}
  <div className="w-full md:w-1/3  md:text-left">
    <h2 className="text-lg font-bold mb-2">Contact</h2>
    <p className="text-xs sm:text-sm text-gray-900">
      Email: <a href="mailto:contact@myportfolio.com" className="hover:underline">contact@myportfolio.com</a>
    </p>
    <p className="text-xs sm:text-sm text-gray-900 mt-1">
      Phone: <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a>
    </p>
    <p className="text-xs sm:text-sm text-gray-900 mt-1">
      Location: Your City, Your Country
    </p>
  </div>
</div>

</div>


       
 <h1 className="w-full font-black tracking-tight leading-none select-none uppercase text-[41vw] sm:text-[18vw] md:text-[41vw] lg:text-[41vw] text-center antialiased break-words">
  ZAID
</h1>




        <p className="text-center text-sm">&copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.</p>
        

        {/* Contact and Social Links */}
        
      
        

        
        </div>
        
    </footer>
  );
}
