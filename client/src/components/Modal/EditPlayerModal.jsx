import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./EditPlayerModal.css";

function EditPlayerModal({
  open,
  onClose,
  player,
  onSuccess,
}) {

  const [form, setForm] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (player) {
      setForm(player);
    }

  }, [player]);

  if (!open) return null;

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.put(
        `/waitlist/${player.id}`,
        form
      );

      toast.success("Player Updated");

      onSuccess();

      onClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Player</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="playerName"
            value={form.playerName || ""}
            onChange={handleChange}
          />

          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
          />

          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
          />

          <input
            name="game"
            value={form.game || ""}
            onChange={handleChange}
          />

          <input
            name="platform"
            value={form.platform || ""}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={form.priority || ""}
            onChange={handleChange}
          >

            <option>High</option>

            <option>Medium</option>

            <option>Low</option>

          </select>

          <select
            name="status"
            value={form.status || ""}
            onChange={handleChange}
          >

            <option>Waiting</option>

            <option>Joined</option>

            <option>Completed</option>

            <option>Cancelled</option>

          </select>

          <input
            name="estimatedWait"
            value={form.estimatedWait || ""}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            value={form.notes || ""}
            onChange={handleChange}
          />

          <div className="buttons">

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
            >

              {

                loading ?

                "Updating..."

                :

                "Update Player"

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditPlayerModal;