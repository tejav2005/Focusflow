
export default function PrivacyPanel() {
  return (
    <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
      <h2 className="font-semibold text-green-700">Privacy Status</h2>
      <ul className="text-sm">
        <li>No identities tracked</li>
        <li>Only aggregated attention data</li>
        <li>Session-based storage</li>
        <li>Auto deletion after session ends</li>
      </ul>
    </div>
  );
}
