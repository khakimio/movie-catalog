export default function MovieCard({ movie }) {
  const { Title, Year, imdbID, Type, Poster } = movie;

  return (
    <article className="movie-card">
      <div className="movie-card__img-container">
        {Poster === "N/A" ? (
          <img
            src={"placeholder.png"}
            className="movie-card__img movie-card--placeholder"
            alt={Title}
          />
        ) : (
          <img
            src={Poster}
            alt={Title}
            loading="lazy"
            className="movie-card__img"
          />
        )}
      </div>

      <section className="movie-card__info">
        <p>Name: {Title}</p>
        <p>Year: {Year}</p>
        <p>imdbID: {imdbID}</p>
        <p>Type: {Type}</p>
      </section>
    </article>
  );
}
