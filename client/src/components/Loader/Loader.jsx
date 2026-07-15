import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="skeleton-card"
        >
          <div className="skeleton title"></div>

          <div className="skeleton line"></div>

          <div className="skeleton line short"></div>

          <div className="skeleton buttons">
            <div className="btn"></div>
            <div className="btn"></div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default Loader;