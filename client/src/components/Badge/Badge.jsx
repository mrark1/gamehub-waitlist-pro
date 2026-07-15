import "./Badge.css";

function Badge({ type, value }) {
  let className = "";

  if (type === "status") {
    switch (value) {
      case "Waiting":
        className = "badge waiting";
        break;
      case "Joined":
        className = "badge joined";
        break;
      case "Completed":
        className = "badge completed";
        break;
      case "Cancelled":
        className = "badge cancelled";
        break;
      default:
        className = "badge";
    }
  }

  if (type === "priority") {
    switch (value) {
      case "High":
        className = "badge high";
        break;
      case "Medium":
        className = "badge medium";
        break;
      case "Low":
        className = "badge low";
        break;
      default:
        className = "badge";
    }
  }

  return <span className={className}>{value}</span>;
}

export default Badge;