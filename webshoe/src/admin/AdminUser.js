import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function handleClick() {
    this.classList.toggle("block");
}

function AdminUser(props) {
    const params = useParams();
    const [user, setUser] = useState({});
    const [nameError, setNameError] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
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

        if (!user.name) {
            setNameError(true);
        }
        else if (!user.dob) {
            setDobError(true);
        }
        else if (!user.phone) {
            setPhoneError(true);
        }
        else if (!user.email) {
            setEmailError(true);
        }
        else if (!user.password) {
            setPasswordError(true);
        }
        else {
            setCheckEmail(false);
            fetch(`http://localhost:8080/admin/user/save/${id}`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.text())
                .then((data) => {
                    if (data == "duplication" && id < 0) setCheckEmail(true);
                    else {
                        console.log(data);
                        navigate(`/admin/users`);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8080/admin/user/${id}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
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
                    <h1>{id <= 0 ? "Thêm Admin" : `User ${id}`}</h1>
                </div>
                <div className="formAdmin-right-bottom">
                    <div class="formAdmin-right-bottom-user">
                        <div class="formAdmin-right-bottom-user-row">
                            <div class="formAdmin-right-bottom-user-item">
                                <label>ID</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={user.id ? user.id : 0}
                                    disabled
                                />
                            </div>
                            <div class="formAdmin-right-bottom-user-item">
                                <label>Name</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={user.name ? user.name : ""}
                                    onChange={(e) => {
                                        setUser({ ...user, name: e.target.value });
                                        setNameError(false);
                                    }}
                                    disabled={id > 0}
                                />
                                {nameError && <p style={{ color: "red" }}>Name not null</p>}
                            </div>
                        </div>
                        <div class="formAdmin-right-bottom-user-row">
                            <div class="formAdmin-right-bottom-user-item">
                                <label>Day of Birth</label><span>*</span><br />
                                <input
                                    type="Date"
                                    value={user.dob}
                                    onChange={(e) => {
                                        setUser({ ...user, dob: e.target.value });
                                        setDobError(false);
                                    }}
                                    disabled={id > 0}
                                />
                                {dobError && <p style={{ color: "red" }}>Day of Birth not null</p>}
                            </div>
                            <div class="formAdmin-right-bottom-user-item">
                                <label>Phone</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={user.phone ? user.phone : ""}
                                    onChange={(e) => {
                                        setUser({ ...user, phone: e.target.value });
                                        setPhoneError(false);
                                    }}
                                    disabled={id > 0}
                                />
                                {phoneError && <p style={{ color: "red" }}>Phone not null</p>}
                            </div>
                        </div>
                        <div class="formAdmin-right-bottom-user-row">
                            <div class="formAdmin-right-bottom-user-item">
                                <label>Email</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={user.email ? user.email : ""}
                                    onChange={(e) => {
                                        setUser({ ...user, email: e.target.value });
                                        setEmailError(false);
                                        setCheckEmail(false);
                                    }}
                                    disabled={id > 0}
                                />
                                {emailError && <p style={{ color: "red" }}>Email not null</p>}
                                {checkEmail && <p style={{ color: "red" }}>Email da ton tai</p>}
                            </div>
                            <div class="formAdmin-right-bottom-user-item">
                                <label>Password</label><span>*</span><br />
                                <input
                                    type="text"
                                    value={user.password ? user.password : ""}
                                    onChange={(e) => {
                                        setUser({ ...user, password: e.target.value });
                                        setPasswordError(false);
                                    }}
                                />
                                {passwordError && <p style={{ color: "red" }}>Password not null</p>}
                            </div>
                        </div>
                        <div class="formAdmin-right-bottom-user-item">
                            <label>Position</label><span>*</span><br />
                            <input
                                type="text"
                                value={id > 0 ? user.position : "Admin"}
                                disabled="disabled"
                            />
                        </div>
                        <div class="formAdmin-right-bottom-user-item">
                            <button onClick={onSaveClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminUser;