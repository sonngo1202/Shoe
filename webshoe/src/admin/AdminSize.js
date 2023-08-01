import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function handleClick() {
    this.classList.toggle("block");
}

function AdminSize(props) {
    const { idp, id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [quantityError, setQuantityError] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [checkSizeQuantity, setCheckSizeQuantity] = useState(false);
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate("/trang-chủ")
    }

    const onManager = () => {
        navigate("/admin/bill")
    }

    const onSaveClick = () => {
        if (!productDetail.size) {
            setSizeError(true);
        } else if (!productDetail.quantity) {
            setQuantityError(true);
        } else {
            const pDetail = {
                id:productDetail.id,
                quantity : productDetail.quantity,
                size : productDetail.size,
                product : {
                    id : idp,
                    name : '',
                    price : 0,
                    sale: 0,
                    category : null,
                    des : '',
                    imageMain : '',
                    imageGallery1 : '',
                    imageGallery2 : '',
                    imageGallery3 : ''
                }
            }
            fetch(`http://localhost:8080/admin/size/save/${id}`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(pDetail),
                headers: {
                    "Content-Type": "application/json; charset=ISO-8859-1",
                },
            })
                .then((response) => response.text())
                .then((data) => {
                    if (data === "duplication" && id < 0) setCheckSizeQuantity(true);
                    else {
                        navigate(`/admin/product/${idp}/sizes`);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8080/admin/product/${idp}/size/${id}`)
            .then((response) => response.json())
            .then((data) => setProductDetail(data))
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
                    <h1>{id <= 0 ? "Thêm Size" : `Size ${id}`}</h1>
                </div>
                <div className="formAdmin-right-bottom">
                    <div class="formAdmin-right-bottom-user">
                        <div class="formAdmin-right-bottom-user-row">
                            <div class="formAdmin-right-bottom-user-item">
                                <label>ID</label><span>*</span><br />
                                <input
                                    type="number"
                                    value={productDetail.id ? productDetail.id : 0}
                                    onChange={(e) => setProductDetail({ ...productDetail, id: e.target.value })}
                                    disabled="disabled"
                                />
                            </div>
                            <div class="formAdmin-right-bottom-user-item">
                                <label>Size</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={productDetail.size ? productDetail.size : ""}
                                    onChange={(e) => {
                                        setProductDetail({ ...productDetail, size: e.target.value });
                                        setSizeError(false);
                                    }}
                                />
                                {sizeError && <p style={{ color: "red" }}>Size not null</p>}
                            </div>
                        </div>
                        <div class="formAdmin-right-bottom-user-row">
                            <div class="formAdmin-right-bottom-user-item">
                                <label>Quantity</label><span>*</span><br />
                                <input
                                    type="number"
                                    value={productDetail?.quantity}
                                    onChange={(e) => {
                                        setProductDetail({ ...productDetail, quantity: e.target.value });
                                        setQuantityError(false);
                                        setCheckSizeQuantity(false);
                                    }}
                                />
                                {quantityError && <p style={{ color: "red" }}>Quantity not null</p>}
                            </div>
                            <div class="formAdmin-right-bottom-user-item">
                                <label>ID product</label><span>*</span><br />
                                <input
                                    type="number"
                                    value={productDetail.product ? productDetail.product.id:idp}
                                    disabled
                                />
                                {checkSizeQuantity && <p style={{ color: "red" }}>Size already exists</p>}
                            </div>
                        </div>
                    </div>
                    <div class="formAdmin-right-bottom-user-item">
                        <button style={{ marginLeft: '58.5%' }} onClick={onSaveClick}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSize;
