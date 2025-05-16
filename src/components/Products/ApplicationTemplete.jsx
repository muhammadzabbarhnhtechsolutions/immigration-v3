import Image from "next/image"
import Link from "next/link"

export default function ApplicationTemplates() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-medium mb-2">
          <span className="text-black">Application </span>
          <span className="text-[#7bab8e]">Templates</span>
        </h1>
        <p className="text-sm max-w-xl mx-auto">Streamline the application process through the use of our templates.</p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Left Text Content */}
        <div className="md:w-1/2 flex flex-col md:mb-28 justify-center">
          <h2 className="text-2xl md:text-[34px] font-semibold text-[#7bab8e] mb-4 leading-relaxed">Time-saving and effective</h2>
          <p className="text-base mb-8 text-gray-700">Save time, worry and stress through use of our proven templates.</p>
          <div>
            <Link
              href="/pricing"
              className="bg-[#7bab8e] text-white px-6 py-3 text-base rounded-md inline-block hover:bg-[#6a9a7d] transition-colors"
            >
              See Pricing Plans →
            </Link>
          </div>
        </div>

        {/* Right Template Preview */}
        <div className="md:w-1/2">
          <Image src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/07/Rectangle-2.png" alt="Template Preview" width={600} height={600} />
        </div>
      </div>
    </div>
  )
}
