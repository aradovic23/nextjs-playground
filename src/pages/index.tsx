import Link from "next/link";

export default function Home() {

  return (
    <main className="grid h-screen grid-cols-2 gap-5 place-items-center">
      <Link className="text-blue-500 underline" href="/tables/styled">styled table</Link>
      <Link className="text-blue-500 underline" href="/tables/unstyled">unstyled table</Link>
    </main>
  )
}
