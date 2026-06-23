/** Skeleton for the detail page while the Pokémon data loads */
export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero skeleton */}
      <div className="h-64 animate-pulse bg-gray-300 dark:bg-gray-700 sm:h-72" />

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
        {/* Name skeleton */}
        <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />

        {/* Two-column detail skeleton */}
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="space-y-3 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800"
            >
              <div className="h-5 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="h-4 animate-pulse rounded bg-gray-100 dark:bg-gray-700/50"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
