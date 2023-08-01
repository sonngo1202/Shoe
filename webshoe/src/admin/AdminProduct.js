import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function handleClick() {
    this.classList.toggle("block");
}

function AdminProduct(props) {
    const params = useParams();
    const [product, setProduct] = useState({ category: { name: "" } });
    const [name, setName] = useState();
    const [nameError, setNameError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [ImageMainError, setImageMainError] = useState(false);
    const [ImageGallery1Error, setImageGallery1Error] = useState(false);
    const [ImageGallery2Error, setImageGallery2Error] = useState(false);
    const [ImageGallery3Error, setImageGallery3Error] = useState(false);
    const [saleError, setSaleError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [checkNameCategory, setCheckNameCategory] = useState(false);

    const navigate = useNavigate()
    const id = params.id;


    const onLogout = () => {
        localStorage.removeItem('user');
        navigate("/trang-chủ")
    }

    const onManager = () => {
        navigate("/admin/bill")
    }

    const onSaveClick = () => {
        console.log(product)
        if (!product?.name) {
            setNameError(true);
        }
        else if (!product.category?.sex) {
            setCategoryError(true);
        }
        else if (!product?.imageMain) {
            setImageMainError(true);
        }
        else if (!product?.imageGallery1) {
            setImageGallery1Error(true);
        }
        else if (!product?.imageGallery2) {
            setImageGallery2Error(true);
        }
        else if (!product?.imageGallery3) {
            setImageGallery3Error(true);
        }
        else if (!product?.sale) {
            setSaleError(true);
        }
        else if (!product?.price) {
            setPriceError(true);
        }
        else {
            fetch(`http://localhost:8080/admin/product/save/${id}`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log(data);
                    navigate(`/admin/products`);
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8080/admin/product/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data)
                setName(data.category ? data.category.sex + '-' + data.category.type: '')
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const itemsliderbar = document.querySelectorAll(".formAdmin-left-item-button");
        itemsliderbar.forEach((menu) => {
            menu.addEventListener("click", handleClick);
            return () => {
                menu.removeEventListener("click", handleClick);
            };
        });
    }, []);

    return (
        <div className="formAdmin row">
            <div className="formAdmin-left">
                <img src="https://admin.sonadezi.edu.vn/Uploads/files/2018-11/Bitis.png" alt="" />
                <div className="formAdmin-left-item">
                    <ul>
                        <li class="formAdmin-left-item-button"><button>Quản lý sản phẩm</button>
                            <ul>
                                <li><a href="/admin/products">Danh sách sản phẩm</a></li>
                                <li><a href="/admin/product/-1">Thêm sản phẩm</a></li>
                            </ul>
                        </li>
                        <li class="formAdmin-left-item-button"><button>Quản lý người dùng</button>
                            <ul>
                                <li><a href="/admin/users">Danh sách người dùng</a></li>
                                <li><a href="/admin/user/-1">Thêm Admin</a></li>
                            </ul>
                        </li>
                        <li class="formAdmin-left-item-button"><button>Thống kê</button>
                            <ul>
                                <li><a href="/admin/statByDay">Doanh thu theo ngày</a></li>
                                <li><a href="/admin/statByPro">Doanh thu theo sản phẩm</a></li>
                            </ul>
                        </li>
                        <li class="formAdmin-left-item-button"><button onClick={onManager}>Quản lý đơn hàng</button></li>
                    </ul>
                </div>
            </div>
            <div className="formAdmin-right">
                <div className="formAdmin-right-top">
                    <p>{props.user.name}</p>
                    <button onClick={onLogout}>Đăng xuất</button>
                </div>
                <div className="formAdmin-right-center">
                    <br />
                    <h1>{id <= 0 ? "Thêm Sản Phẩm" : `Sản Phẩm ${id}`}</h1>
                </div>
                <div className="formAdmin-right-bottom">
                    <div class="formAdmin-right-bottom-product">
                        <div class="formAdmin-right-bottom-product-row">
                            <div class="formAdmin-right-bottom-product-item">
                                <label>ID</label><span>*</span><br />
                                <input
                                    type="number"
                                    value={product.id ? product.id : 0}
                                    onChange={(e) => setProduct({ ...product, id: e.target.value })}
                                    disabled="disabled"
                                />
                            </div>
                            <div class="formAdmin-right-bottom-product-item">
                                <label>Category</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                        const s = e.target.value.split("-");
                                        setProduct({...product, category : {...product.category, sex:s[0], type:s[1]}})
                                        setCategoryError(false);
                                    }}
                                    placeholder="Giới tính-Thể loại"
                                />

                                {categoryError && <p style={{ color: "red" }}>Category not null</p>}
                            </div>
                        </div>
                        <div class="formAdmin-right-bottom-product-row">
                            <div class="formAdmin-right-bottom-product-item">
                                <label>Name</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={product.name ? product.name : ""}
                                    onChange={(e) => {
                                        setProduct({ ...product, name: e.target.value });
                                        setNameError(false);
                                        setCheckNameCategory(false);
                                    }}
                                />
                                {nameError && <p style={{ color: "red" }}>Name not null</p>}
                            </div>
                        </div>
                        <div class="formAdmin-right-bottom-product-row">
                            <div class="formAdmin-right-bottom-product-item">
                                <label>Price</label><span>*</span><br />
                                <input
                                    type="number"
                                    value={product?.price}
                                    onChange={(e) => {
                                        setProduct({ ...product, price: e.target.value });
                                        setPriceError(false);
                                    }}
                                    min={0}
                                />
                                {priceError && <p style={{ color: "red" }}>Price not null</p>}
                            </div>
                            <div class="formAdmin-right-bottom-product-item">
                                <label>Sale</label><span>*</span><br />
                                <input
                                    type="number"
                                    value={product.sale}
                                    onChange={(e) => {
                                        setProduct({ ...product, sale: e.target.value });
                                        setSaleError(false);
                                    }}
                                    min={0}
                                />
                                {saleError && <p style={{ color: "red" }}>Sale not null</p>}
                            </div>
                        </div>
                        <div class="formAdmin-right-bottom-product-row">
                            <div class="formAdmin-right-bottom-product-item">
                                <label>Describe</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={product.des ? product.des : ""}
                                    onChange={(e) => {
                                        setProduct({ ...product, des: e.target.value });
                                    }}
                                />
                            </div>

                        </div>
                        <div class="formAdmin-right-bottom-product-row">
                            <div class="formAdmin-right-bottom-product-item">
                                <label>ImageMain</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={product.imageMain ? product.imageMain : ""}
                                    onChange={(e) => {
                                        setProduct({ ...product, imageMain: e.target.value });
                                        setImageMainError(false);
                                    }}
                                />
                                {ImageMainError && <p style={{ color: "red" }}>ImageMain not null</p>}
                                <br/>
                                {product.imageMain && <img src={product.imageMain} alt="" />}
                            </div>
                            <div class="formAdmin-right-bottom-product-item">
                                <label>ImageGallery1</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={product.imageGallery1 ? product.imageGallery1 : ""}
                                    onChange={(e) => {
                                        setProduct({ ...product, imageGallery1: e.target.value });
                                        setImageGallery1Error(false);
                                    }}
                                />
                                {ImageGallery1Error && <p style={{ color: "red" }}>ImageGallery1 not null</p>}
                                <br/>
                                {product.imageGallery1 && <img src={product.imageGallery1} alt="" />}
                            </div>
                        </div>
                        <div class="formAdmin-right-bottom-product-row">
                            <div class="formAdmin-right-bottom-product-item">
                                <label>ImageGallery2</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={product.imageGallery2 ? product.imageGallery2 : ""}
                                    onChange={(e) => {
                                        setProduct({ ...product, imageGallery2: e.target.value });
                                        setImageGallery2Error(false);
                                    }}
                                />
                                {ImageGallery2Error && <p style={{ color: "red" }}>ImageGallery2 not null</p>}
                                <br/>
                                {product.imageGallery2 && <img src={product.imageGallery1} alt="" />}
                            </div>
                            <div class="formAdmin-right-bottom-product-item">
                                <label>ImageGallery3</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={product.imageGallery3 ? product.imageGallery3 : ""}
                                    onChange={(e) => {
                                        setProduct({ ...product, imageGallery3: e.target.value });
                                        setImageGallery3Error(false);
                                    }}
                                />
                                {ImageGallery3Error && <p style={{ color: "red" }}>ImageGallery3 not null</p>}
                                <br/>
                                {product.imageGallery3 && <img src={product.imageGallery3} alt="" />}
                            </div>
                        </div>
                        <div class="formAdmin-right-bottom-product-item">
                            {checkNameCategory && <p style={{ color: "red" }}>Product already exist</p>}
                            <br/>
                            <button onClick={onSaveClick} style={{ marginBottom: "10px" }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminProduct;