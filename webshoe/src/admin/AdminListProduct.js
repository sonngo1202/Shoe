import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function handleClick() {
    this.classList.toggle("block");
}
function AdminListProduct(props) {
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);
    const [textName, setTextName] = useState("");
    const [textCategory, setTextCategory] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [idP, setIdP] = useState();
    const navigate = useNavigate()
    const onViewClick = (id) => {
        navigate(`/admin/product/${id}`)
    }
    const onDeleteClick = (id) => {
        setShowDialog(true);
        setIdP(id);
    };

    const onCloseDialog = () => {
        setShowDialog(false)
    }
    const onConfirm = () => {
        fetch(`http://localhost:8080/admin/product/delete/${idP}`, {
            method: "DELETE",
        })
            .then(() => {
                fetch("http://localhost:8080/admin/products")
                    .then((respone) => respone.json())
                    .then((data) => {
                        setData(data)
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        setShowDialog(false)
    }

    const onSizeClick = (id) => {
        navigate(`/admin/product/${id}/sizes`)
    };

    useEffect(() => {
        const itemsliderbar = document.querySelectorAll(".formAdmin-left-item-button");
        itemsliderbar.forEach((menu) => {
            menu.addEventListener("click", handleClick);
            return () => {
                menu.removeEventListener("click", handleClick);
            };
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/admin/products", {
            headers: {
                "Content-Type": "application/json; charset=ISO-8",
            },
        })
            .then((respone) => respone.json())
            .then((data) => {
                setData(data)
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setProducts(data);
    }, [data]);

    useEffect(() => {
        setProducts(
            data.filter(
                (product) =>
                    product.name.toLowerCase().includes(textName.toLowerCase())
            )
        );
    }, [textName]);

    useEffect(() => {
        setProducts(
            data.filter(
                (product) =>
                    product.category.sex.toLowerCase().includes(textCategory.toLowerCase()) ||
                    product.category.type.toLowerCase().includes(textCategory.toLowerCase())
            )
        );
    }, [textCategory]);

    const Price = (price) => {
        const price_new = price * 1;
        return price_new.toLocaleString();
    }

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate("/trang-chủ")
    }

    const onManager = () => {
        navigate("/admin/bill")
    }

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
                    <h1>Danh sách sản phẩm</h1> <br />
                    <div className="row">
                        <input
                            type="text"
                            placeholder="Search name contains text"
                            style={{
                                marginLeft: "100px",
                                marginBottom: "10px",
                                padding: "8px",
                                width: "300px",
                                height: "36px",
                                borderRadius: "5px",
                                border: "1px solid #000",
                            }}
                            onChange={(e) => {
                                setTextName(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search category contains text"
                            style={{
                                marginLeft: "100px",
                                marginBottom: "10px",
                                padding: "8px",
                                width: "300px",
                                height: "36px",
                                borderRadius: "5px",
                                border: "1px solid #000",
                            }}
                            onChange={(e) => {
                                setTextCategory(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="formAdmin-right-bottom">
                    <table className="formAdmin-right-bottom-table">
                        <thead className="formAdmin-right-bottom-table-thead">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>ImageMain</th>
                                <th>ImageGallery1</th>
                                <th>ImageGallery2</th>
                                <th>ImageGallery3</th>
                                <th>Sale</th>
                                <th>Describe</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td> {product.id}</td>
                                    <td> {product.name}</td>
                                    <td>{product.category.sex + "-" + product.category.type}</td>
                                    <td> <img src={product.imageMain} /></td>
                                    <td> <img src={product.imageGallery1} /> </td>
                                    <td> <img src={product.imageGallery2} /> </td>
                                    <td> <img src={product.imageGallery3} /> </td>
                                    <td style={{ color: 'red' }}>{product.sale}%</td>
                                    <td>{product.des}</td>
                                    <td style={{ fontWeight: 'bold' }}>{Price(product.price)}<sup>đ</sup></td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => onViewClick(product.id)}>Xem</button><br />
                                        <button className="btn btn-warning" style={{ backgroundColor: "yellow" }} onClick={() => onSizeClick(product.id)}>Size</button><br />
                                        <button className="btn btn-danger" style={{ backgroundColor: "red" }} onClick={() => onDeleteClick(product.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-content" style={{ width: '27%' }}>
                        <h3>Bạn có chắc muốn xóa sản phẩm ?</h3>
                        <div className="dialog-content-button">
                            <button onClick={onConfirm}>Xác nhận</button>
                            <button onClick={onCloseDialog}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AdminListProduct;