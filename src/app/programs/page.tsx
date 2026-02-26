import Link from 'next/link'
import Footer from '@/components/Footer'

export default function ProgramsPage() {
  return (
    <>
      <section className="bg-[#0B1F3B] text-white py-16 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary rounded-lg p-8 text-white">
              <h3 className="font-heading text-4xl font-semibold mb-4 text-[#C6A75E]">Program Structure</h3>
              {/* <p className="mb-4 text-2xl">
                To provide practical, performance-based Virtual Assistant training rooted in professionalism and accountability.
              </p> */}
              <h3 className="font-heading text-4xl md:text-2xl font-semibold mb-4 text-[#C6A75E]">Our Structure</h3>
              <ul className="space-y-2 text-xl md:text-xl">
                <li>• Month 1: Foundation. <span>This include Core Administrative Skills, Tools, Communication, Systems</span></li>
                <li>• Month 2: Specialization Tracks</li>
                <li>• Month 3: Advance Practice, Portfolio Development, Capstone Project</li>
                {/* <li>• Professional Growth</li> */}
              </ul>
            </div>
          {/* <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-secondary">Us</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn about our history, mission, and the people behind Learning Institute.
          </p> */}
        </div>
      </section>

      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading text-3xl text-primary">Our Story</h2>
            <p>
              Founded in 2005, Learning Institute began as a small workshop in a community center. 
              Today, we are a globally recognized institution with thousands of alumni.
            </p>
            <h2 className="font-heading text-2xl text-primary mt-8">Mission & Vision</h2>
            <p>
              Our mission is to provide accessible, high-quality education that empowers individuals 
              to achieve their personal and professional goals.
            </p>
          </div>
        </div>
      </section> */}

      <Footer />
    </>
  )
}