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
        <dl>
          <dt>Name:</dt>
          <dd>{Title}</dd>

          <dt>Year:</dt>
          <dd>{Year}</dd>

          <dt>imdbID:</dt>
          <dd>{imdbID}</dd>

          <dt>Type:</dt>
          <dd>{Type}</dd>
        </dl>
      </section>
    </article>
  );
}
