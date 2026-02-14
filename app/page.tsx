import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-4">
        <h1 className="text-3xl font-bold">Ads Dashboard</h1>

        <p className="text-gray-600">
          Connect Google Ads and Meta Ads to see your blended performance in one
          simple dashboard.
        </p>

        <div className="flex gap-3">
          <Link
            href="/overview"
            className="px-4 py-2 rounded bg-black text-white"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/connections"
            className="px-4 py-2 rounded border"
          >
            Connections
          </Link>
        </div>
      </div>
    </div>
  );
}
