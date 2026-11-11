
import LiveFocusMeter from "./_components/LiveFocusMeter";
import FocusTrendChart from "./_components/FocusTrendChart";
import AttentionHeatmap from "./_components/AttentionHeatmap";
import AdaptationStats from "./_components/AdaptationStats";
import EngagementDistribution from "./_components/EngagementDistribution";
import PrivacyPanel from "./_components/PrivacyPanel";

export default function TeacherDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
      <LiveFocusMeter />
      <FocusTrendChart />
      <AttentionHeatmap />
      <AdaptationStats />
      <EngagementDistribution />
      <PrivacyPanel />
    </div>
  );
}
