import GamesItem from "../GameItem/GamesItem";

const GamesItemList = ({ games }) => {
  return (
    <div>
      <div class="album bg-light">
        <div class="m-3 row">
          {games.length === 0 ? (
            <div class="col-md-4"></div>
          ) : (
            games.map((game) => {
              return <GamesItem gamepack={game} key={game.id} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GamesItemList;
