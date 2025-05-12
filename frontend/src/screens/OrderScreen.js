import React, { useEffect } from "react"; 
import Header from "./../components/Header";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../Redux/Action/OrderAction";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment"; 

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);

  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 0);
    order.taxtPrice = addDecimals(Number((0 * order.itemsPrice).toFixed(2)));
  }

  // calcule Price

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant={"alert-danger"}>{error}</Message>
        ) : (
          <>
            <button
              onClick={() => reactToPrintFn()}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-printer"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
              </svg>
              Print
            </button>

            <div>
              <div ref={contentRef}>
                <div class="card">
                  <div className="card-body">
                    <div className="container mb-5 mt-3">
                      <div className="row d-flex align-items-baseline">
                        <div className="col-xl-9">
                          <p className="cfs">
                            Invoice <strong>ID:{order._id} </strong>
                          </p>
                        </div>

                        <hr />
                      </div>

                      <div className="container">
                        <div className="col-md-12">
                          <div className="text-center">
                            <i className="fab fa-mdb fa-4x ms-0"></i>
                            <h2>MDL</h2>
                            <p className="pt-0">
                              <b>MUDILUX BOUTIQUE</b>
                            </p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-8">
                            <ul class="list-unstyled">
                              <li class="text-muted">
                                To: <span>{order.user.name} </span>
                              </li>
                              <li class="text-muted">
                                {order.shippingAdress.city}
                              </li>
                              <li className="text-muted">Rdc, Country</li>
                              <li className="text-muted">
                                <i className="fas fa-phone"></i> {order.user.email}
                              </li>
                            </ul>
                          </div>
                          <div className="col-4">
                            <p className="text-muted">Invoice</p>
                            <ul className="list-unstyled">
                              <li className="text-muted">
                                <i className="fas fa-circle"></i>{" "}
                                <span className="fw-bold">ID:</span>#123-456
                              </li>
                              <li className="text-muted">
                                <i className="fas fa-circle"></i>{" "}
                                <span className="fw-bold">Date:  {moment(order.createdAt).format("l")} </span>
                               
                              </li>
                              <li className="text-muted">
                                <i className="fas fa-circle"></i>{" "}
                                <span className="me-1 fw-bold">Status:</span>
                                <span className="badge bg-warning text-black fw-bold">
                                  Unpaid
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="row my-2 mx-1 justify-content-center">
                          {order.orderItems.length === 0 ? (
                            <Message variant="alert-info mt-5">
                              Your order is empty
                            </Message>
                          ) : (
                            <>
                              <table className="table table-striped table-borderless  ">
                                <thead className="text-link col-12">
                                  <tr>
                                 
                                    <th scope="col">Qty</th>
                                    <th scope="col">Description</th> 
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Total</th>
                                  </tr>
                                </thead>
                                <tbody className="">
                                  {order.orderItems.map((item, index) => (
                                    <tr key={index}>
                                     
                                      <td> {item.qty} </td>
                                      <td>{item.name} </td>
                                      <td>$ {item.price} </td>
                                      <td>$ {item.price * item.qty} </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </>
                          )}
                        </div>
                        <div class="row">
                          <div className="col-7">
                            <p className="ms-3">
                              Conditions ET Modalité du Paiement{" "}
                            </p>
                            <p className="ms-3">
                          
                              Paiement a réception de facture{" "}
                            </p>
                          </div>
                          <div className="col-5">
                            <ul className="list-unstyled">
                              <li class="text-muted ms-3">
                                <span class="text-black me-4">Sous Total</span>$
                                {order.itemsPrice}{" "}
                              </li>
                              <li className="text-muted ms-3 mt-2">
                                <span className="text-black me-4">Tax(0%)</span>$0
                              </li>
                            </ul>
                            <p className="text-black float-start">
                              <span className="text-black me-3"> Montant total</span>
                              <span>${order.totalPrice} </span>
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-10">
                            <p>
                              <b> Merci pour votre achat</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


             {/* CODE AVEC IMAGE POUR FACTURE MASQUE */}
              <>
                {/*

  <div className="row  order-detail">
                <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                  <div className="row">
                    <div className="col-md-4 center">
                      <div className="alert-success order-box">
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                    <div className="col-md-8 center">
                      <h5>
                        <strong>Customer</strong>
                      </h5>
                      <p>{order.user.name} </p>
                      <p>
                        <a href={`mailto:${order.user.email}`}>
                          {order.user.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
               
                <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                  <div className="row">
                    <div className="col-md-4 center">
                      <div className="alert-success order-box">
                        <i className="fas fa-truck-moving"></i>
                      </div>
                    </div>
                    <div className="col-md-8 center">
                      <h5>
                        <strong>Order info</strong>
                      </h5>
                      <p>Shipping: {order.shippingAdress.city} </p>
                      <p>Pay method: {"CASH"}</p>

                      {order.isPaid ? (
                        <div className="bg-info p-2 col-12">
                          <p className="text-white text-center text-sm-start">
                            Payé {moment(order.createdAt).format("l")}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-info p-2 col-12">
                          <p className="text-white text-center text-sm-start">
                            Payé {moment(order.createdAt).format("l")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                  <div className="row">
                    <div className="col-md-4 center">
                      <div className="alert-success order-box">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                    </div>
                    <div className="col-md-8 center">
                      <h5>
                        <strong>Deliver to</strong>
                      </h5>
                      <p>
                        Address:{order.shippingAdress.city},{""},
                        {order.shippingAdress.adress},{""},
                        {order.shippingAdress.postalcode}
                      </p>
                      {order.isPaid ? (
                        <div className="bg-info p-1 col-12">
                          <p className="text-white text-center text-sm-start">
                            {moment(order.createdAt).format("l")}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-info p-1 col-12">
                          <p className="text-white text-center text-sm-start">
                            {moment(order.createdAt).format("l")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
                
                <div className="row order-products justify-content-between">
                <div className="col-lg-8">
                  {order.orderItems.length === 0 ? (
                    <Message variant="alert-info mt-5">
                      Your order is empty
                    </Message>
                  ) : (
                    <>
                      {order.orderItems.map((item, index) => (
                        <div className="order-product row" key={index}>
                          <div className="col-md-3 col-6">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="col-md-5 col-6 d-flex align-items-center">
                            <Link to={`/products/${item.product}`}>
                              <h6>{item.name} </h6>
                            </Link>
                          </div>
                          <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                            <h4>QUANTITY</h4>
                            <h6>{item.qty} </h6>
                          </div>

                          <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                            <h4>TOTAL</h4>
                            <h6>${item.qty * item.price} </h6>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
           
                </div>
         
                <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Products</strong>
                        </td>
                        <td>${order.itemsPrice} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Shipping</strong>
                        </td>
                        <td>$ {order.shippingPrice} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tax</strong>
                        </td>
                        <td>${order.taxtPrice} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td>${order.totalPrice} </td>
                      </tr>
                    </tbody>
                  </table>
                  {!order.isPaid ? (
                    <div className="col-12">
                      <button type="submit" onClick={successPaymentHandler}>
                        CONFIRM PAYMENT
                      </button>
                    </div>
                  ) : (
                    <p>
                      <b>Mudilix boutique</b>
                    </p>
                  )}
                </div>
              </div>

                  */}
                
              </>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
