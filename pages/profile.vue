<template>
  <div>
    <Navbar />
    <Subbar />
    <div class="page-wrapper">
      <!-- Page Content-->
      <div class="page-content-tab">
        <div class="container-fluid">
          <!-- end page title end breadcrumb -->
          <div class="row">
            <div class="col-lg-9">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-4 align-self-center">
                      <div class="media">
                        <div class="d-inline-block">
                          <img src="assets/images/users/user-4.jpg" alt="" class="thumb-xl rounded-circle">
                        </div>
                        <div class="media-body align-self-center ms-3">
                          <h5 class="fw-semibold mb-1 font-18">
                            Rosa Dodson
                          </h5>
                          <p class="mb-0 font-13">
                            UI/UX Designer, India
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 ms-auto align-self-center">
                      <ul class="list-unstyled personal-detail mb-0">
                        <li class="">
                          <i class="las la-phone mr-2 text-secondary font-22 align-middle" /> <b> phone </b> : +91 23456 78910
                        </li>
                        <li class="mt-2">
                          <i class="las la-envelope text-secondary font-22 align-middle mr-2" /> <b> Email </b> : mannat.theme@gmail.com
                        </li>
                      </ul>
                    </div><!--end col-->
                    <div class="col-lg-4 align-self-center">
                      <div class="row">
                        <div class="col-auto text-end border-end">
                          <button type="button" class="btn btn-soft-primary btn-icon-circle  mb-2">
                            <i class="las la-dollar-sign font-20" />
                          </button>
                          <h4 class="mt-0 mb-1 fw-semibold">
                            $95k
                          </h4>
                          <p class="mb-0 text-muted font-12 fw-normal">
                            Current Value
                          </p>
                        </div><!--end col-->
                        <div class="col-auto">
                          <button type="button" class="btn btn-soft-success btn-icon-circle  mb-2">
                            <i class="las la-hand-holding-usd font-20" />
                          </button>
                          <h4 class="mt-0 mb-1 fw-semibold">
                            $32k
                          </h4>
                          <p class="mb-0 text-muted font-12 fw-normal">
                            Profit / Loss
                          </p>
                        </div><!--end col-->
                      </div><!--end row-->
                    </div><!--end col-->
                  </div>
                  <div id="accordionSettings" class="accordion mt-3">
                    <div class="accordion-item">
                      <h2 id="bankAC" class="accordion-header mt-0">
                        <button
                          class="accordion-button font-14"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#settingOne"
                          aria-expanded="true"
                          aria-controls="settingOne"
                        >
                          Bank Accounts Linked
                        </button>
                      </h2>
                      <div id="settingOne" class="accordion-collapse collapse show" aria-labelledby="bankAC" data-bs-parent="#accordionSettings">
                        <div class="accordion-body">
                          <div class="border rounded">
                            <div class="bg-light d-flex justify-content-between">
                              <h5 class="m-0 font-15 p-3">
                                <img src="assets/images/ipo/boa.png" alt="" height="20" class="me-1"> Bank of America
                              </h5>
                              <div class="align-self-center me-3">
                                <button type="button" class="btn btn-sm btn-primary">
                                  Edit
                                </button>
                                <button type="button" class="btn btn-sm btn-primary">
                                  Add Bank
                                </button>
                              </div>
                            </div>
                            <div class="row p-3">
                              <div class="col-4">
                                <h6 class="m-0">
                                  Account Number
                                </h6>
                                <p class="mb-0">
                                  55********52
                                </p>
                              </div><!--end col-->
                              <div class="col-4">
                                <h6 class="m-0">
                                  IFSC Code
                                </h6>
                                <p class="mb-0">
                                  COLI000521
                                </p>
                              </div><!--end col-->
                              <div class="col-4">
                                <h6 class="m-0">
                                  Branch
                                </h6>
                                <p class="mb-0">
                                  Shrevepor, California
                                </p>
                              </div><!--end col-->
                            </div><!--end row-->
                          </div>
                        </div><!--end accordion-body-->
                      </div><!--end settingOne-->
                    </div><!--end accordion-item-->
                    <div class="accordion-item">
                      <h2 id="Statements" class="accordion-header mt-0">
                        <button
                          class="accordion-button collapsed font-14"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#settingTwo"
                          aria-expanded="false"
                          aria-controls="settingTwo"
                        >
                          Statements
                        </button>
                      </h2>
                      <div id="settingTwo" class="accordion-collapse collapse" aria-labelledby="Statements" data-bs-parent="#accordionSettings">
                        <div class="accordion-body">
                          <form class="row row-cols-lg-auto g-3 align-items-center">
                            <div class="col-12">
                              <label class="visually-hidden" for="inlineFormSelectPref">Statements</label>
                              <select id="inlineFormSelectPref" class="form-select">
                                <option selected>
                                  Stocks
                                </option>
                                <option value="1">
                                  P&L Statements
                                </option>
                                <option value="2">
                                  Tax Shit
                                </option>
                                <option value="3">
                                  F&O Statements
                                </option>
                              </select>
                            </div>
                            <div class="col-12">
                              <label for="inputState" class="me-2 align-self-center d-block d-lg-flex visually-hidden">From</label>
                              <input class="form-control run-date" type="text" placeholder="Start Date..">
                            </div>
                            <div class="col-12">
                              <label for="inputTo" class="me-2 align-self-center d-block d-lg-flex visually-hidden">To</label>
                              <input class="form-control run-date" type="text" placeholder="End Date..">
                            </div>
                            <div class="col-12">
                              <button type="submit" class="btn btn-primary">
                                Email
                              </button>
                              <button type="submit" class="btn btn-primary">
                                Download
                              </button>
                            </div>
                          </form>
                        </div><!--end accordion-body-->
                      </div><!--end settingOne-->
                    </div><!--end accordion-item-->
                    <div class="accordion-item">
                      <h2 id="Notifications" class="accordion-header mt-0">
                        <button
                          class="accordion-button collapsed font-14"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#settingThree"
                          aria-expanded="false"
                          aria-controls="settingThree"
                        >
                          Notifications
                        </button>
                      </h2>
                      <div id="settingThree" class="accordion-collapse collapse" aria-labelledby="Notifications" data-bs-parent="#accordionSettings">
                        <div class="accordion-body">
                          <table class="table mb-0">
                            <thead class="thead-light">
                              <tr>
                                <th scope="col">
                                  Category
                                </th>
                                <th scope="col" class="text-end">
                                  Email
                                </th>
                                <th scope="col" class="text-end">
                                  SMS
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>News & Market Update</td>
                                <td class="text-end">
                                  <div>
                                    <input
                                      id="NewsEmail"
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      aria-label="..."
                                      checked
                                    >
                                  </div>
                                </td>
                                <td class="text-end">
                                  <div>
                                    <input
                                      id="NewsSMS"
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      aria-label="..."
                                      checked
                                    >
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>Stocks & Porfolio</td>
                                <td class="text-end">
                                  <div>
                                    <input
                                      id="StocksEmail"
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      aria-label="..."
                                      checked
                                    >
                                  </div>
                                </td>
                                <td class="text-end">
                                  <div>
                                    <input
                                      id="StocksSMS"
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      aria-label="..."
                                      checked
                                    >
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>New Futures Msg.</td>
                                <td class="text-end">
                                  <div>
                                    <input
                                      id="FuturesEmail"
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      aria-label="..."
                                      checked
                                    >
                                  </div>
                                </td>
                                <td class="text-end">
                                  <div>
                                    <input
                                      id="FuturesSMS"
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      aria-label="..."
                                      checked
                                    >
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div><!--end accordion-body-->
                      </div><!--end settingOne-->
                    </div><!--end accordion-item-->

                    <div class="accordion-item">
                      <h2 id="Brokerage" class="accordion-header mt-0">
                        <button
                          class="accordion-button collapsed font-14"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#settingFour"
                          aria-expanded="false"
                          aria-controls="settingFour"
                        >
                          Brokerage Table
                        </button>
                      </h2>
                      <div id="settingFour" class="accordion-collapse collapse" aria-labelledby="Brokerage" data-bs-parent="#accordionSettings">
                        <div class="accordion-body">
                          <div class="table-responsive">
                            <table class="table">
                              <thead class="table-light">
                                <tr>
                                  <th>Bullkit charges</th>
                                  <th>Equity delivery</th>
                                  <th>Equity intraday</th>
                                  <th>Equity futures</th>
                                  <th>Equity options</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="charges-heads">
                                    Brokerage
                                  </td>
                                  <td>Zero Brokerage</td>
                                  <td>0.03% or $. 20/executed order whichever is lower</td>
                                  <td>0.03% or $. 20/executed order whichever is lower</td>
                                  <td>Flat $. 20 per executed order</td>
                                </tr>
                                <tr class="grey-back">
                                  <td class="charges-heads">
                                    STT/CTT
                                  </td>
                                  <td>0.1% on buy &amp; sell</td>
                                  <td>0.025% on the sell side</td>
                                  <td>0.01% on sell side</td>
                                  <td>0.05% on sell side (on premium)</td>
                                </tr>
                                <tr>
                                  <td class="charges-heads">
                                    Transaction charges
                                  </td>
                                  <td>NASDAQ: 0.00345%<br>NYSE: 0.00345%</td>
                                  <td>NASDAQ: 0.00345%<br>NYSE: 0.00345%</td>
                                  <td>NASDAQ: 0.002%</td>
                                  <td>NASDAQ: 0.053% (on premium)</td>
                                </tr>
                                <tr class="grey-back">
                                  <td class="charges-heads">
                                    GST
                                  </td>
                                  <td>18% on (brokerage + transaction charges)</td>
                                  <td>18% on (brokerage + transaction charges)</td>
                                  <td>18% on (brokerage + transaction charges)</td>
                                  <td>18% on (brokerage + transaction charges)</td>
                                </tr>
                                <tr>
                                  <td class="charges-heads">
                                    SEBI charges
                                  </td>
                                  <td>$10 / crore</td>
                                  <td>$10 / crore</td>
                                  <td>$10 / crore</td>
                                  <td>$10 / crore</td>
                                </tr>
                                <tr class="grey-back">
                                  <td class="charges-heads">
                                    Stamp charges
                                  </td>
                                  <td>0.015% or $1500 / crore</td>
                                  <td>0.003% or $300 / crore</td>
                                  <td>0.002% or $200 / crore</td>
                                  <td>0.003% or $300 / crore</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div><!--end accordion-body-->
                      </div><!--end settingOne-->
                    </div><!--end accordion-item-->
                    <div class="accordion-item">
                      <h2 id="General" class="accordion-header mt-0">
                        <button
                          class="accordion-button collapsed font-14"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#settingFive"
                          aria-expanded="false"
                          aria-controls="settingFive"
                        >
                          General
                        </button>
                      </h2>
                      <div id="settingFive" class="accordion-collapse collapse" aria-labelledby="General" data-bs-parent="#accordionSettings">
                        <div class="accordion-body">
                          <h5 class="mt-0 font-13">
                            Change Password
                          </h5>
                          <form class="row row-cols-lg-auto g-3 align-items-center">
                            <div class="col-12">
                              <input
                                class="form-control"
                                type="password"
                                placeholder="Currant Password"
                              >
                            </div>

                            <div class="col-12">
                              <button
                                type="submit"
                                class="btn btn-primary"
                              >
                                Proceed
                              </button>
                            </div>
                          </form>
                          <h5 class="font-13">
                            Change Gmail & Contact Number
                          </h5>
                          <form class="row row-cols-lg-auto g-3 align-items-center">
                            <div class="col-12">
                              <input
                                class="form-control"
                                type="text"
                                placeholder=""
                                value="1234567890"
                                readonly
                              >
                            </div>
                            <div class="col-12">
                              <input
                                class="form-control"
                                type="text"
                                placeholder=""
                                value="example@xyz.com"
                                readonly
                              >
                            </div>
                            <div class="col-12">
                              <button
                                type="submit"
                                class="btn btn-primary"
                              >
                                Edit
                              </button>
                            </div>
                          </form>
                        </div><!--end accordion-body-->
                      </div><!--end settingOne-->
                    </div><!--end accordion-item-->
                    <div class="accordion-item">
                      <h2 id="FAQs" class="accordion-header mt-0">
                        <button
                          class="accordion-button collapsed font-14"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#settingSix"
                          aria-expanded="false"
                          aria-controls="settingSix"
                        >
                          FAQs
                        </button>
                      </h2>
                      <div id="settingSix" class="accordion-collapse collapse" aria-labelledby="FAQs" data-bs-parent="#accordionSettings">
                        <div class="accordion-body">
                          <div id="accordionFAQs" class="accordion">
                            <div class="accordion-item">
                              <h2 id="faqsOne" class="accordion-header m-0">
                                <button
                                  class="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#faqs_1"
                                  aria-expanded="true"
                                  aria-controls="faqs_1"
                                >
                                  Can I trade without a stockbroker?
                                </button>
                              </h2>
                              <div id="faqs_1" class="accordion-collapse collapse show" aria-labelledby="faqsOne" data-bs-parent="#accordionFAQs">
                                <div class="accordion-body">
                                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                </div>
                              </div>
                            </div>
                            <div class="accordion-item">
                              <h2 id="faqsTwo" class="accordion-header m-0">
                                <button
                                  class="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#faqs_2"
                                  aria-expanded="false"
                                  aria-controls="faqs_2"
                                >
                                  Can I trade when markets are closed or shut down?
                                </button>
                              </h2>
                              <div id="faqs_2" class="accordion-collapse collapse" aria-labelledby="faqsTwo" data-bs-parent="#accordionFAQs">
                                <div class="accordion-body">
                                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                </div>
                              </div>
                            </div>
                            <div class="accordion-item">
                              <h2 id="faqsThree" class="accordion-header m-0">
                                <button
                                  class="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#faqs_3"
                                  aria-expanded="false"
                                  aria-controls="faqs_3"
                                >
                                  How can I track my stock portfolio?
                                </button>
                              </h2>
                              <div id="faqs_3" class="accordion-collapse collapse" aria-labelledby="faqsThree" data-bs-parent="#accordionFAQs">
                                <div class="accordion-body">
                                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div><!--end accordion-body-->
                      </div><!--end settingOne-->
                    </div><!--end accordion-item-->
                  </div> <!--end accordion-->
                </div><!--end card-body-->
              </div><!--end card-->
            </div><!--end col-->
            <div class="col-lg-3">
              <div class="position-sticky" style="top: 120px">
                <div class="card">
                  <div class="card-body">
                    <div class="stock-search">
                      <form action="#" method="get">
                        <input type="search" name="search" class="form-control top-search mb-0" placeholder="Search Stock">
                        <div class="search-icon">
                          <i class="ti ti-search" />
                        </div>
                      </form>
                    </div>
                  </div><!--end card-body-->
                </div><!--end card-->
                <div class="card">
                  <div class="card-header">
                    <div class="row align-items-center">
                      <div class="col">
                        <h4 class="card-title">
                          My Watchlist <span class="stocks-list-badge bg-soft-primary ms-1">15</span>
                        </h4>
                      </div><!--end col-->
                      <div class="col-auto">
                        <div class="watchlist">
                          <select id="Watchlist" class="form-select">
                            <option value="value-1" class="px-5">
                              My Watchlist
                            </option>
                            <option value="value-2">
                              F & O
                            </option>
                            <option value="value-3">
                              Delivery
                            </option>
                            <option value="value-3">
                              Crypto
                            </option>
                            <option value="value-3">
                              Commodity
                            </option>
                            <option value="value-3">
                              Add New +
                            </option>
                          </select>
                        </div>
                      </div><!--end col-->
                    </div>  <!--end row-->
                  </div><!--end card-header-->
                  <div class="card-body p-0">
                    <div class="watchlist-body" data-simplebar>
                      <div id="watchlist_2" class="accordion">
                        <div class="accordion-item border-top-0">
                          <div id="headingOne" class="accordion-header">
                            <a class="accordion-button d-block py-2 px-3 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              <div class="d-flex justify-content-between">
                                <div class="align-self-center">
                                  <h6 class="m-0 text-uppercase font-11">Apple Inc</h6>
                                  <p class="text-uppercase font-10 mb-0">nasdaq</p>
                                </div>
                                <div>
                                  <h6 class="m-0 text-uppercase font-11">$147.95 <i class="ti ti-trending-down text-danger" /></h6>
                                  <div class="d-inline-block font-10"><span class="text-danger">-110.60</span> <span class="text-danger">(30.52%)</span></div>
                                </div>
                              </div><!-- end /div -->
                            </a>
                          </div>
                          <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#watchlist_2">
                            <div class="accordion-body">
                              <div class="d-flex justify-content-between">
                                <div class="action-icons">
                                  <ul class="list-inline">
                                    <li class="list-inline-item align-self-center mx-0 bg-success">
                                      <a href="javascript: void(0);" data-bs-toggle="modal" data-bs-target="#BuyStocks"><i class="ti ti-letter-b text-white email-action-icons-item" /></a>
                                    </li><!--end /li-->
                                    <li class="list-inline-item align-self-center mx-0 bg-danger">
                                      <a href="javascript: void(0);" data-bs-toggle="modal" data-bs-target="#SellStocks"><i class="ti ti-letter-s text-white email-action-icons-item" /></a>
                                    </li><!--end /li-->
                                    <li class="list-inline-item align-self-center mx-0">
                                      <a href="details.html"><i class="ti ti-chart-candle email-action-icons-item" /></a>
                                    </li><!--end /li-->
                                    <li class="list-inline-item align-self-center mx-0">
                                      <a href="javascript: void(0);"><i class="ti ti-trash email-action-icons-item" /></a>
                                    </li><!--end /li-->
                                  </ul><!--end /ul-->
                                </div> <!--end action-icons-->
                                <div>
                                  <p class="mb-0 text-muted">
                                    Avg. Traded Price : <span class="fw-semibold text-dark">$148.00</span>
                                  </p>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <div class="row align-items-center">
                                    <div class="col">
                                      <h6 class="text-success">
                                        Bid Price
                                      </h6>
                                    </div><!--end col-->
                                    <div class="col-auto">
                                      <p class="mb-0">
                                        Quantity
                                      </p>
                                    </div><!--end col-->
                                  </div>  <!--end row-->
                                  <ul class="list-unstyled mb-0">
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          140.50
                                        </p>
                                      </div>
                                      <span class="bg-soft-success px-1 rounded">1523</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          139.50
                                        </p>
                                      </div>
                                      <span class="bg-soft-success px-1 rounded">1823</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          136.00
                                        </p>
                                      </div>
                                      <span class="bg-soft-success px-1 rounded">1101</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          133.50
                                        </p>
                                      </div>
                                      <span class="bg-soft-success px-1 rounded">182</span>
                                    </li>
                                  </ul>
                                </div><!--end col-->
                                <div class="col">
                                  <div class="row align-items-center">
                                    <div class="col">
                                      <h6 class="text-danger">
                                        Ask Price
                                      </h6>
                                    </div><!--end col-->
                                    <div class="col-auto">
                                      <p class="mb-0">
                                        Quantity
                                      </p>
                                    </div><!--end col-->
                                  </div>  <!--end row-->
                                  <ul class="list-unstyled mb-0">
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          146.50
                                        </p>
                                      </div>
                                      <span class="bg-soft-danger px-1 rounded">1523</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          148.00
                                        </p>
                                      </div>
                                      <span class="bg-soft-danger px-1 rounded">1823</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          150.00
                                        </p>
                                      </div>
                                      <span class="bg-soft-danger px-1 rounded">1101</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          153.00
                                        </p>
                                      </div>
                                      <span class="bg-soft-danger px-1 rounded">182</span>
                                    </li>
                                  </ul>
                                </div><!--end col-->
                              </div><!--end row-->
                            </div><!--end accordion-body-->
                          </div>
                        </div>
                        <div class="accordion-item">
                          <div id="headingTwo" class="accordion-header">
                            <a class="accordion-button  d-block py-2 px-3 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              <div class="d-flex justify-content-between">
                                <div class="align-self-center">
                                  <h6 class="m-0 text-uppercase font-11">Tesla Inc</h6>
                                  <p class="text-uppercase font-10 mb-0">nasdaq</p>
                                </div>
                                <div>
                                  <h6 class="m-0 text-uppercase font-11">$680.35 <i class="ti ti-trending-up text-success" /></h6>
                                  <div class="d-inline-block font-10"><span class="text-success">50.10</span> <span class="text-success">(5.52%)</span></div>
                                </div>
                              </div><!-- end /div -->
                            </a>
                          </div>
                          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#watchlist_2">
                            <div class="accordion-body">
                              <div class="d-flex justify-content-between">
                                <div class="action-icons">
                                  <ul class="list-inline">
                                    <li class="list-inline-item align-self-center mx-0 bg-success">
                                      <a href="javascript: void(0);" data-bs-toggle="modal" data-bs-target="#BuyStocks"><i class="ti ti-letter-b text-white email-action-icons-item" /></a>
                                    </li><!--end /li-->
                                    <li class="list-inline-item align-self-center mx-0 bg-danger">
                                      <a href="javascript: void(0);" data-bs-toggle="modal" data-bs-target="#SellStocks"><i class="ti ti-letter-s text-white email-action-icons-item" /></a>
                                    </li><!--end /li-->
                                    <li class="list-inline-item align-self-center mx-0">
                                      <a href="javascript: void(0);"><i class="ti ti-chart-candle email-action-icons-item" /></a>
                                    </li><!--end /li-->
                                    <li class="list-inline-item align-self-center mx-0">
                                      <a href="javascript: void(0);"><i class="ti ti-trash email-action-icons-item" /></a>
                                    </li><!--end /li-->
                                  </ul><!--end /ul-->
                                </div> <!--end action-icons-->
                                <div>
                                  <p class="mb-0 text-muted">
                                    Avg. Traded Price : <span class="fw-semibold text-dark">$682.00</span>
                                  </p>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <div class="row align-items-center">
                                    <div class="col">
                                      <h6 class="text-success">
                                        Bid Price
                                      </h6>
                                    </div><!--end col-->
                                    <div class="col-auto">
                                      <p class="mb-0">
                                        Quantity
                                      </p>
                                    </div><!--end col-->
                                  </div>  <!--end row-->
                                  <ul class="list-unstyled mb-0">
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          680.50
                                        </p>
                                      </div>
                                      <span class="bg-soft-success px-1 rounded">1523</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          679.50
                                        </p>
                                      </div>
                                      <span class="bg-soft-success px-1 rounded">1823</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          676.00
                                        </p>
                                      </div>
                                      <span class="bg-soft-success px-1 rounded">1101</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          673.50
                                        </p>
                                      </div>
                                      <span class="bg-soft-success px-1 rounded">182</span>
                                    </li>
                                  </ul>
                                </div><!--end col-->
                                <div class="col">
                                  <div class="row align-items-center">
                                    <div class="col">
                                      <h6 class="text-danger">
                                        Ask Price
                                      </h6>
                                    </div><!--end col-->
                                    <div class="col-auto">
                                      <p class="mb-0">
                                        Quantity
                                      </p>
                                    </div><!--end col-->
                                  </div>  <!--end row-->
                                  <ul class="list-unstyled mb-0">
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          686.50
                                        </p>
                                      </div>
                                      <span class="bg-soft-danger px-1 rounded">1523</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          688.00
                                        </p>
                                      </div>
                                      <span class="bg-soft-danger px-1 rounded">1823</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          690.00
                                        </p>
                                      </div>
                                      <span class="bg-soft-danger px-1 rounded">1101</span>
                                    </li>
                                    <li class="d-flex justify-content-between align-items-start">
                                      <div class="me-auto">
                                        <p class="mb-0 ">
                                          693.00
                                        </p>
                                      </div>
                                      <span class="bg-soft-danger px-1 rounded">182</span>
                                    </li>
                                  </ul>
                                </div><!--end col-->
                              </div><!--end row-->
                            </div><!--end accordion-body-->
                          </div>
                        </div>
                      </div>
                    </div><!--end watchlist-body-->
                  </div><!--end card-body-->
                </div><!--end card-->
              </div><!--end sticky-->
            </div><!--end col-->
          </div><!--end row-->
        </div><!-- container -->

        <!--Start Rightbar-->
        <!--Start Rightbar/offcanvas-->
        <div id="Appearance" class="offcanvas offcanvas-end" tabindex="-1" aria-labelledby="AppearanceLabel">
          <div class="offcanvas-body">
            <button type="button" class="btn-close text-reset p-0 m-0 align-self-center float-end" data-bs-dismiss="offcanvas" aria-label="Close" />
            <div class="media">
              <div class="ipo_logo d-inline-block" style="height: 70px; width: 90px; line-height: 68px;">
                <img src="assets/images/ipo/ipo-1.png" alt="" class="" height="36">
              </div>
              <div class="media-body align-self-center ms-2">
                <h5 class="fw-semibold mt-0 font-16 mb-1">
                  Registered Clients
                </h5>
                <p class="text-success mb-0 font-12">
                  Application Successful
                </p>
              </div>
            </div><!--end media-->
            <hr class="hr-dashed">
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Applic. No
                <span class="font-12 fw-semibold">236568546</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Amount to be Blocked
                <span class="font-12 fw-semibold">$250.00</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Bid
                <span class="font-12 fw-semibold">01</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Market Lot
                <span class="font-12 fw-semibold">40 Shares</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Price
                <span class="font-12 fw-semibold">$25.00</span>
              </li>
            </ul>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                IPO Open Date
                <span class="font-12 fw-semibold">14/09/2021</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Allotment Date
                <span class="font-12 fw-semibold">18/09/2021</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Refunds
                <span class="font-12 fw-semibold">19/09/2021</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Credit Demat Ac.
                <span class="font-12 fw-semibold">20/09/2021</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                IPO Listing Date
                <span class="font-12 fw-semibold">21/09/2021</span>
              </li>
            </ul>
            <p class="p-2 bg-soft-info rounded font-15 fw-semibold">
              Upcoming IPOs 2021
            </p>
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col">
                    Name
                  </th>
                  <th scope="col" class="text-end">
                    Size
                  </th>
                  <th scope="col" class="text-end">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="../ipo.html" class="text-dark">Apple <span class="text-muted font-10">NASDAQ</span></a></td>
                  <td class="text-end">
                    2542cr.
                  </td>
                  <td class="text-end">
                    12 Nov.2021
                  </td>
                </tr>
                <tr>
                  <td><a href="../ipo.html">Panasonic</a></td>
                  <td class="text-end">
                    1302cr.
                  </td>
                  <td class="text-end">
                    18 Nov.2021
                  </td>
                </tr>
              </tbody>
            </table>
          </div><!--end offcanvas-body-->
        </div>
        <!--end Rightbar/offcanvas-->
        <!--end Rightbar-->

        <Footer />
      </div>
      <!-- end page content -->
    </div>
  </div>
</template>
