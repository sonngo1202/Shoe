import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

function handleClick() {
    this.classList.toggle("block");
}

function CollectionsFilter(props) {
    const navigate = useNavigate();
    const params = useParams();
    const cate = params.cate;
    const [products, setProducts] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceFilteredProducts, setPriceFilteredProducts] = useState([]);
    const [sortType, setSortType] = useState("default");

    useEffect(() => {
        fetch(`http://localhost:8080/collections/${cate}`)
            .then((response) => response.json())
            .then((products) => {
                setProducts(products);
                setFilteredProducts(products);
            })
            .catch((err) => console.log(err));
    }, [cate]);

    useEffect(() => {
        fetch("http://localhost:8080/header")
            .then((response) => response.json())
            .then((categorys) => {
                setCategorys(categorys);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const itemsliderbar = document.querySelectorAll(".cartegory-left-li");
        itemsliderbar.forEach((menu) => {
            menu.addEventListener("click", handleClick);
            return () => {
                menu.removeEventListener("click", handleClick);
            };
        });
    }, []);

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

    const onProduct = (product, cate) => {
        navigate(`/product/${product.name}`, { state: { product, cate } });
    }
    
    const Price=(price)=>{
        const price_new = price*1;
        return price_new.toLocaleString();
    } 

    return (
        <section class="cartegory">
            <div class="container">
                <div class="cartegory-top row">
                    <p>Trang chủ <span>&#10230;</span> {cate}</p>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="cartegory-left">
                        <ul>
                            <li class="cartegory-left-li"><button>NAM</button>
                                <ul>
                                    {categorys.filter(category => category.sex === "nam").map(category => (
                                        <li><a href={"/collections/Nam-" + encodeURIComponent(category.type)}>{category.type}</a></li>
                                    ))}
                                </ul>
                            </li>
                            <li class="cartegory-left-li"><button>NỮ</button>
                                <ul>
                                    {categorys.filter(category => category.sex === "nữ").map(category => (
                                        <li><a href={"/collections/Nữ-" + encodeURIComponent(category.type)}>{category.type}</a></li>
                                    ))}
                                </ul>
                            </li>
                            <li class="cartegory-left-li"><button>TRẺ EM</button>
                                <ul>
                                    {categorys.filter(category => category.sex === "trẻ em").map(category => (
                                        <li><a href={"/collections/Trẻ Em-" + encodeURIComponent(category.type)}>{category.type}</a></li>
                                    ))}
                                </ul>
                            </li>
                            <li class="cartegory-left-li"><a href="">SALE</a></li>
                        </ul>
                    </div>

                    <div class="cartegory-right">
                        <div class="category-right-top row">
                            <div class="cartegory-right-top-item">
                                <p>{cate}</p>
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
                        <div class="cartegory-right-content row">
                            {filteredProducts.map((product) => (
                                <div class="cartegory-right-content-item">
                                    <button onClick={() => onProduct(product, cate)}>
                                        <img src={product.imageMain} />
                                        <h1>{product.name}</h1>
                                        <div class="cartegory-right-content-price row">
                                            {product.sale != 0 && <p style={{textDecorationLine :'line-through', marginRight: '30px'}}>{Price(product.price)}<sup>đ</sup></p>}
                                            <p style={{color: 'red'}}>{Price(product.price*(100-product.sale)/100)}<sup>đ</sup></p>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default CollectionsFilter;