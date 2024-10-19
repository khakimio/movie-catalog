export default function SearchInfo({ query, count }) {
  return (
    <p className="search-info">
      <span>
        You searched for: <strong className="search-info__query">{query}</strong>
      </span>
      {count && <span className="search-info__count">{count} results</span>}
    </p>
  );
}
