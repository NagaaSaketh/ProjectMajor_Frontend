import useFetch from "../useFetch";
import { Link } from "react-router-dom";
const Categories = () => {
  const { data, loading, error } = useFetch("https://major-project1-backend-ten.vercel.app/categories");
  return (
    <div>
      <div className="container">
        {loading ? (
          <p className="text-center fw-bold">Loading....</p>
        ) : error ? (
          <p className="text-center fw-bold">
            An error occured while fetching categories
          </p>
        ) : data && data.length > 0 ? (
          <div className="row">
            {data.map((category) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mt-4" key={category._id}>
                <div className="card" >
                  <div className="d-flex justify-content-around">
                    <img
                      style={{
                        height: "200px",
                        width: "100%",
                        objectPosition: "center top",
                      }}
                      className=" card-img-top object-fit-cover border rounded position-relative"
                      src={category.categoryImage}
                      alt="categoryimage"
                    />
                    <Link
                    to={`/products/categories/${category._id}`}
                      style={{
                        backgroundColor: "white",
                        width: "100%",
                        alignContent: "center",
                        textDecoration:"none"
                      }}
                      className="position-absolute top-50 start-50 translate-middle w-100 d-flex justify-content-center align-items-center text-secondary fw-bold"
                    >
                      {category.category}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No categories to display.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
