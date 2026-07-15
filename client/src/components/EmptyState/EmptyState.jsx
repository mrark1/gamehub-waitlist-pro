import { FaGamepad } from "react-icons/fa";
import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state">

      <FaGamepad className="empty-icon" />

      <h2>No Players Found</h2>

      <p>
        Try changing the search or filters.
      </p>

    </div>
  );
}

export default EmptyState;