export function VisualPanel({ label }: { label?: string }) {
  return (
    <div className="image-panel" aria-label={label}>
      <div className="data-lines">
        <span style={{ width: "78%" }} />
        <span style={{ width: "55%" }} />
        <span style={{ width: "88%" }} />
        <span style={{ width: "42%" }} />
        <span style={{ width: "70%" }} />
      </div>
    </div>
  );
}
