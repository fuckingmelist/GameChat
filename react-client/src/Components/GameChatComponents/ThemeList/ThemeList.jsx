import Theme from "../Theme/Theme";

const ThemeList = ({ themes }) => {
  return (
    <div class="row d-flex justify-content-center">
      {themes.length === 0 ? (
        <h1 class="my-3 text-center"></h1>
      ) : (
        themes.map((theme) => {
          return <Theme theme={theme} key={theme.id} />;
        })
      )}
    </div>
  );
};

export default ThemeList;
