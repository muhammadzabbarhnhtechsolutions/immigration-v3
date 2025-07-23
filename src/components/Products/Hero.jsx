import Image from "next/image"
import Link from "next/link"

export default function VideoResources() {
  return (
    <>
     {/* Products Section */}
     <section className="relative bg-[#e6f0f0] py-32 overflow-hidden">
     {/* Diagonal stripes background */}
     <div className="absolute inset-0 w-full h-full">
       {[...Array(5)].map((_, i) => (
         <div
           key={i}
           className="absolute bg-[#f6f0e7] w-28 rounded-xl h-[200%] -rotate-[30deg]"
           style={{ left: `${i * 20}%`, top: "-50%" }}
         ></div>
       ))}
     </div>

     <div className="container mx-auto px-4 relative z-10">
       <div className="max-w-2xl mx-auto text-center">
         <h2 className="text-3xl md:text-[40px] font-sans font-bold mb-4">
           Our <span className="text-[#3F855DBD]">Products</span>
         </h2>
         <p className="text-gray-600 mb-8">
           Experience our cutting edge and innovative resources, and elevate your expertise.
         </p>
         <div className="flex flex-wrap justify-center gap-4">
           <button className="bg-[#6ca183]  text-white px-6 cursor-pointer py-3 rounded-md  text-base hover:bg-[#3F855DBD]transition-colors">
             Buy Now
           </button>
           <button className="bg-[#6ca183]  text-white px-6 cursor-pointer py-3 rounded-md  text-base hover:bg-[#3F855DBD]transition-colors">
             Request A Demo
           </button>
         </div>
       </div>
     </div>
   </section>
    <div className="max-w-6xl mx-auto px-4 py-8 mt-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          <span className="text-black">Video </span>
          <span className="text-[#3D61AB]">Resources</span>
        </h1>
        <p className="text-sm max-w-xl mx-auto">
          A next-generation video library containing pertinent information relating to the application process.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="md:w-1/2 flex flex-col justify-center mb-20">
          <h2 className="text-2xl md:text-[32px] md:font-medium font-sans text-gray-800 font-medium text-[#3D61AB] mb-6 leading-relaxed">
            The only service which guides you through the application process
          </h2>
          <p className="text-sm md:text-[14px] mb-8 text-gray-700 leading-relaxed">
            Our bank of video resources delivers insightful information in visual format, making our resources
            accessible and digestible. These short video clips are created by a leading barrister, and can summarize the
            entire application process.
          </p>
          <div>
            <Link
              href="/pricing"
              className="bg-[#3D61AB] text-white px-6 py-3 text-sm md:text-[14.8px] rounded-md inline-block hover:bg-[#6a9a7d] transition-colors font-semibold font-sans"
            >
              See Pricing Plans →
            </Link>
          </div>
        </div>
        {/* Left Text Content */}

        {/* Right Video Preview */}
        <div className="md:w-2xl">
          <div className=" p-4 rounded-md">
            <div className=" bg-white rounded-md p-4">
            <Image src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/07/Video-Home.png" alt="Video Preview" width={600} height={600} />
           
            </div>
          </div>
        </div>
      </div>

      {/* Three Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Immigration Card */}
        <div className="border border-[#6ca183] rounded-md p-6 bg-[#8BAC9A2B]">
          <h3 className="font-semibold text-[21.4px] font-sans  mb-6 text-gray-800">Personal Immigration</h3>
          <p className="text-base text-gray-600 md:text-[14px] leading-relaxed">
            Understand how to structure an application for spouse/partner visas, indefinite leave to remain, adult dependent visas, skilled worker and health and care visas. Our package includes the documents required, highlights commonly made mistakes and addresses common FAQs.
          </p>
        </div>

        {/* Business Visas Card */}
        <div className="border border-[#6ca183] rounded-md p-6 bg-[#88B29A96]">
          <h3 className="font-semibold text-[20px] font-sans  mb-6 text-gray-800">Business Visas</h3>
          <p className="text-base text-gray-600 md:text-[14px] leading-relaxed">
          Understand how to structure an application for global talent visas, expansion worker and sole representative visas, and scale up visas. Our package includes the documents required, highlights commonly made mistakes and addresses common FAQs.          </p>
        </div>

        {/* Other Card */}
        <div className="border border-[#6ca183] rounded-md p-6 bg-[#8BAC9A2B]">
          <h3 className="font-semibold text-[20px] text-gray-800 font-sans  mb-6 leading-relaxed">Other</h3>
          <p className="text-base text-gray-600">
            Helpful videos for other immigration for a spouse, fiancé/ee for limited appeals, judicial review, asylum
            and citizenship.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
