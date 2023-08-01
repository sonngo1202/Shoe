import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function handleClick() {
    this.classList.toggle("block");
}

function AdminListUser(props) {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const navigate = useNavigate()

    const onViewClick = (id) => {
        navigate(`/admin/user/${id}`)
    }

    const onLogout=()=>{
        localStorage.removeItem('user');
        navigate("/trang-chủ")
    }

    const onManager = () =>{
        navigate("/admin/bill")
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
        fetch("http://localhost:8080/admin/users")
            .then((respone) => respone.json())
            .then((data) => {
                setData(data)
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        setUsers(data);
    }, [data]);

    useEffect(() => {
        setUsers(
            data.filter(
                (user) =>
                    user.name.toLowerCase().includes(text.toLowerCase())
            )
        );
    }, [text]);
    console.log(text);

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
                    <h1>Danh sách khách hàng đăng ký</h1>
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
                                setText(e.target.value);
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
                                <th>Day of Birth</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Position</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td> {user.id}</td>
                                    <td> {user.name}</td>
                                    <td>{user.dob}</td>
                                    <td>{user.phone}</td>
                                    <td> {user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.position}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => onViewClick(user.id)}>Xem</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default AdminListUser;