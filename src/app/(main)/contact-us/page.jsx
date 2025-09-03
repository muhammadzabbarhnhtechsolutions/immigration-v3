'use client';

import bgimg from "../../../assets/bgcontact.png"
export default function Page() {
  return (
    <div
    // style={{
    //   backgroundImage: `url(${bgimg.src})`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   backgroundRepeat: 'no-repeat',
    // }}
    className="py-28 px-4 bg-[#f8faf9] "
    >
      {/* <div className="bg-[#f8faf9] backdrop-blur-md p-4 rounded-lg"> */}
        {/* baqi ka code yahan paste karo */}
    

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Contact Form */}
        <div className="bg-white p-8 rounded-sm border-2 border-[#e6e8e7]/30 shadow-2xl w-full md:w-3/4">
          <h2 className="text-3xl font-semibold mb-2">
            Contact <span className="text-[#88B29A]">Us</span>
          </h2>
          <p className="text-[#88B29A] mb-8 font-sans">WE'D LOVE TO HEAR FROM YOU</p>

          <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#88B29A] border-[#88B29A]"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#88B29A] border-[#88B29A]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="phone"
                placeholder="phone"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#88B29A] border-[#88B29A]"
              />
              <input
                type="text"
                name="Email Address"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#88B29A] border-[#88B29A]"
              />
            </div>
       
            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#88B29A] border-[#88B29A]"
            ></textarea>
            <button
              type="submit"
              className="bg-[#88B29A] cursor-pointer text-white px-8 py-2 rounded-md hover:bg-[#76998a] transition-colors"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Right Contact Info */}
        <div className="bg-[#88B29A] p-8 rounded-md text-white w-full md:w-1/4 slide-in">
      <h3 className="text-xl font-semibold mb-8 border-l-2 pl-2">CONTACT US</h3>

      <div className="space-y-6">
        {/* Email */}
        <div>
          <h4 className="font-medium mb-2">Email</h4>
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full p-1">
              <svg className="w-5 h-5 text-[#88B29A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <span>info@immigration.com</span>
          </div>
        </div>

        {/* Phone */}
        <div>
          <h4 className="font-medium mb-2">Telephone</h4>
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full p-1">
              <svg className="w-5 h-5 text-[#88B29A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
            </div>
            <span>07578979789</span>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-2 border-l-2 pl-2">SOCIAL MEDIA</h4>
          <div className="flex gap-4 flex-wrap">
            {/* Icons */}
            {[
              'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z',
              'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z',
              'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
              'M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3-.07-2.49-.1-3.59-.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z'
            ].map((d, i) => (
              <a key={i} href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h4 className="font-semibold mb-2 border-l-2 pl-2">OUR WORKING HOURS</h4>
          <p>Monday - Friday : 9:30 - 17:30</p>
        </div>
      </div>
    </div>
      </div>
    </div>
    // </div>
    // </div>
  );
}
