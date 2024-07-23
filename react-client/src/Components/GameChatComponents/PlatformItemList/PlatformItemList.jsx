import PlatformItem from "../PlatformItem/PlatformItem";

const PlatformItemList = ({ platforms }) => {
  return (
    <div class="card-text">
        <p>Платформы: {(
        platforms?.map((platform) => {
          return <PlatformItem platform={platform}/>;
        })
      )}
      </p>
    </div>
  );
};

export default PlatformItemList;
