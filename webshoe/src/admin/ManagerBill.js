import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function handleClick() {
    this.classList.toggle("block");
}

function ManagerBill(props) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [check, setCheck] = useState(false);
    const [idB, setIdB] = useState();
    const [bill, setBill] = useState({})

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
        fetch(`http://localhost:8080/admin/bills`)
            .then((resp) => resp.json())
            .then((data) => {
                setData(data)
                console.log(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate("/trang-chủ")
    }

    const onManager = () => {
        navigate("/admin/bill")
    }

    const onAddBill = (bill) => {
        setCheck(true);
        setShowDialog(true);
        setBill(bill)
    }

    const onDelete = (idB) => {
        setCheck(false);
        setShowDialog(true);
        setIdB(idB);
    }
    const onCloseDialog = () => {
        setShowDialog(false)
    }
    const onConfirm = () => {
        if (check) {
            console.log(bill)
            fetch(`http://localhost:8080/addbill`, {
                method: "POST",
                body: JSON.stringify(bill),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .then(() => {
                    fetch(`http://localhost:8080/bill/delete`, {
                        method: "DELETE",
                        body: JSON.stringify(bill.id),
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                        },
                    })
                        .then(() => {
                            fetch(`http://localhost:8080/admin/bills`)
                                .then((resp) => resp.json())
                                .then((data) => setData(data))
                                .catch((err) => console.log(err))
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
            setShowDialog(false)
        } else {
            fetch(`http://localhost:8080/bill/delete`, {
                method: "DELETE",
                body: JSON.stringify(idB),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .then(() => {
                    fetch(`http://localhost:8080/admin/bills`)
                        .then((resp) => resp.json())
                        .then((data) => setData(data))
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
            setShowDialog(false)
        }
    }

    const Price = (price) => {
        const price_new = price * 1;
        return price_new.toLocaleString();
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
                    <h1>Quản lý đơn hàng</h1>
                </div>
                <div className="formAdmin-right-bottom">
                    {data.length !== 0 ?
                        <div class="checkbill-content">
                            <table>
                                <tr>
                                    <th>TÊN KHÁCH HÀNG</th>
                                    <th>ĐỊA CHỈ</th>
                                    <th>ThÔNG TIN ĐƠN HÀNG</th>
                                    <th>NGÀY</th>
                                    <th>LỰA CHỌN</th>
                                </tr>
                                {data.map((bill) => (
                                    <tr>
                                        <td style={{width:'10%'}}>{bill.cus !== null ? bill.cus.name : bill.u.name}</td>
                                        <td style={{width:'15%'}}>{bill.address}</td>
                                        <td>
                                            <table>
                                                <tr>
                                                    <th>Sản phẩm</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Size</th>
                                                    <th>Số Lượng</th>
                                                    <th>Giá tiền</th>
                                                </tr>
                                                {bill.listItemBill.map((item) => (
                                                    <tr>
                                                        <td><img src={item.pDetail.product.imageMain} /></td>
                                                        <td><p>{item.pDetail.product.name}</p></td>
                                                        <td><p>{item.pDetail.size}</p></td>
                                                        <td><p>{item.amount}</p></td>
                                                        <td>{item.pDetail.product.sale != 0 && <p style={{ fontSize: '16px', textDecorationLine: 'line-through' }}>{Price(item.price)}<sup>đ</sup></p>}
                                                            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{Price(item.price * (100 - item.pDetail.product.sale) / 100)}<sup>đ</sup></p></td>
                                                    </tr>
                                                ))}
                                            </table>
                                        </td>
                                        <td style={{width:'10%'}}>{bill.paymentTime}</td>
                                        <td style={{width:'10%'}}><button onClick={() => onAddBill(bill)}>Duyệt</button><br />
                                            <button onClick={() => onDelete(bill.id)}>Xóa</button></td>
                                    </tr>
                                ))}
                            </table>
                        </div> :
                        <div class="checkbill-contenta">
                            <p>Không có đơn hàng nào được đặt</p>
                        </div>
                    }
                </div>
            </div>
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-content" style={{ width: '27%' }}>
                        {check ? <h3>Nhận đơn hàng và giao hàng cho khách?</h3> : <h3>Bạn có chắc không muốn nhận đơn hàng?</h3>}
                        <div className="dialog-content-button">
                            <button onClick={onConfirm}>Xác nhận</button>
                            <button onClick={onCloseDialog}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ManagerBill;