import "./DashboardCards.css";
import StatCard from "./StatCard";
import useStats from "../../hooks/useStats";

function DashboardCards() {

  const { stats, loading } = useStats();

  if (loading) {
    return <h2 style={{ color: "white" }}>Loading Dashboard...</h2>;
  }

  return (

    <div className="dashboard-cards">

      <StatCard
        title="Total Players"
        value={stats.totalPlayers}
        icon="👥"
        color="#2563EB"
      />

      <StatCard
        title="Waiting Players"
        value={stats.waitingPlayers}
        icon="⏳"
        color="#F59E0B"
      />

      <StatCard
        title="Games"
        value={stats.totalGames}
        icon="🎮"
        color="#10B981"
      />

      <StatCard
        title="High Priority"
        value={stats.highPriorityPlayers}
        icon="⭐"
        color="#EF4444"
      />

    </div>

  );

}

export default DashboardCards;