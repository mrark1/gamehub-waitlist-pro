import "./SearchBar.css";

function SearchBar({
  search,
  setSearch,
  game,
  setGame,
  status,
  setStatus,
  priority,
  setPriority,
  onAddPlayer,
  onExport
}) {
  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="🔍 Search Player..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={game}
        onChange={(e) => setGame(e.target.value)}
      >
        <option value="">All Games</option>
        <option>BGMI</option>
        <option>Valorant</option>
        <option>Pubg</option>
        <option>Free Fire</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option>Waiting</option>
        <option>Joined</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">All Priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button onClick={onAddPlayer}>
        + Add Player
      </button>


        <button onClick={onExport}>
  📥 Export CSV
</button>

    </div>
  );
}

export default SearchBar;