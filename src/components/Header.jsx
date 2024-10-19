export default function Header({ onSearch }) {
  return (
    <header className="header">
      <a href="/" className="logo">
        UPPERSETUP
      </a>
      <input
        type="text"
        placeholder="Search movies..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <div className="user-icon">Your Name</div>
    </header>
  );
}
