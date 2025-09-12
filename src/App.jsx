import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
// import "./App.css";
import Categories from "./components/Categories";


function App() {
  
  return (
    <>
      <Header />
      <div className="bg-light">
        <div>
          <Categories />
        </div>
        <div>
          <div className="container">
            <div className="my-5">
              <img
                className="img-fluid w-100"
                style={{
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
                src="https://t3.ftcdn.net/jpg/05/08/20/82/360_F_508208204_5xdmw0ZNCodkJ9yOuIqU5Vid8JZnR7RR.jpg"
                alt="Fashion banner"
              />
            </div>
            <div className="row my-5 ">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="me-4 ">
                      <img
                        style={{ height: "250px", width: "300px" }}
                        className="img-fluid"
                        src="https://t4.ftcdn.net/jpg/08/86/60/19/360_F_886601972_jwnPAowBTxz67EWmbPHmMfreYrSquW70.jpg"
                        alt="card1"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-5 fw-light-bold">NEW ARRIVALS</p>
                      <h5 className="fw-bold">Summer Collection</h5>
                      <span>Check out summer collection.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <div className="me-4">
                      <img
                        style={{ height: "250px", width: "300px" }}
                        className="img-fluid object-fit-xl-contain"
                        src="https://cdn.shopify.com/s/files/1/0105/8232/files/DSC01017_aa216227-92d9-466d-995f-ae4ca454e7b2.jpg?v=1746099315"
                        alt="card2"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-5 fw-light-bold">NEW ARRIVALS</p>
                      <h5 className="fw-bold">Winter Collection</h5>
                      <span>Check out winter collection.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
