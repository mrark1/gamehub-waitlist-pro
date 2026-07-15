import { FaEdit, FaTrash } from "react-icons/fa";
import Badge from "../Badge/Badge";

function PlayerRow({ player, onDelete, onEdit }) {
  return (
    <tr>
      <td>{player.playerName}</td>

      <td>{player.game}</td>

      <td>{player.platform}</td>

      <td>
  <Badge
    type="status"
    value={player.status}
  />
</td>

      <td>
  <Badge
    type="priority"
    value={player.priority}
  />
</td>

      <td>{player.estimatedWait} min</td>

      <td>
        <button
          onClick={() => onEdit(player)}
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(player)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default PlayerRow;