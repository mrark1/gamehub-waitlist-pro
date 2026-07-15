import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import "./MainLayout.css";

function MainLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;