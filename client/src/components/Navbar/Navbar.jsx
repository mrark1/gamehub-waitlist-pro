import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div>
        <h2>Dashboard</h2>
        <p className="subtitle">
          Welcome back, Admin 👋
        </p>
      </div>

      <div className="profile">
        👤 Admin
      </div>
    </header>
  );
}

export default Navbar;