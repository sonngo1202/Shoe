import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function handleClick() {
    this.classList.toggle("block");
}

function AdminForm(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const itemsliderbar = document.querySelectorAll(".formAdmin-left-item-button");
        itemsliderbar.forEach((menu) => {
            menu.addEventListener("click", handleClick);
            return () => {
                menu.removeEventListener("click", handleClick);
            };
        });
    }, []);

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
                    <p>Quản lý</p>
                </div>
                <div className="formAdmin-right-bottom">

                </div>
            </div>
        </div>
    )
}
export default AdminForm;