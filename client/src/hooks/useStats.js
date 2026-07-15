import { useEffect, useState } from "react";
import api from "../services/api";

function useStats() {

  const [stats, setStats] = useState({
    totalPlayers: 0,
    waitingPlayers: 0,
    totalGames: 0,
    highPriorityPlayers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response = await api.get("/stats");

        // Backend response
        setStats(response.data.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchStats();

  }, []);

  return { stats, loading };

}

export default useStats;