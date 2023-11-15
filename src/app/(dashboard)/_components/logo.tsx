import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/"
      className="cursor-pointer bg-gradient-to-r from-indigo-400 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent"
    >
      Form Wizard
    </Link>
  )
}
