import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/products";

const ProductDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["PRODUCTS", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/products/${id}`
      );
      return data.product;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="container">
      <div className="chi-tit-sn-phm">
        <main className="frame-container">
          <div className="graph-structure">
            <section className="frame-section">
              <div className="rectangle-parent">
                <div className="frame-child" />
                <div className="frame-wrapper">
                  <div className="home-parent">
                    <a href="/">
                      <div className="home1">Home</div>
                    </a>

                    <div className="binary-tree">
                      <img
                        className="dashiconsarrow-up-alt2"
                        loading="lazy"
                        src="../public/dashiconsarrowupalt2@2x.png"
                      />
                    </div>
                  </div>
                </div>
                <div className="b-s-tree">
                  <div className="shop1">Shop</div>
                </div>
                <div className="prefix-trie">
                  <img
                    className="dashiconsarrow-up-alt21"
                    src="../public/dashiconsarrowupalt2@2x.png"
                  />
                </div>
                <div className="line-parent">
                  <div className="frame-item" />
                  <div className="asgaard-sofa-wrapper">
                    <div className="asgaard-sofa">{data.name}</div>
                  </div>
                </div>
              </div>
              <div className="rectangle-group">
                <div className="frame-inner" />
                <div className="group-div">
                  <div className="frame-div">
                    <img className="group-icon" src={data.image} />
                    <img className="frame-child1" src={data.image} />
                    <img className="frame-child2" src={data.image} />
                    <img className="frame-child3" src={data.image} />
                    <div className="featured-products-parent">
                      <div className="featured-products" />
                      <img
                        className="asgaard-sofa-3"
                        loading="lazy"
                        src={data.image}
                      />
                    </div>
                  </div>
                </div>
                <div className="frame-parent1">
                  <div className="frame-parent2">
                    <div className="frame-wrapper1">
                      <div className="asgaard-sofa-parent">
                        <div className="asgaard-sofa1">{data.name}</div>
                        <div className="div">
                          {data?.price - data?.price * (data?.discount / 100)}$
                        </div>
                      </div>
                    </div>
                    <div className="frame-parent3">
                      <div className="frame-wrapper2">
                        <div className="dashiconsstar-filled-parent">
                          <img
                            className="dashiconsstar-filled"
                            loading="lazy"
                            src="../public/dashiconsstarfilled.svg"
                          />
                          <img
                            className="dashiconsstar-filled1"
                            src="../public/dashiconsstarfilled.svg"
                          />
                          <img
                            className="dashiconsstar-filled2"
                            src="../public/dashiconsstarfilled.svg"
                          />
                          <img
                            className="dashiconsstar-filled3"
                            src="../public/dashiconsstarfilled.svg"
                          />
                          <img
                            className="carbonstar-half-icon"
                            src="../public/carbonstarhalf.svg"
                          />
                        </div>
                      </div>
                      <div className="cta" />
                      <div className="customer-review-wrapper">
                        <div className="customer-review">5 Customer Review</div>
                      </div>
                    </div>
                    <div className="setting-the-bar-as-one-of-the-wrapper">
                      <div className="setting-the-bar-container">
                        <p className="setting-the-bar">{data.description}</p>
                        <p className="p" />
                      </div>
                    </div>
                    <div className="size-parent">
                      <div className="size">Size</div>
                      <div className="input-filter">
                        <div className="output-processor">
                          <div className="rectangle-container">
                            <div className="rectangle-div" />
                            <div className="l">L</div>
                          </div>
                          <div className="rectangle-parent1">
                            <div className="frame-child4" />
                            <div className="xl">XL</div>
                          </div>
                          <div className="rectangle-parent2">
                            <div className="frame-child5" />
                            <div className="xs">XS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="color">Color</div>
                    <div className="frame-wrapper3">
                      <div className="frame-parent4">
                        <div className="featured-products-group">
                          <div className="featured-products1" />
                          <div className="featured-products2" />
                          <div className="featured-products3" />
                        </div>
                        <div className="frame-parent5">
                          <div className="frame-wrapper4">
                            <div className="rectangle-parent3">
                              <div className="frame-child6" />
                              <div className="featured-products4">-</div>
                              <div className="featured-products5">1</div>
                              <div className="featured-products6">+</div>
                            </div>
                          </div>
                          <button className="group-button">
                            <div className="frame-child7" />
                            <div className="add-to-cart">Add Cart</div>
                          </button>
                          <div className="rectangle-parent4">
                            <div className="frame-child8" />
                            <div className="compare-wrapper">
                              <div className="compare">Compare</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="frame-parent6">
                    <div className="line-wrapper">
                      <div className="line-div" />
                    </div>
                    <div className="frame-parent7">
                      <div className="sku-parent">
                        <div className="sku">SKU</div>
                        <div className="category">Category</div>
                        <div className="tags">Tags</div>
                        <div className="share">Share</div>
                      </div>
                      <div className="ancestral-path-parent">
                        <div className="ancestral-path">:</div>
                        <div className="ancestral-path1">:</div>
                        <div className="ancestral-path2">:</div>
                        <div className="university-drive-suite">:</div>
                      </div>
                      <div className="descendants-path">
                        <div className="ss001">SS001</div>
                        <div className="sofas">Sofas</div>
                        <div className="sofa-chair-home">
                          Sofa, Chair, Home, Shop
                        </div>
                        <div className="component-network">
                          <div className="connected-components1">
                            <img
                              className="akar-iconsfacebook-fill"
                              loading="lazy"
                              src="../public/akariconsfacebookfill.svg"
                            />
                          </div>
                          <div className="connected-components2">
                            <img
                              className="akar-iconslinkedin-box-fill"
                              loading="lazy"
                              src="../public/akariconslinkedinboxfill.svg"
                            />
                          </div>
                          <img
                            className="ant-designtwitter-circle-fill-icon"
                            loading="lazy"
                            src="../public/antdesigntwittercirclefilled.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section className="graph-structure">
            <div className="rectangle-parent5">
              <div className="frame-child9" />
              <div className="help" />
              <div className="block-diagram">
                <div className="connection-matrix-parent">
                  <div className="connection-matrix">
                    <div className="weighted-edge">
                      <h3 className="description">Description</h3>
                      <h3 className="additional-information">
                        Additional Information
                      </h3>
                      <h3 className="reviews-5">Reviews [5]</h3>
                    </div>
                  </div>
                  <div className="undirected-edge">
                    <div className="self-loop">
                      <div className="embodying-the-raw">
                        Embodying the raw, wayward spirit of rock ‘n’ roll, the
                        Kilburn portable active stereo speaker takes the
                        unmistakable look and sound of Marshall, unplugs the
                        chords, and takes the show on the road.
                      </div>
                      <div className="weighing-in-under">
                        Weighing in under 7 pounds, the Kilburn is a lightweight
                        piece of vintage styled engineering. Setting the bar as
                        one of the loudest speakers in its class, the Kilburn is
                        a compact, stout-hearted hero with a well-balanced audio
                        which boasts a clear midrange and extended highs for a
                        sound that is both articulate and pronounced. The
                        analogue knobs allow you to fine tune the controls to
                        your personal preferences while the guitar-influenced
                        leather strap enables easy and stylish travel.
                      </div>
                    </div>
                  </div>
                  <div className="loop-edge">
                    <img
                      className="loop-edge-child"
                      loading="lazy"
                      src="../public/group-107@2x.png"
                    />
                    <img
                      className="loop-edge-item"
                      loading="lazy"
                      src="../public/group-106@2x.png"
                    />
                  </div>
                </div>
              </div>
              <div className="flowchart" />
            </div>
          </section>
        </main>
      </div>
    </div>

    // chi tiết
  );
};

export default ProductDetail;
