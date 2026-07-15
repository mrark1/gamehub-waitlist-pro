import "./DeleteModal.css";

function DeleteModal({
  open,
  player,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="delete-overlay">
      <div className="delete-modal">

        <h2>🗑 Delete Player</h2>

        <p>
          Are you sure you want to delete
          <strong> {player?.playerName}</strong>?
        </p>

        <div className="delete-buttons">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteModal;