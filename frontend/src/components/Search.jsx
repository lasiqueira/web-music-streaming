import ErrorNotice from "./ErrorNotice";
import SearchResults from "./SearchResults";
import { useSearchStore } from "../stores/searchStore";

export default function Search() {
  const { songs, errors, fetching, hasSearched, search } = useSearchStore();

  const handleSubmit = (event) => {
    event.preventDefault();
    search(new FormData(event.currentTarget).get("search") ?? "");
  };

  return (
    <section aria-label="Search">
      <form role="search" onSubmit={handleSubmit} className="mb-2">
        <div className="input-group input-group-lg">
          <span className="input-group-text bg-body">
            <i className="bi bi-search" aria-hidden="true" />
          </span>
          <input
            type="search"
            name="search"
            className="form-control"
            placeholder="Search songs, artists, albums…"
            aria-label="Search songs"
          />
          <button type="submit" className="btn btn-primary" disabled={fetching}>
            Search
          </button>
        </div>
      </form>
      <p className="small text-body-secondary mb-3">
        Tip: search by song name, artist, album or genre — or leave it empty to list everything.
      </p>

      <ErrorNotice errors={errors} />

      {fetching && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading…</span>
          </div>
        </div>
      )}

      {!fetching && hasSearched && !errors.length && (
        songs.length > 0 ? (
          <SearchResults songs={songs} />
        ) : (
          <p className="text-center text-body-secondary my-5">No songs found.</p>
        )
      )}
    </section>
  );
}
