/** Skeleton shown while the list page fetches data */
export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-red-600 to-red-400 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-3">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-white/30" />
          <div className="h-5 w-72 animate-pulse rounded-lg bg-white/20" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Search/filter skeleton */}
        <div className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Type filter skeleton */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white shadow-md dark:bg-gray-800"
            >
              <div className="h-36 animate-pulse bg-gray-200 dark:bg-gray-700 sm:h-40" />
              <div className="space-y-2 p-3">
                <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-center gap-1">
                  <div className="h-5 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
