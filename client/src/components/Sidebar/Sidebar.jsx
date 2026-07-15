import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>🎮 GameHub</h2>

      <nav className="menu">
        <a href="#dashboard">Dashboard</a>
        <a href="#players">Players</a>
        <a href="#statistics">Statistics</a>
        <a href="#footer">Settings</a>
      </nav>
    </aside>
  );
}

export default Sidebar;