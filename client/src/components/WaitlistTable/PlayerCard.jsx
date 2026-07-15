import { FaEdit, FaTrash } from "react-icons/fa";
import Badge from "../Badge/Badge";
import "./PlayerCard.css";

function PlayerCard({ player, onDelete, onEdit }) {
  return (
    <div className="player-card">

      <div className="player-header">
        <h3>{player.playerName}</h3>
      </div>

      <div className="player-info">
        <p>
          <strong>🎮 Game:</strong> {player.game}
        </p>

        <p>
          <strong>📱 Platform:</strong> {player.platform}
        </p>

        <p>
          <strong>⏱️ Wait Time:</strong> {player.estimatedWait} min
        </p>

        <div className="badge-row">
          <Badge
            type="status"
            value={player.status}
          />

          <Badge
            type="priority"
            value={player.priority}
          />
        </div>
      </div>

      <div className="actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(player)}
          title="Edit Player"
        >
          <FaEdit />
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(player)}
          title="Delete Player"
        >
          <FaTrash />
        </button>
      </div>

    </div>
  );
}

export default PlayerCard;