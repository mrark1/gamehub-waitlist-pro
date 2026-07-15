import "./WaitlistTable.css";
import PlayerRow from "./PlayerRow";
import PlayerCard from "./PlayerCard";
import EmptyState from "../EmptyState/EmptyState";
function WaitlistTable({
  players,
  onDelete,
  onEdit,
}) {
  return (
    <>
      {/* Desktop Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Game</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Wait</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              players.map((player) => (
                <PlayerRow
                  key={player.id}
                  player={player}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards">
        {players.map((player) => (
          <PlayerCard
    key={player.id}
    player={player}
    onDelete={onDelete}
    onEdit={onEdit}
/>
        ))}
      </div>
    </>
  );
}

export default WaitlistTable;