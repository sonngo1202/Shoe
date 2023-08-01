import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Logup(props) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retype, setRetype] = useState("");
    const [checkLogup, setCheckLogup] = useState(false);
    const [checkLack, setCheckLack] = useState(false);
    const [checkPassword, setCheckPassWord] = useState(false);
    const data = {
        id: -1,
        name,
        dob,
        phone,
        email,
        password,
        position: ""
    }

    const onLogup = () => {
        if (name === "" || dob === "" || phone === "" || email === "" || password === "" || retype === "") setCheckLack(true);
        else if (retype !== password) {
            setCheckPassWord(true);
            setCheckLack(false);
        }
        else {
            setCheckLack(false)
            setCheckPassWord(false)
            fetch(`http://localhost:8080/logup`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .then((resp) => {
                    if (!resp.ok) {
                        setCheckLogup(true);
                        throw Error(resp.statusText);
                    }
                    return resp.json()
                })
                .then((user) => {
                    console.log(user)
                    localStorage.setItem('user', JSON.stringify(user));
                    navigate("/trang-chủ");
                })
                .catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        if (props.user) navigate(`/trang-chủ`)
    })

    return (
        <section class="logup">
            <div class="formLogup">
                <p align="center">ĐĂNG KÝ</p>
                <div class="logup-item">
                    <label>Họ tên<span style={{ color: 'red' }}>*</span>:</label> <br />
                    <input type="text" placeholder="Họ tên" onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="logup-item">
                    <label>Ngày sinh<span style={{ color: 'red' }}>*</span>:</label><br />
                    <input type="date" onChange={(e) => setDob(e.target.value)} />
                </div>
                <div class="logup-item">
                    <label>Số điện thoại<span style={{ color: 'red' }}>*</span>:</label><br />
                    <input type="text" placeholder="Số điện thoại" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div class="logup-item">
                    <label>Email<span style={{ color: 'red' }}>*</span>:</label> <br />
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="logup-item">
                    <label>Mật khẩu<span style={{ color: 'red' }}>*</span>:</label> <br />
                    <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div class="logup-item">
                    <label>Nhập lại mật khẩu<span style={{ color: 'red' }}>*</span>:</label> <br />
                    <input type="password" placeholder="Nhập lại mật khẩu" onChange={(e) => setRetype(e.target.value)} />
                </div>
                <div className="err-logup">
                    {checkLack && <p>Thông tin đăng ký chưa đầy đủ</p>}
                    {!checkLack && checkPassword && <p>Mật khẩu nhập lại không trùng khớp</p>}
                    {!checkLack && checkLogup && !checkPassword && <p>Tài khoản đã tồn tại</p>}
                </div>
                <div class="logup-button row">
                    <input type="submit" value="ĐĂNG KÝ" onClick={onLogup} />
                    <p>Bạn đã có tài khoản? <a href="/login">Đăng nhập ngay</a></p>
                </div>
            </div>
        </section>
    );
}
export default Logup;