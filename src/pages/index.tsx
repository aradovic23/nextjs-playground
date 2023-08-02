import Link from "next/link";

export default function Home() {

  return (
    <main className="grid h-screen place-items-center">
      <h1 className="text-2xl font-bold">Playground </h1>
      <div className="grid grid-cols-2 gap-5 place-items-center">
        <Link className="text-blue-500 underline" href="/tables/styled">styled table</Link>
        <Link className="text-blue-500 underline" href="/tables/unstyled">unstyled table</Link>
      </div>
    </main>
  )
}
