import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

function Login(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkLogin, setCheckLogin] = useState(false);
    const data = {
        id: -1,
        name: "",
        dob: "",
        phone: "",
        email,
        password,
        position: ""
    }
    const itemCarts = location.state?.itemCarts;
    const check = location.state?.check;

    const onLogin = () => {
        fetch(`http://localhost:8080/checkLogin`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=ISO-8859-1",
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    setCheckLogin(true)
                    throw Error(resp.statusText);
                }
                return resp.json()
            })
            .then((user) => {
                console.log(user)
                localStorage.setItem('user', JSON.stringify(user));
                if (!check) {
                    if (user.position === "User") {
                        navigate("/trang-chủ");
                    }
                    else {
                        navigate("/admin");
                    }
                }else navigate("/delivery", {
                    state : {itemCarts}
                })
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (props.user) navigate(`/trang-chủ`)
    })

    return (
        <section class="login">
            <div class="formLogin">
                <p align="center">ĐĂNG NHẬP</p>
                <div class="login-item">
                    <label>Email:</label> <br />
                    <input type="text" placeholder={" Vui lòng nhập email của bạn"} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="login-item">
                    <label>Mật khẩu:</label> <br />
                    <input type="password" placeholder={" Vui lòng nhập mật khẩu của bạn"} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div class="err-login">
                    {checkLogin && <p>Email hoặc mật khẩu không chính xác</p>}
                </div>
                <div class="login-button row">
                    <input type="submit" value="ĐĂNG NHẬP" onClick={onLogin} />
                    <p>Bạn chưa có tài khoản? <a href="/logup">Đăng ký ngay</a></p>
                </div>
            </div>
        </section>
    );
}
export default Login;