export default function Header({ onSearch }) {
  return (
    <header className="header">
      <a href="/" className="logo">
        <img src="/logo.png" alt="Logo" />
      </a>
      <div className="search">
        <input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => onSearch(e.target.value)}
          className="search__input"
        />
        <svg
          className="search__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="#929BBC"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M11 2a9 9 0 0 1 6.32 15.325l4.387 4.387-1.414 1.414-4.387-4.387A9 9 0 1 1 11 2zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
        </svg>
      </div>
      <div className="user-icon">
        <img src="/user.svg" alt="User Icon" />
        <span>Your Name</span>
      </div>
    </header>
  );
}
