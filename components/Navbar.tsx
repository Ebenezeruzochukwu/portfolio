import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#12141c]/80 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Icon / Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e54316] to-[#ff6b3d] flex items-center justify-center font-bold text-white text-base shadow-lg shadow-orange-500/20">
            EU
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Ebenezer Uzochukwu
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
          <Link href="#about" className="hover:text-white transition">
            About
          </Link>
          <Link href="#services" className="hover:text-white transition">
            Expertise
          </Link>
          <Link href="#projects" className="hover:text-white transition">
            Work
          </Link>
        </div>

        {/* Action Button */}
        <div>
          <a
            href="mailto:contact@ebenezeruzochukwu.com"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e54316] to-[#f95724] text-white font-semibold text-sm shadow-lg shadow-orange-500/25 hover:opacity-95 transition"
          >
            Get in Touch
          </a>
        </div>
      </nav>
    </header>
  )
}