export function MaskedValue({
  value,
  ariaLabel,
}: {
  value: string;
  ariaLabel?: string;
}) {
  return (
    <span className="font-mono tracking-wide" aria-label={ariaLabel}>
      {value}
    </span>
  );
}
