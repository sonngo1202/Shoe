import React, { useState, useEffect } from "react";
import "./style.css";

function Bill(props) {
    const [buyed, setBuyed] = useState(true);
    const [check, setCheck] = useState(false);
    const [data, setData] = useState([]);
    const [bills, setBills] = useState([]);
    const [phone, setPhone] = useState(props.user ? props.user?.phone : "");
    const [phoneErr, setPhoneErr] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [idB, setIdB] = useState();

    useEffect(() => {
        if (props.user) {
            if (buyed) {
                fetch(`http://localhost:8080/billed/user/${props.user.id}`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        setData(data)
                    })
                    .catch((err) => console.log(err))
            } else {
                fetch(`http://localhost:8080/bills/user/${props.user.id}`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        setData(data)
                    })
                    .catch((err) => console.log(err))
            }
        }
    }, [buyed])

    useEffect(() => {
        setBills(data)
    }, [data])

    useEffect(() => {
        setPhoneErr(false)
        const inputItems = document.querySelectorAll(".checkbill-input-item input");
        inputItems.forEach((input) => {
            input.style.borderColor = "#ced4da";
        });
    }, [phone])

    const onBuyed = () => {
        document.querySelector(".damua").style.color = "black";
        document.querySelector(".dangcho").style.color = "dimgrey";
        setBuyed(true);
        if (check) {
            fetch(`http://localhost:8080/billed/cus/${phone}`)
                .then((resp) => resp.json())
                .then((data) => setData(data))
                .catch((err) => console.log(err))
        }
    }

    const onWait = () => {
        document.querySelector(".dangcho").style.color = "black";
        document.querySelector(".damua").style.color = "dimgrey";
        setBuyed(false);
        if (check) {
            fetch(`http://localhost:8080/bills/cus/${phone}`)
                .then((resp) => resp.json())
                .then((data) => setData(data))
                .catch((err) => console.log(err))
        }
    }

    const onCheck = () => {
        if (!props.user) {
            if (phone === '') {
                const inputItems = document.querySelectorAll(".checkbill-input-item input");
                inputItems.forEach((input) => {
                    input.style.borderColor = "red";
                });
                setPhoneErr(true);
                setData([])
                setCheck(false)
            }
            else {
                if (buyed) {
                    fetch(`http://localhost:8080/billed/cus/${phone}`)
                        .then((resp) => resp.json())
                        .then((data) => setData(data))
                        .catch((err) => console.log(err))
                } else {
                    fetch(`http://localhost:8080/bills/cus/${phone}`)
                        .then((resp) => resp.json())
                        .then((data) => setData(data))
                        .catch((err) => console.log(err))
                }
                setCheck(true);
            }
        }
    }

    const onCancel = (idB) => {
        setShowDialog(true);
        setIdB(idB);
    }

    const onCloseDialog=()=>{
        setShowDialog(false);
    }
    
    const onConfirm=()=>{
        fetch(`http://localhost:8080/bill/delete`, {
            method: "DELETE",
            body: JSON.stringify(idB),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
            .then(() => {
                if (props.user) {
                    fetch(`http://localhost:8080/bills/user/${props.user.id}`)
                        .then((resp) => resp.json())
                        .then((data) => {
                            setData(data)
                        })
                        .catch((err) => console.log(err))
                } else {
                    fetch(`http://localhost:8080/bills/cus/${phone}`)
                        .then((resp) => resp.json())
                        .then((data) => setData(data))
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err))
        setShowDialog(false)
    }

    const Price = (price) => {
        const price_new = price * 1;
        return price_new.toLocaleString();
    }

    return (
        <section>
            <div class="checkbill-selectmethod">
                <button class="damua" onClick={onBuyed}>ĐÃ MUA</button>
                <button class="dangcho" onClick={onWait}>ĐANG CHỜ</button>
            </div>
            <div class="checkbill-title">
                <h1>{buyed ? 'Tra cứu đơn hàng đã mua' : 'Tra cứu tình trạng đơn hàng'}</h1>
                <p style={{ color: 'red' }}>(Dành cho đơn hàng Online!)</p>
                <p>Điền các thông tin bên dưới để tra cứu tình trạng đơn hàng</p>
            </div>
            <div class="checkbill-input">
                <div class="checkbill-input-item">
                    <label>Số điện thoại</label><br />
                    <input type="text" pattern="[0-9]*" value={phone} readOnly={props.user ? true : false} onChange={(e) => setPhone(e.target.value)} />
                    {phoneErr && <p class="Err">Vui lòng điền số điện thoại</p>}
                </div>
                <button onClick={onCheck}>KIỂM TRA</button>
            </div>
            {((check && !phoneErr) || props.user) && bills.length!==0 ? <div class="checkbill-content">
                <table>
                    <tr>
                        <th>NGÀY</th>
                        <th>ThÔNG TIN ĐƠN HÀNG</th>
                        {!buyed && <th>HỦY</th>}
                    </tr>
                    {bills.map((bill) => (
                        <tr>
                            <td>{bill.paymentTime}</td>
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
                            {!buyed && <td><button onClick={() => onCancel(bill.id)}><span>x</span></button></td>}
                        </tr>
                    ))}
                </table>
            </div> : <div class="checkbill-contenta">
                {!phoneErr && phone !== '' && <p>Không tìm thấy đơn hàng</p>}
                </div>}
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-content" style={{width:'27%'}}>
                        <h3>Bạn có chắc muốn hủy đơn hàng ?</h3>
                        <div className="dialog-content-button">
                            <button onClick={onConfirm}>Xác nhận</button>
                            <button onClick={onCloseDialog}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
export default Bill;