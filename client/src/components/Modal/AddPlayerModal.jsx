import { useState } from "react";
import api from "../../services/api";
import "./AddPlayerModal.css";
import toast from "react-hot-toast";

function AddPlayerModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    playerName: "",
    email: "",
    phone: "",
    game: "",
    platform: "",
    priority: "Medium",
    status: "Waiting",
    estimatedWait: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Reset Form
  const resetForm = () => {
    setForm({
      playerName: "",
      email: "",
      phone: "",
      game: "",
      platform: "",
      priority: "Medium",
      status: "Waiting",
      estimatedWait: "",
      notes: "",
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/waitlist", form);

      toast.success("🎉 Player Added Successfully");

      resetForm();

      if (onSuccess) {
        onSuccess();
      }

      onClose();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Player</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="playerName"
            placeholder="Player Name"
            value={form.playerName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="game"
            placeholder="Game"
            value={form.game}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="platform"
            placeholder="Platform"
            value={form.platform}
            onChange={handleChange}
            required
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Waiting">Waiting</option>
            <option value="Joined">Joined</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input
            type="number"
            name="estimatedWait"
            placeholder="Estimated Wait (Minutes)"
            value={form.estimatedWait}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            rows="4"
          />

          <div className="buttons">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Player"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddPlayerModal;