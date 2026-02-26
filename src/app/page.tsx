import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Footer from '@/components/Footer'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // Fetch user role and redirect to appropriate dashboard
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'student') redirect('/dashboard/student')
    if (profile?.role === 'lecturer') redirect('/dashboard/lecturer')
    if (profile?.role === 'admin') redirect('/dashboard/admin')
  }

return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0B1F3B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-xl md:text-5xl lg:text-6xl font-bold mb-6">
              Build In-Demand Virtual Assistant Skills <span className="text-secondary">That Employers Trust</span>
            </h1>
            <p className="text-[15px]  md:text-xl max-w-3xl mx-auto mb-10">
              Structured, practical training designed to produce confident, job-ready Virtual Assistant.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/programs"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 hover:text-white transition"
              >
                Explore Programs
              </Link>
              {/* <Link
                href="/contact"
                className="border-2 border-secondary text-secondary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary hover:text-primary transition"
              >
                Contact Us
              </Link> */}
              <Link
                                href="/auth/signup"
                                className="bg-blue-900 text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                              >
                                Sign Up
                              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Introduction */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-[#C6A75E] mb-4">
                Welcome to Skill Leadership Factory
              </h2>
              <p className="text-gray-300 mb-4 text-xl">
                Skill Leadership Factory is a professional training institution focused on practical, structured Virtual Assistant education. We train professionals through hands-on exercises, real-world simulations, structured assessments, and performance based certification.
              </p>
              {/* <p className="text-gray-300">
                Our mission is to provide accessible, high-quality education that prepares students 
                for the challenges of tomorrow. With state-of-the-art facilities and experienced faculty, 
                we nurture the leaders of the future.
              </p> */}
            </div>
            <div className="bg-primary rounded-lg p-8 text-white">
              <h3 className="font-heading text-2xl font-semibold mb-4 text-[#C6A75E]">Our Vision</h3>
              <p className="mb-4">
                To provide practical, performance-based Virtual Assistant training rooted in professionalism and accountability.
              </p>
              <h3 className="font-heading text-2xl font-semibold mb-4 text-[#C6A75E]">Our Values</h3>
              <ul className="space-y-2">
                <li>• Excellence in everything we do</li>
                <li>• Inclusivity and diversity</li>
                <li>• Innovation and adaptability</li>
                <li>• Integrity and accountability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Program Overview */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-[#C6A75E] text-center mb-12">
            Our Flagship Program
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white">
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                Professional Virtual Assistant
              </h3>
              <p className="text-gray-600 mb-4">
                Certification Program.
              </p>
              {/* <Link href="/programs/business" className="text-secondary font-medium hover:underline">
                Learn more →
              </Link> */}
            </div>
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white">
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                Duration
              </h3>
              <p className="text-gray-600 mb-4">
                12 Weeks
              </p>
              <p className="text-black mb-4 text-[15px] font-semibold">
                Format: Virtual (Live + Practical Labs)
              </p>
              {/* <Link href="/programs/data-science" className="text-secondary font-medium hover:underline">
                Learn more →
              </Link> */}
            </div>
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white">
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                Schedule
              </h3>
              <p className="text-gray-600 mb-4">
                Monday - Friday
              </p>
              {/* <Link href="/programs/marketing" className="text-secondary font-medium hover:underline">
                Learn more →
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-primary text-center mb-12">
            Why Choose Learning Institute?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#0B1F3B] text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#C6A75E] font-bold">1</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                Structured 3-Months Curriculum
              </h3>
              {/* <p className="text-gray-600">
                Learn from industry leaders and experienced educators.
              </p> */}
            </div>
            <div className="text-center">
              <div className="bg-[#0B1F3B] text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#C6A75E] font-bold">2</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                Weekly Assessments & Milestones
              </h3>
              {/* <p className="text-gray-600">
                Online, on‑campus, and hybrid options to fit your schedule.
              </p> */}
            </div>
            <div className="text-center">
              <div className="bg-[#0B1F3B] text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#C6A75E] font-bold">3</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                Real Client Simulation
              </h3>
              {/* <p className="text-gray-600">
                Join a community of alumni across 50+ countries.
              </p> */}
            </div>
            <div className="text-center">
              <div className="bg-[#0B1F3B] text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#C6A75E] font-bold">4</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                Professional Grading System
              </h3>
              {/* <p className="text-gray-600">
                Dedicated career services to help you achieve your goals.
              </p> */}
            </div>
            <div className="text-center">
              <div className="bg-[#0B1F3B] text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#C6A75E] font-bold">5</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                Practical Lab Sessions
              </h3>
              {/* <p className="text-gray-600">
                Dedicated career services to help you achieve your goals.
              </p> */}
            </div>
            <div className="text-center">
              <div className="bg-[#0B1F3B] text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#C6A75E] font-bold">6</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                Mentorship & Career Guidance
              </h3>
              {/* <p className="text-gray-600">
                Dedicated career services to help you achieve your goals.
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Specialization Tracks */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-[#C6A75E] text-center mb-12">
            Specialization Tracks
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Executive Virtual Assistance',
              'Administrative Virtual Assistance',
              'Social Media Virtual Assistance',
              'Customer Support Virtual Assistance',
              'Real Estate Virtual Assistance',
              'E-Commerce Virtual Assistance',
            ].map((track) => (
              <div key={track} className="border border-gray-200 rounded-lg p-5 flex items-center bg-[#C6A75E]">
                <div className="bg-secondary text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-heading text-primary">{track}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification & Performance Standards */}
      <section className="py-16 bg-[#0B1F3B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-[#C6A75E] mb-4">
                Certification & Performance Standards
              </h2>
              <p className="mb-4">
                Students are evaluated based on Attendance, Weekly Assessments, Milestones, Capstone Project and Professional Conduct. Certification is based on performance standards.
              </p>
              <ul className="space-y-2">
                {/* <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Accredited by leading industry bodies
                </li> */}
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Performance-based assessments
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Continuous feedback and improvement
                </li>
                {/* <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Digital badges and verifiable credentials
                </li> */}
              </ul>
            </div>
            <div className="bg-white text-primary p-8 rounded-lg">
              <h3 className="font-heading text-2xl text-[#0B1F3B] font-semibold mb-4">Our Certifications</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-2">
                  <p className="font-heading font-semibold text-[#0B1F3B]">Professional Certificate in Virtual Assistant</p>
                  <p className="text-sm text-gray-600">120 hours | Level 6</p>
                </div>
                <div className="border-b border-gray-200 pb-2 text-[#0B1F3B]">
                  <p className="font-heading font-semibold">Advanced Data Science Diploma</p>
                  <p className="text-sm text-gray-600">200 hours | Level 7</p>
                </div>
                <div className="border-b border-gray-200 pb-2 text-[#0B1F3B]">
                  <p className="font-heading font-semibold">Digital Marketing Mastery</p>
                  <p className="text-sm text-gray-600">90 hours | Level 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-primary text-center mb-12">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 bg-[#0B1F3B] p-8 rounded-lg">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 italic mb-4">
                "The Business Leadership program transformed my career. The faculty were incredibly supportive."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                  JD
                </div>
                <div className="ml-3">
                  <p className="font-heading font-semibold text-primary">Jane Doe</p>
                  <p className="text-sm text-gray-500">Class of 2023</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 italic mb-4">
                "The Data Science track gave me hands-on experience with real-world projects. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                  JS
                </div>
                <div className="ml-3">
                  <p className="font-heading font-semibold text-primary">John Smith</p>
                  <p className="text-sm text-gray-500">Class of 2024</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 italic mb-4">
                "The flexibility of online learning allowed me to balance work and study perfectly."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                  MJ
                </div>
                <div className="ml-3">
                  <p className="font-heading font-semibold text-primary">Mary Johnson</p>
                  <p className="text-sm text-gray-500">Class of 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}








// import Link from 'next/link'
// import Image from 'next/image'
// import { createClient } from '@/lib/supabase/server'
// import { redirect } from 'next/navigation'
// import Footer from '@/components/Footer'

// export default async function LandingPage() {
//   const supabase = createClient()
//   const { data: { user } } = await supabase.auth.getUser()

// // await supabase.auth.getUser()

//   if (user) {
//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('role')
//       .eq('id', user.id)
//       .single()
//     if (profile?.role === 'student') redirect('/dashboard/student')
//     if (profile?.role === 'lecturer') redirect('/dashboard/lecturer')
//     if (profile?.role === 'admin') redirect('/dashboard/admin')
//   }

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-primary text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//               Empower Your <span className="text-secondary">Learning Journey</span>
//             </h1>
//             <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
//               Discover world-class education, expert instructors, and a community dedicated to your success.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Link
//                 href="/programs"
//                 className="bg-secondary text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
//               >
//                 Explore Programs
//               </Link>
//               <Link
//                 href="/contact"
//                 className="border-2 border-secondary text-secondary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary hover:text-primary transition"
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Institutional Introduction */}
//       <section className="py-16 bg-light-gray">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="font-heading text-3xl font-bold text-primary mb-4">
//                 Welcome to Learning Institute
//               </h2>
//               <p className="text-gray-700 mb-4">
//                 For over 20 years, Learning Institute has been at the forefront of innovative education. 
//                 We believe in transforming lives through knowledge and practical skills.
//               </p>
//               <p className="text-gray-700">
//                 Our mission is to provide accessible, high-quality education that prepares students 
//                 for the challenges of tomorrow. With state-of-the-art facilities and experienced faculty, 
//                 we nurture the leaders of the future.
//               </p>
//             </div>
//             <div className="bg-primary rounded-lg p-8 text-white">
//               <h3 className="font-heading text-2xl font-semibold mb-4 text-secondary">Our Vision</h3>
//               <p className="mb-4">
//                 To be a globally recognized center of excellence in education, fostering innovation and 
//                 lifelong learning.
//               </p>
//               <h3 className="font-heading text-2xl font-semibold mb-4 text-secondary">Our Values</h3>
//               <ul className="space-y-2">
//                 <li>• Excellence in everything we do</li>
//                 <li>• Inclusivity and diversity</li>
//                 <li>• Innovation and adaptability</li>
//                 <li>• Integrity and accountability</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Flagship Program Overview */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="font-heading text-3xl font-bold text-primary text-center mb-12">
//             Our Flagship Programs
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
//               <h3 className="font-heading text-xl font-semibold text-primary mb-3">
//                 Business Leadership
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 Comprehensive program covering management, strategy, and entrepreneurship.
//               </p>
//               <Link href="/programs/business" className="text-secondary font-medium hover:underline">
//                 Learn more →
//               </Link>
//             </div>
//             <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
//               <h3 className="font-heading text-xl font-semibold text-primary mb-3">
//                 Data Science & AI
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 Master machine learning, data analysis, and artificial intelligence.
//               </p>
//               <Link href="/programs/data-science" className="text-secondary font-medium hover:underline">
//                 Learn more →
//               </Link>
//             </div>
//             <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
//               <h3 className="font-heading text-xl font-semibold text-primary mb-3">
//                 Digital Marketing
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 Learn SEO, social media, content marketing, and analytics.
//               </p>
//               <Link href="/programs/marketing" className="text-secondary font-medium hover:underline">
//                 Learn more →
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-16 bg-light-gray">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="font-heading text-3xl font-bold text-primary text-center mb-12">
//             Why Choose Learning Institute?
//           </h2>
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold">1</span>
//               </div>
//               <h3 className="font-heading text-lg font-semibold text-primary mb-2">
//                 Expert Faculty
//               </h3>
//               <p className="text-gray-600">
//                 Learn from industry leaders and experienced educators.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold">2</span>
//               </div>
//               <h3 className="font-heading text-lg font-semibold text-primary mb-2">
//                 Flexible Learning
//               </h3>
//               <p className="text-gray-600">
//                 Online, on‑campus, and hybrid options to fit your schedule.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold">3</span>
//               </div>
//               <h3 className="font-heading text-lg font-semibold text-primary mb-2">
//                 Global Network
//               </h3>
//               <p className="text-gray-600">
//                 Join a community of alumni across 50+ countries.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold">4</span>
//               </div>
//               <h3 className="font-heading text-lg font-semibold text-primary mb-2">
//                 Career Support
//               </h3>
//               <p className="text-gray-600">
//                 Dedicated career services to help you achieve your goals.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Specialization Tracks */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="font-heading text-3xl font-bold text-primary text-center mb-12">
//             Specialization Tracks
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               'Artificial Intelligence',
//               'Cybersecurity',
//               'Financial Analysis',
//               'Human Resources',
//               'Project Management',
//               'UX/UI Design',
//             ].map((track) => (
//               <div key={track} className="border border-gray-200 rounded-lg p-5 flex items-center">
//                 <div className="bg-secondary text-primary w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <span className="font-heading text-primary">{track}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Certification & Performance Standards */}
//       <section className="py-16 bg-primary text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="font-heading text-3xl font-bold text-secondary mb-4">
//                 Certification & Performance Standards
//               </h2>
//               <p className="mb-4">
//                 Our programs are designed to meet rigorous industry standards. Upon completion, 
//                 you'll receive a globally recognized certificate that validates your expertise.
//               </p>
//               <ul className="space-y-2">
//                 <li className="flex items-start">
//                   <span className="text-secondary mr-2">✓</span>
//                   Accredited by leading industry bodies
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-secondary mr-2">✓</span>
//                   Performance-based assessments
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-secondary mr-2">✓</span>
//                   Continuous feedback and improvement
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-secondary mr-2">✓</span>
//                   Digital badges and verifiable credentials
//                 </li>
//               </ul>
//             </div>
//             <div className="bg-white text-primary p-8 rounded-lg">
//               <h3 className="font-heading text-2xl font-semibold mb-4">Our Certifications</h3>
//               <div className="space-y-4">
//                 <div className="border-b border-gray-200 pb-2">
//                   <p className="font-heading font-semibold">Professional Certificate in Business</p>
//                   <p className="text-sm text-gray-600">120 hours | Level 6</p>
//                 </div>
//                 <div className="border-b border-gray-200 pb-2">
//                   <p className="font-heading font-semibold">Advanced Data Science Diploma</p>
//                   <p className="text-sm text-gray-600">200 hours | Level 7</p>
//                 </div>
//                 <div className="border-b border-gray-200 pb-2">
//                   <p className="font-heading font-semibold">Digital Marketing Mastery</p>
//                   <p className="text-sm text-gray-600">90 hours | Level 5</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-16 bg-light-gray">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="font-heading text-3xl font-bold text-primary text-center mb-12">
//             What Our Students Say
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <p className="text-gray-700 italic mb-4">
//                 "The Business Leadership program transformed my career. The faculty were incredibly supportive."
//               </p>
//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
//                   JD
//                 </div>
//                 <div className="ml-3">
//                   <p className="font-heading font-semibold text-primary">Jane Doe</p>
//                   <p className="text-sm text-gray-500">Class of 2023</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <p className="text-gray-700 italic mb-4">
//                 "The Data Science track gave me hands-on experience with real-world projects. Highly recommend!"
//               </p>
//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
//                   JS
//                 </div>
//                 <div className="ml-3">
//                   <p className="font-heading font-semibold text-primary">John Smith</p>
//                   <p className="text-sm text-gray-500">Class of 2024</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <p className="text-gray-700 italic mb-4">
//                 "The flexibility of online learning allowed me to balance work and study perfectly."
//               </p>
//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
//                   MJ
//                 </div>
//                 <div className="ml-3">
//                   <p className="font-heading font-semibold text-primary">Mary Johnson</p>
//                   <p className="text-sm text-gray-500">Class of 2022</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </>
//   )
// }