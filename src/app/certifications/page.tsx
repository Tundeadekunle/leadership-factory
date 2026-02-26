import Link from 'next/link'
import Footer from '@/components/Footer'

export default function CertificationsPage() {
  return (
    <>
      <section className="bg-[#0B1F3B] text-white py-16 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary rounded-lg p-8 text-white">
              <h3 className="font-heading text-4xl font-semibold mb-4 text-[#C6A75E]">Certifications & Grading Policy</h3>
              {/* <p className="mb-4 text-2xl">
                To provide practical, performance-based Virtual Assistant training rooted in professionalism and accountability.
              </p> */}
              <h3 className="font-heading text-4xl md:text-2xl font-semibold mb-4 text-[#C6A75E]">Assessment Components</h3>
              <ul className="space-y-2 text-xl md:text-xl">
                <li>• Attendance (80%) </li>
                <li>• Weekly Assessments (50%)</li>
                <li>• Milestones (70%)</li>
                <li>• Capstone Project (50%)</li>
                <li>• Professional Conduct (30%)</li>
                <li>• Overall Certification Benchmark (90%)</li>
                {/* <li>• Professional Growth</li> */}
              </ul>
              
              
            </div>
          
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