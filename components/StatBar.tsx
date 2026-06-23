/**
 * Horizontal stat bar used on the detail page.
 * Pure presentational component — no client-side code needed.
 */

interface StatBarProps {
  label: string;
  value: string | number;
  maxValue?: number;
  color?: string;
}

export function StatBar({
  label,
  value,
  maxValue = 100,
  color = "bg-red-500",
}: StatBarProps) {
  const numericValue = typeof value === "number" ? value : parseFloat(value);
  const isNumeric = !isNaN(numericValue);
  const percentage = isNumeric
    ? Math.min(100, (numericValue / maxValue) * 100)
    : null;

  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
        {label}
      </span>
      {isNumeric && percentage !== null ? (
        <>
          <span className="w-10 shrink-0 text-sm font-semibold text-gray-800 dark:text-gray-200">
            {numericValue}
          </span>
          <div className="flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <div
              className={`h-2 rounded-full transition-all duration-700 ${color}`}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={numericValue}
              aria-valuemin={0}
              aria-valuemax={maxValue}
              aria-label={label}
            />
          </div>
        </>
      ) : (
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {value}
        </span>
      )}
    </div>
  );
}
