import CategoryItem from "../CategoryItem/CategoryItem";

const CategoryItemList = ({ categories }) => {
  return (
    <select class=" form-select col-lg-1 text-center">
      {categories?.map((category) => {
        return <CategoryItem category={category} key={category.id} />;
      })}
    </select>
  );
};

export default CategoryItemList;
