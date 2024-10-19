export default function Header({ onSearch }) {
  return (
    <header className="header">
      <a href="/" className="logo">
        <img src="/logo.png" alt="Logo" />
      </a>
      <input
        type="text"
        placeholder="Search movies..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <div className="user-icon">
        <img src="/user.svg" alt="User Icon" />
        <span>Your Name</span>
      </div>
    </header>
  );
}
