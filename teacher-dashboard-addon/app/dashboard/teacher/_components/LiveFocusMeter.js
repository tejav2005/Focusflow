
export default function LiveFocusMeter() {
  const focus = 72;
  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <h2 className="font-semibold">Live Focus</h2>
      <p className="text-3xl">{focus}%</p>
    </div>
  );
}
