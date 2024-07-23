import GenreItem from "../GenreItem/GenreItem";

const GenreItemList = ({ genres }) => {
  return (
    <div class="card-text">
        <p>Жанры: {(
        genres?.map((genre) => {
          return <GenreItem genre={genre}/>;
        })
      )}
      </p>
    </div>
  );
};

export default GenreItemList;
