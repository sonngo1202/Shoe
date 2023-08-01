import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Dialog from "./Dialog";

function Header(props) {
    const [categorys, setCategorys] = useState([]);
    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [retype, setRetype] = useState("");
    const [checkLack, setCheckLack] = useState(false);
    const [checkPassword, setCheckPassWord] = useState(false);
    const [checkRetype, setCheckRetype] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogErr, setShowDialogErr] = useState(false);
    const [key, setKey] = useState("");
    const navigate = useNavigate(); // sử dụng hook useNavigate
    const user = props.user;

    useEffect(() => {
        fetch("http://localhost:8080/header")
            .then((respone) => respone.json())
            .then((categorys) => {
                setCategorys(categorys)
            }
            )
            .catch((err) => console.log(err));
    }, []);

    const onSearch = (key) => {
        if (!key) {
            setShowDialogErr(true)
        } else {
            navigate(`/search/${key}`);
        }
    }

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate("/trang-chủ")
    }

    const onOpenDialog = () => {
        setShowDialog(true)
    }

    const onCloseDialog = () => {
        setShowDialogErr(false)
        setShowDialog(false);
        setCheckLack(false);
        setCheckRetype(false);
        setCheckPassWord(false);
    };

    const onChangePassword = () => {
        if (password === "" || passwordNew === "" || retype === "") setCheckLack(true);
        else if (passwordNew !== retype) {
            setCheckLack(false);
            setCheckRetype(true);
        }
        else if (password !== user.password) {
            setCheckLack(false);
            setCheckRetype(false);
            setCheckPassWord(true);
        }
        else {
            setCheckLack(false);
            setCheckRetype(false);
            setCheckPassWord(false);
            const data = { ...user, password: passwordNew }
            fetch(`http://localhost:8080/change-password`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .then((resp) => resp.json())
                .then((user) => {
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log(user);
                    setShowDialog(false);
                    window.confirm("Mật khẩu đã thay đổi thành công !")
                    navigate("/trang-chủ")
                })
                .catch((err) => console.log(err))
        }
    };

    useEffect(() => {
        setKey("");
    }, [props.location]);

    return (
        <><header>
            <div class="logo">
                <a href="/trang-chủ"><img src="https://admin.sonadezi.edu.vn/Uploads/files/2018-11/Bitis.png" alt="" width="45%" /></a>
            </div>
            <div class="menu">
                <li><a href="/trang-chủ">TRANG CHỦ</a></li>
                <li><a href="/collections/Nam">NAM</a>
                    <ul class="sub-menu">
                        {categorys.filter(category => category.sex === "nam").map(category => (
                            <li><a href={"/collections/Nam-" + encodeURIComponent(category.type)}>{category.type}</a></li>
                        ))}
                    </ul>
                </li>

                <li><a href="/collections/Nữ">NỮ</a>
                    <ul class="sub-menu">
                        {categorys.filter(category => category.sex === "nữ").map(category => (
                            <li><a href={"/collections/Nữ-" + encodeURIComponent(category.type)}>{category.type}</a></li>
                        ))}
                    </ul>
                </li>
                <li><a href="/collections/Trẻ Em">TRẺ EM</a>
                    <ul class="sub-menu">
                        {categorys.filter(category => category.sex === "trẻ em").map(category => (
                            <li><a href={"/collections/Trẻ Em-" + encodeURIComponent(category.type)}>{category.type}</a></li>
                        ))}
                    </ul>
                </li>
                <li><a href={"/collections/Sale"}>SALE</a></li>
                <li><a href="/bills">ĐƠN HÀNG</a></li>
                <li><a href="/infomation">THÔNG TIN</a></li>
            </div>
            <div class="others">
                <li>
                    <input type="text" placeholder="tìm kiếm" onChange={(e) => setKey(e.target.value)} />
                    <button class="fas fa-search" onClick={() => onSearch(key)}></button>
                </li>
                <li>
                    {user && <button onClick={onOpenDialog}>{user.name}</button>}
                    {!user && <a href="/login">Đăng nhập</a>}
                </li>
                <li>
                    {!user && <a href="/logup">Đăng ký</a>}
                    {user && <button onClick={onLogout}>Đăng xuất</button>}
                </li>
                <li><a href="/cart">
                    <span>Giỏ hàng</span>
                    <i class="fas fa-shopping-bag"></i>
                </a></li>
            </div>
        </header>
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h3>Đổi mật khẩu</h3>
                        <label>Mật khẩu cũ:</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        <label>Mật khẩu mới:</label>
                        <input type="password" onChange={(e) => setPasswordNew(e.target.value)} />
                        <label>Nhập lại mật khẩu mới:</label>
                        <input type="password" onChange={(e) => setRetype(e.target.value)} />
                        <div className="err-changepassword">
                            {checkLack && <p>Thông tin đăng ký chưa đầy đủ</p>}
                            {!checkLack && checkRetype && <p>Mật khẩu nhập mới lại không trùng khớp</p>}
                            {!checkLack && !checkRetype && checkPassword && <p>Mật khẩu cũ chưa chính xác</p>}
                        </div>
                        <div className="dialog-content-button">
                            <button onClick={onChangePassword}>Xác nhận</button>
                            <button onClick={onCloseDialog}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
            {showDialogErr && (
                <Dialog mess="Hãy nhập từ khóa để tìm kiếm!" onClose={onCloseDialog}/>
            )}
        </>
    )
}
export default Header;
