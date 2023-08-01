import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

function Search(props) {
    const params = useParams();
    const key = params.key;
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceFilteredProducts, setPriceFilteredProducts] = useState([]);
    const [sortType, setSortType] = useState("default");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/search/${key}`)
            .then((response) => response.json())
            .then((products) => {
                setProducts(products);
            })
            .catch((err) => console.log(err));
    }, [key]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        let filtered = [...products];

        switch (priceFilteredProducts) {
            case "300-500":
                filtered = filtered.filter((product) => product.price >= 300000 && product.price <= 500000);
                break;
            case "500-700":
                filtered = filtered.filter((product) => product.price >= 500000 && product.price <= 700000);
                break;
            case "700-1000":
                filtered = filtered.filter((product) => product.price >= 700000 && product.price <= 1000000);
                break;
            case "1000+":
                filtered = filtered.filter((product) => product.price >= 1000000);
                break;
            default:
                break;
        }

        switch (sortType) {
            case "high-to-low":
                filtered = filtered.sort((a, b) => b.price - a.price);
                break;
            case "low-to-high":
                filtered = filtered.sort((a, b) => a.price - b.price);
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [priceFilteredProducts, sortType, products]);

    const onProduct = (product) => {
        navigate(`/product/${product.name}`, {
            state: { product, cate: "Tìm kiếm" },
        });
    };

    const Price = (price) => {
        const price_new = price * 1;
        return price_new.toLocaleString();
    }

    return (
        <section className="cartegory">
            <div className="container">
                <div className="row">
                    <div className="cartegory-left">
                        {/* thay sản phẩm gì đó */}
                    </div>

                    <div className="cartegory-right">
                        <div class="category-right-top row">
                            <div class="cartegory-right-top-item">
                                <p>TÌM KIẾM "{key}"</p>
                            </div>
                            <div class="cartegory-right-top-item">
                                <select onChange={(e) => { setPriceFilteredProducts(e.target.value) }}>
                                    <option value="all">Tất cả</option>
                                    <option value="300-500">300.000đ - 500.000đ</option>
                                    <option value="500-700">500.000đ - 700.000đ</option>
                                    <option value="700-1000">700.000đ - 1.000.000đ</option>
                                    <option value="1000+">Trên 1.000.000đ</option>
                                </select>
                            </div>
                            <div class="cartegory-right-top-item">
                                <select onChange={(e) => { setSortType(e.target.value) }}>
                                    <option value="default">Sắp xếp mặc định</option>
                                    <option value="low-to-high">Giá từ thấp đến cao</option>
                                    <option value="high-to-low">Giá từ cao đến thấp</option>
                                </select>
                            </div>
                        </div>
                        {filteredProducts.length === 0 ?
                            (<p style={{fontSize:'30px', textAlign:'center', margin:'100px 0px 600px 0px'}}>Không có sản phẩm nào được tìm thấy</p>)
                            :
                            (<div className="cartegory-right-content row">
                                {filteredProducts.map((product) => (
                                    <div className="cartegory-right-content-item">
                                        <button onClick={() => onProduct(product)}>
                                            <img src={product.imageMain} alt={product.name} />
                                            <h1>{product.name}</h1>
                                            <div class="cartegory-right-content-price row">
                                                {product.sale != 0 && <p style={{ textDecorationLine: 'line-through', marginRight: '30px' }}>{Price(product.price)}<sup>đ</sup></p>}
                                                <p style={{ color: 'red' }}>{Price(product.price * (100 - product.sale) / 100)}<sup>đ</sup></p>
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Search;
