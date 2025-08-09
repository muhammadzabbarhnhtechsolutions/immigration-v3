import Image from "next/image";
import Link from "next/link";

export default function WrittenResources() {
  return (
    <main className="min-h-screen bg-white">
      {/* Written Resources Section */}
      <section className="py-20" style={{ backgroundColor: "#8BAC9A14" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              Written <span className="text-[#88B29A]">Resources</span>
            </h2>
            <p className="text-gray-600">
              Read our expertly crafted resources which will elevate your practice.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 mt-12">
            <div className="flex justify-center">
              <Image
                src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/07/Written-2.png"
                alt="Written Resources"
                width={500}
                height={500}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto"
              />
            </div>

            <div className="text-center lg:text-left ">
              <h3 className="text-2xl leading-relaxed md:text-3xl font-medium text-[#88B29A] mb-6">
                Resources that you can refer
                <br className="hidden  sm:block" />
                back to time and time again
              </h3>
              <p className="text-gray-600 mb-8 text-[14px]">
                Developed by a highly qualified team of healthcare experts and specialists, our written resources are
                concise, informative and just what you need to understand healthcare management.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center bg-[#88B29A] text-white px-6 py-3 rounded-md font-medium hover:bg-[#88B29A] transition-colors"
              >
                See Pricing Plans
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
