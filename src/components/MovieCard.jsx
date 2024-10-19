export default function MovieCard({ movie }) {
  const { Title, Year, imdbID, Type, Poster } = movie;

  return (
    <article className="card">
      <img src={Poster} alt={Title} loading="lazy" className="card__img" />
      <section className="card__info">
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
