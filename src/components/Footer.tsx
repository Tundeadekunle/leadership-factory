import Link from 'next/link'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3B] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-secondary">Contact Us</h3>
            <p className="mb-2">American Space, Ogun Tech Hub,</p>
            <p className="mb-2">Abeokuta, Ogun State.</p>
            <p className="mb-2">Phone: +234 703 276 1263</p>
            <p>Email: info@skillleadershipfactory.edu</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-secondary transition">About Us</Link></li>
              <li><Link href="/programs" className="hover:text-secondary transition">Programs</Link></li>
              <li><Link href="/admissions" className="hover:text-secondary transition">Admissions</Link></li>
              <li><Link href="/certifications" className="hover:text-secondary transition">Certifications</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition">Contact</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-secondary">Policies</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-secondary transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary transition">Terms of Service</Link></li>
              <li><Link href="/accessibility" className="hover:text-secondary transition">Accessibility</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-secondary">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Skill Leadership Factory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}