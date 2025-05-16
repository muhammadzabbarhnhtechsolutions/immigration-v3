"use client"

import Image from "next/image";

export default function WhyImmigrationNavigator() {
    return (
        <div className="min-h-screen mt-16 bg-white py-12 px-4">
        <div className="max-w-7xl mx-16 mb-16">
          <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12">
            Why <span className="text-sage-600 ">Immigration Navigator</span>
          </h2>
  
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#8BAC9A73] border border-[#90B29F] p-10 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-16 flex items-center justify-center">
                <Image
                  src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/excellent.png"
                  alt="Aim for excellence"
                  width={108}
                  height={108}
                />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Aim for excellence</h3>
              <p className="text-gray-600">
                In legal professionals, it is important that we achieve the best
                results for our clients. We are driven to provide the resources
                you need to obtain the required results.
              </p>
            </div>
  
            <div className="bg-[#8BAC9A73] border border-[#90B29F] p-10 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-16 flex items-center justify-center">
                <Image
                  src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/online-lesson.png"
                  alt="Innovative strategies"
                  width={108}
                  height={108}
                />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Innovative strategies
              </h3>
              <p className="text-gray-600">
                Through comprehensive courses, application templates and written
                resources, we offer a complete package that is relevant for the
                modern-day legal professional.
              </p>
            </div>
  
            <div className="bg-[#8BAC9A73] border border-[#90B29F] p-10 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-16 flex items-center justify-center">
                  <Image
                    src="https://immigrationnavigator.co.uk/wp-content/uploads/2023/06/trust.png"
                    alt="Trusted by many"
                    width={108}
                    height={108}
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted by many</h3>
              <p className="text-gray-600">
                Our users report that the varied range of resources have made the
                application process seamless and efficient.
              </p>
            </div>
          </div>
        </div>
  
    
  
        <style jsx global>{`
          .text-sage-600 {
            color: #84a98c;
          }
          .bg-sage-400 {
            background-color: #84a98c;
          }
          .bg-sage-500 {
            background-color: #76998a;
          }
          .hover\:bg-sage-100:hover {
            background-color: #e8f1e9;
          }
          .text-sage-400 {
            color: #84a98c;
          }
          .bg-sage-100 {
            background-color: #e8f1e9;
          }
        `}</style>
      </div>    );
}