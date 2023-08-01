import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function handleClick() {
    this.classList.toggle("block");
}

function AdminBillsDay(props) {
    const params = useParams();
    const [bills, setBills] = useState([]);
    const [data, setData] = useState([]);
    const day = params.day;
    const navigate = useNavigate();
    const location = useLocation();
    const st = location.state.st;
    const et = location.state.et;

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
        fetch(`http://localhost:8080/admin/statByDay/bills/${day}`)
            .then((respone) => respone.json())
            .then((data) => {
                setData(data)
                console.log(data)
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        setBills(data);
    }, [data]);

    const Price = (price) => {
        const price_new = price * 1;
        return price_new.toLocaleString();
    }

    const onBack = () => {
        navigate(`/admin/statByDay`, {
            state: { st, et }
        })
    }

    const onLogout=()=>{
        localStorage.removeItem('user');
        navigate("/trang-chủ")
    }

    const onManager = () =>{
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
                    <h1>Thống kê hóa đơn theo ngày</h1>
                    <button onClick={onBack}>Quay lại</button>
                </div>
                <div className="formAdmin-right-bottom">
                    <table className="formAdmin-right-bottom-table">
                        <thead className="formAdmin-right-bottom-table-thead">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Total</th>
                                <th>Revenue</th>
                                <th>PayTime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => (
                                <tr key={bill.id}>
                                    <td style={{ width: '10%' }}>{bill.id}</td>
                                    <td>{bill.cus !== null ? bill.cus.name : bill.u.name}</td>
                                    <td> {bill.totalAmount}</td>
                                    <td> {Price(bill.totalPrice)}<sup>đ</sup></td>
                                    <td>{bill.paymentTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default AdminBillsDay;