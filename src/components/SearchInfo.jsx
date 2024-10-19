export default function SearchInfo({ query, count }) {
  return (
    <p className="search-info">
      <span>
        You searched for: <strong>{query}</strong>
      </span>
      {count && <span className="search-info__count">{count} results</span>}
    </p>
  );
}
