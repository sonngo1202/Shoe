import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function handleClick() {
    this.classList.toggle("block");
}

function AdminStatByDay(props) {
    const [bills, setBills] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [st, setST] = useState();
    const [et, setET] = useState();
    const location = useLocation();
    const start = location.state?.st;
    const end = location.state?.et;

    const onViewClick = (day) => {
        navigate(`/admin/statByDay/bills/${day}`, {
            state: { st, et }
        })
    }

    const onStatClick = (st, et) => {
        const time = st + "," + et;
        fetch(`http://localhost:8080/admin/statByDay/${time}`)
            .then((respone) => respone.json())
            .then((data) => {
                setData(data)
                console.log(data)
            })
            .catch((err) => console.log(err));
    }

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
        if (start && end) {
            const time = start + ',' + end;
            fetch(`http://localhost:8080/admin/statByDay/${time}`)
                .then((respone) => respone.json())
                .then((data) => {
                    setData(data)
                })
                .catch((err) => console.log(err));
            setST(start);
            setET(end);
        }
    }, [])

    useEffect(() => {
        setBills(data);
    }, [data]);

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
                    <h1>Thống kê doanh thu theo ngày</h1>
                    <div className="formAdmin-right-center-content">
                        <div class="formAdmin-right-center-content-item">
                            <label>Thời gian bắt đầu:</label>
                            <input type="date" value={st}
                                onChange={(e) => {
                                    setST(e.target.value);
                                }}
                            />
                        </div>
                        <div class="formAdmin-right-center-content-item">
                            <label>Thời gian kết thúc:</label>
                            <input type="date" value={et}
                                onChange={(e) => {
                                    setET(e.target.value);
                                }}
                            />
                        </div>
                        <div class="formAdmin-right-center-content-item">
                            <button className="btn btn-warning" onClick={() => { onStatClick(st, et) }}>Thống kê</button>
                        </div>
                    </div>
                </div>
                {bills.length !== 0 ?
                    <div className="formAdmin-right-bottom">
                        <table className="formAdmin-right-bottom-table">
                            <thead className="formAdmin-right-bottom-table-thead">
                                <tr>
                                    <th>Day</th>
                                    <th>Total</th>
                                    <th>Revenue</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map((bill) => (
                                    <tr key={bill.paymentTime}>
                                        <td style={{ width: '20%' }}> {bill.day}</td>
                                        <td style={{ width: '10%' }}> {bill.amount}</td>
                                        <td style={{ fontWeight: 'bold' }}>{Price(bill.revenue)}<sup>đ</sup></td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => onViewClick(bill.day)}>Xem</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>:
                    <div className="formAdmin-right-bottom"></div>
                }
            </div>
        </div>
    )
}
export default AdminStatByDay;