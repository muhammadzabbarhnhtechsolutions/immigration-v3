import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <main className="min-h-screen mx-12 bg-white">
      {/* Hero Section */}
      <section className="container  px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="mx-12 mt-12">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Take steps to <br />
            succeed, grow & <br />
            <span className="text-[#90B29F]">
              elevate your <br />
              practice
            </span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-md">
            Immigration Navigator is a successful platform which offers you the
            chance to further your practice in UK Immigration Law through our
            wide range of services.
          </p>
          <button className="mt-6 flex cursor-pointer items-center bg-[#3F855DBD] text-white px-6 py-3 rounded-md font-medium hover:bg-[#3F855DBD] transition-colors">
            Explore Products <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
        <div className="p-6 mt-6 rounded-lg flex justify-center">
          <Image
            src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/07/about-768x544.png"
            alt="Hero Image"
            width={600}
            height={400}
            className="max-w-full h-auto"
          />
        </div>
      </section>

      {/* Our Story & Mission Section */}
      <section className="bg-[#90B29F14] container  px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl md:text-[35px] font-bold text-[#90B29F] font-sans mb-4">Our Story</h2>
            <p className="text-[#676767] mb-4 md:text-[14px]">
              At Immigration Navigator, our story is one driven by a passion for
              excellence in UK Immigration Law. Founded by experienced legal
              professionals, we recognised the need for comprehensive and
              accessible resources. With our video resources, written guides,
              and application templates, we empower individuals and legal
              professionals to navigate the complexities of UK Immigration Law
              with confidence and achieve their desired outcomes.
            </p>
            <p className="text-[#676767] md:text-[14px]">
              We provide a comprehensive range of resources, including video
              resources, written materials, and application templates, to meet
              your specific needs.
            </p>
          </div>
          <div className="p-6 rounded-lg ">
            <h2 className="text-2xl md:text-[35px] font-sans font-bold text-[#90B29F] mb-4">
              Our Mission
            </h2>
            <p className="text-[#676767] mb-4 md:text-[14px]">
              We are dedicated to providing comprehensive resources and expert
              guidance in the complex field of UK Immigration Law. We offer a
              range of specialised services to empower you in navigating the
              intricacies of immigration applications and processes.
            </p>
            <p className="text-[#676767] mb-4 md:text-[14px]">
              We have earned a reputation for our reliable and accurate
              Immigration Law resources. Our materials are meticulously
              researched and regularly updated to reflect the latest legal
              developments. Rely on our trusted expertise to guide you through
              the ever-changing immigration landscape.
            </p>
          </div>
        </div>
      </section>

     {/* CTA Section */}
<section className="container mx-auto px-2 py-12 mb-12">
  <div className="bg-[#90b29f] p-6 md:p-12 flex flex-col md:flex-row md:justify-between items-center rounded-lg gap-6">
    {/* Left Content */}
    <div className="flex flex-col text-center md:text-left items-center md:items-start">
      <h2 className="text-2xl md:text-4xl font-bold text-[#ffffff] mb-4">
        Start Your Journey Today!
      </h2>
      <p className="text-white mb-6 max-w-2xl">
        Explore our resources by signing up to gain the knowledge and tools
        required to navigate UK Immigration Law with confidence.
      </p>
    </div>

    {/* Right Button */}
    <div>
      <button className="bg-white flex items-center justify-center px-6 py-3 text-[#3F855DBD] rounded-md font-medium hover:bg-[#3F855DBD] hover:text-white transition-colors">
        Explore Our Products <ArrowRightIcon className="ml-2 h-5 w-5" />
      </button>
    </div>
  </div>
</section>


    </main>
  );
}
