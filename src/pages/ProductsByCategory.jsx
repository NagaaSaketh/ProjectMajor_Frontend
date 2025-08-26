// const ProductsByCategory = ()=>{
//     return(
//         <div className="container-fluid">
//         <div className="row">
//           <div className="col-lg-3 col-md-3">
//             <section>
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <p className="fw-bold">Filters</p>
//                 <p>
//                   <a style={{ color: "black" }} className="link-underline-dark">
//                     Clear
//                   </a>
//                 </p>
//               </div>
//               <div>
//                 <p className="fw-bold">Price</p>
//                 <div className="d-flex justify-content-between small text-secondary">
//                   <span>1100</span>
//                   <span>3000</span>
//                   <span>5000</span>
//                 </div>
//                 <input type="range" className="form-range" min="500" max="800" />
//               </div>
//               <div className="mb-4">
//                 <p className="fw-bold">Category</p>
//                 <div className="form-check">
//                   <input className="form-check-input" type="checkbox" name="clothing" id="shirts" />
//                   <label className="form-check-label" htmlFor="shirts">Shirts</label>
//                 </div>
//                 <div className="form-check">
//                   <input className="form-check-input" type="checkbox" name="clothing" id="tshirts"  />
//                   <label className="form-check-label" htmlFor="tshirts">T-Shirts</label>
//                 </div>
//                 <div className="form-check">
//                   <input className="form-check-input" type="checkbox" name="clothing" id="hoodies"/>
//                   <label className="form-check-label" htmlFor="hoodies">Hoodies</label>
//                 </div>
//                 <div className="form-check">
//                   <input className="form-check-input" type="checkbox" name="clothing" id="pants"  />
//                   <label className="form-check-label" htmlFor="pants">Pants</label>
//                 </div>
//                 <div className="form-check">
//                   <input className="form-check-input" type="checkbox" name="clothing" id="oversized" defaultChecked  />
//                   <label className="form-check-label" htmlFor="oversize">Oversized T-Shirts</label>
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <p className="fw-bold">Rating</p>
//                 <div className="form-check">
//                     <input className="form-check-input" type="radio" name="rating" id="rating4" defaultChecked />
//                     <label className="form-check-label" htmlFor="rating4">4 stars & above</label>
//                 </div>
//                 <div className="form-check">
//                     <input className="form-check-input" type="radio" name="rating" id="rating3" />
//                     <label className="form-check-label" htmlFor="rating3">3 stars & above</label>
//                 </div>
//                 <div className="form-check">
//                     <input className="form-check-input" type="radio" name="rating" id="rating2" />
//                     <label className="form-check-label" htmlFor="rating2">2 stars & above</label>
//                 </div>
//                 <div className="form-check">
//                     <input className="form-check-input" type="radio" name="rating" id="rating1" />
//                     <label className="form-check-label" htmlFor="rating1"> 1 stars & above</label>
//                 </div>
//                 </div>
//                 <div className="mb-4">
//                     <p className="fw-bold">Sort By</p>
//                     <div className="form-check">
//                     <input className="form-check-input" type="radio" name="sort" id="lowToHigh" />
//                     <label className="form-check-label" htmlFor="lowToHigh">Price - Low to High</label>
//                     </div>
//                     <div className="form-check">
//                     <input className="form-check-input" type="radio" name="sort" id="highToLow" />
//                     <label className="form-check-label" htmlFor="highToLow">Price - High to Low</label>
//                     </div>
//                 </div>
//             </section>
//           </div>
//           <div className="col-lg-9 col-md-8 p-4 bg-light">
//             <div className="mb-4">
//                 <h3 className="fw-bold">
//                   Showing All Products 
//                   <span style={{fontSize:"20px"}} className="fw-normal mx-2">
//                     (showing {data?.length} products)
//                   </span>
//                 </h3>
//               </div>
//             <section className="d-flex">
//               {loading ? (
//                 <div className="d-flex align-items-center spinner-border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//                 </div>
//               ) : error ? (
//                 <div className="d-flex justify-content-center align-items-center">
//                 <p>An error occurred while fetching products</p>
//                 </div>
//               ) : data && data.length > 0 ? (
//                 <div className="row">
//                   {data.map((obj) => (
//                     <div className="col-xl-3 col-lg-3 col-md-6">
//                       <Link to={`/products/${obj._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                       <div className="card my-2">
//                         <div className="position-relative">
//                         <img style={{height:"250px",width:"100%",objectFit:"cover"}} className="card-img-top" src={obj.productImage} alt={obj.productName} />
//                         <FontAwesomeIcon style={{padding:"4px"}} className="position-absolute bottom-0 end-0 m-1 text-danger" icon={faHeart} />
//                         </div>
                        
//                         <div className="card-body d-flex flex-column">
//                         <p className="fw-bold">{obj.productName}</p>
//                         <p className="fw-bold">Rs.{obj.productPrice} <span style={{textDecoration:"line-through"}}  className="fw-normal text-muted small">₹{obj.actualPrice} </span> </p>
//                         <button style={{width:"100%"}} className="btn btn-primary">Add to Cart</button>      
//                         </div>
                        
//                       </div>
//                       </Link>
//                     </div>
                    
//                   ))}
//                 </div>
//               ) : (
//                 <div className="d-flex justify-content-center align-items-center">
//                     <p>No Products available.</p>
//                 </div>
                
//               )}
//             </section>
//           </div>
//         </div>
//       </div>
//     )
// }

// export default ProductsByCategory;