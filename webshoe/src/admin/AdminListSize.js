import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function handleClick() {
    this.classList.toggle("block");
}

function AdminListSize(props) {
    const [productDetails, setProductDetails] = useState([]);
    const [data, setData] = useState([]);
    const { idp } = useParams();
    const navigate = useNavigate()
    const [showDialog, setShowDialog] = useState(false)
    const [idPD, setIdPD] = useState();

    const onViewClick = (idp, id) => {
        navigate(`/admin/product/${idp}/size/${id}`)
    }

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate("/trang-chủ")
    }

    const onManager = () => {
        navigate("/admin/bill")
    }

    const onDeleteClick = (id) => {
        setShowDialog(true);
        setIdPD(id)
    };

    const onCloseDialog = () => {
        setShowDialog(false)
    }

    const onConfirm = () => {
        fetch(`http://localhost:8080/admin/size/delete/${idPD}`, {
            method: "DELETE",
        })
            .then(() => {
                fetch(`http://localhost:8080/admin/product/${idp}/sizes`)
                    .then((respone) => respone.json())
                    .then((data) => {
                        setData(data)
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        setShowDialog(false)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/admin/product/${idp}/sizes`)
            .then((respone) => respone.json())
            .then((data) => {
                setData(data)
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setProductDetails(data);
    }, [data]);

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
                    <h1>Danh sách size của sản phẩm có ID là {idp}</h1>
                    <div className="row">
                        <button className="btn btn-warning" onClick={() => onViewClick(idp, -1)}>Add size</button>
                    </div>
                </div>
                <div className="formAdmin-right-bottom">
                    <table className="formAdmin-right-bottom-table">
                        <thead className="formAdmin-right-bottom-table-thead">
                            <tr>
                                <th>ID</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetails.map((productDetail) => (
                                <tr key={productDetail.id}>
                                    <td style={{ width: '5%' }}> {productDetail.id}</td>
                                    <td style={{ width: '10%' }}> {productDetail.size}</td>
                                    <td>{productDetail.quantity}</td>
                                    <td><img src={productDetail.product.imageMain}></img></td>
                                    <td>{productDetail.product.name}</td>
                                    <td style={{ width: '10%' }}>
                                        <button className="btn btn-primary" onClick={() => onViewClick(idp, productDetail.id)}>View</button><br />
                                        <button className="btn btn-danger" onClick={() => onDeleteClick(productDetail.id)}>Delete</button>
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
                        <h3>Bạn có chắc muốn xóa size này ?</h3>
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
export default AdminListSize;