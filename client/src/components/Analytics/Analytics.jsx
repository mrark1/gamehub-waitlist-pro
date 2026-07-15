import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import "./Analytics.css";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

function Analytics({ players }) {

  // Status Data
  const statusData = [
    {
      name: "Waiting",
      value: players.filter(
        p => p.status === "Waiting"
      ).length,
    },
    {
      name: "Joined",
      value: players.filter(
        p => p.status === "Joined"
      ).length,
    },
    {
      name: "Completed",
      value: players.filter(
        p => p.status === "Completed"
      ).length,
    },
    {
      name: "Cancelled",
      value: players.filter(
        p => p.status === "Cancelled"
      ).length,
    },
  ];

  // Game Data

  const games = {};

  players.forEach(player => {
    games[player.game] = (games[player.game] || 0) + 1;
  });

  const gameData = Object.keys(games).map(game => ({
    game,
    players: games[game],
  }));

  return (

    <div className="analytics-grid">

      {/* Pie Chart */}

      <div className="chart-card">

        <h3>Players by Status</h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              outerRadius={100}
            >

              {statusData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Bar Chart */}

      <div className="chart-card">

        <h3>Players by Game</h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={gameData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="game"/>

            <YAxis/>

            <Tooltip/>

            <Bar
              dataKey="players"
              fill="#3B82F6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default Analytics;