export default function LoaderGrid({ count = 4, className = "" }) {
  const cards = Array.from({ length: count });

  return (
    <div
      className={`w-full flex justify-center ${className}`}
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="grid grid-cols-1 gap-6 max-w-[1100px] w-full">
        {cards?.map((_, i) => {
          return (
            <>
              <article
                key={i}
                className="flex flex-col gap-3 p-4 rounded-2xl shadow-sm bg-white dark:bg-slate-800
                      max-h-80 w-full h-full overflow-hidden"
                role="status"
                aria-hidden="false"
              >
                <div
                  className="w-full h-36 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse
                            max-h-40 min-h-[8rem] object-cover"
                />

                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="mt-2 h-3 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="h-8 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="h-8 w-10 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                </div>
              </article>
            </>
          );
        })}
      </div>
    </div>
  );
}
