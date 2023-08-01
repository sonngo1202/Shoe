import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Cart(props) {
    const [itemCarts, setItemCarts] = useState([]);
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showDialog, setShowDialog] = useState(false)
    const [showDialogMess, setShowDialogMess] = useState(false)
    const [id, setId] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/cart')
            .then((res) => res.json())
            .then((data) => setItemCarts(data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        let totalAmount = 0, totalPrice = 0;
        itemCarts.forEach(itemCart => {
            totalAmount += itemCart.amount;
            totalPrice += (itemCart.pDetail.product.price * itemCart.amount * (100 - itemCart.pDetail.product.sale) / 100);
        });
        setTotalAmount(totalAmount);
        setTotalPrice(totalPrice);
    }, [itemCarts]);

    const onDeleteProduct = (idPD) => {
        setShowDialog(true);
       setId(idPD)
    }

    const onCloseDialog = () => {
        setShowDialog(false);
        setShowDialogMess(false);
    };

    const onConfirm = () => {
        setShowDialog(false)
        fetch(`http://localhost:8080/cart/delete/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                fetch('http://localhost:8080/cart')
                    .then((res) => res.json())
                    .then((data) => setItemCarts(data))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    const Price = (price) => {
        const price_new = price * 1;
        return price_new.toLocaleString();
    }

    const updateItemCart = (updatedItemCart) => {
        fetch(`http://localhost:8080/cart/update`, {
            method: "POST",
            body: JSON.stringify(updatedItemCart),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
            .then(() => {
                fetch('http://localhost:8080/cart')
                    .then((res) => res.json())
                    .then((data) => setItemCarts(data))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    const onContinue = () => {
        navigate("/collections")
    }

    const onDelivery = () => {
        if (itemCarts.length > 0) {
            navigate("/delivery", {
                state: { itemCarts }
            })
        }
        else {
            setShowDialogMess(true);
        }
    }

    const onPlus = (itemCart) => {
        if (itemCart.amount < itemCart.pDetail.quantity) {
            const updatedItemCart = { ...itemCart, amount: itemCart.amount + 1 };
            updateItemCart(updatedItemCart);
        }
    }

    const onSub = (itemCart) => {
        if (itemCart.amount > 1) {
            const updatedItemCart = { ...itemCart, amount: itemCart.amount - 1 };
            updateItemCart(updatedItemCart);
        }
    }

    return (
        <section class="cart">
            <div class="container">
                <div class="cart-top-wrap">
                    <div class="cart-top">
                        <div class="cart-top-cart cart-top-item">
                            <i class="fas fa-shopping-bag"></i>
                        </div>
                        <div class="cart-top-address cart-top-item">
                            <i class="	fas fa-map-marker-alt"></i>
                        </div>
                        <div class="cart-top-payment cart-top-item">
                            <i class="fas fa-money-check-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="cart-content row">
                    <div class="cart-content-left">
                        <table>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Size</th>
                                <th>Số Lượng</th>
                                <th>Giá tiền</th>
                                <th>Xóa</th>
                            </tr>
                            {itemCarts.map((itemCart) => (
                                <tr>
                                    <td><img src={itemCart.pDetail.product.imageMain} /></td>
                                    <td><p>{itemCart.pDetail.product.name}</p></td>
                                    <td><p style={{ fontSize: '16px' }}>{itemCart.pDetail.size}</p></td>
                                    <td>
                                        <button style={{ width: '25px', height: '25px', backgroundColor: '#ffffff', border: '1px solid #f3f4f4' }} onClick={() => onSub(itemCart)}> - </button>
                                        <input
                                            style={{
                                                width: '25px',
                                                height: '25px',
                                                padding: '1px',
                                                textAlign: 'center',
                                                border: '1px solid #f3f4f4',
                                                backgroundColor: '#ffffff'
                                            }}
                                            type="text"
                                            pattern="[0-9]*"
                                            disabled
                                            value={itemCart.amount}
                                        />
                                        <button style={{ width: '25px', height: '25px', backgroundColor: '#ffffff', border: '1px solid #f3f4f4' }} onClick={() => onPlus(itemCart)}> + </button>
                                    </td>
                                    <td>
                                        {itemCart.pDetail.product.sale != 0 && <p style={{ fontSize: '16px', textDecorationLine: 'line-through' }}>{Price(itemCart.pDetail.product.price)}<sup>đ</sup></p>}
                                        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{Price(itemCart.pDetail.product.price * (100 - itemCart.pDetail.product.sale) / 100)}<sup>đ</sup></p>
                                    </td>
                                    <td><button style={{ border: 'none' }} onClick={() => onDeleteProduct(itemCart.pDetail.id)}>
                                        <span style={{ border: 'none', fontSize: '16px', backgroundColor: '#fff', fontWeight: 'bold' }}>X</span>
                                    </button></td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    <div class="cart-content-right">
                        <table>
                            <tr><th colspan="2">TỔNG TIỀN GIỎ HÀNG</th> </tr>
                            <tr>
                                <td>TỔNG SẢN PHẨM</td>
                                <td style={{ fontSize: '18px', fontWeight: 'bold' }}>{totalAmount}</td>
                            </tr>
                            <tr>
                                <td>TỔNG TIỀN HÀNG</td>
                                <td><p style={{ fontSize: '18px', fontWeight: 'bold' }}>{Price(totalPrice)}<sup>đ</sup></p></td>
                            </tr>
                            <tr>
                                <td>TẠM TÍNH</td>
                                <td><p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>{Price(totalPrice)}<sup>đ</sup></p></td>
                            </tr>
                        </table>
                        <div class="cart-content-right-text">
                            <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
                            <p>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>
                        </div>
                        <div class="cart-content-right-button">
                            <button onClick={onContinue}>TIẾP TỤC MUA SẮM</button>
                            <button onClick={onDelivery}>THANH TOÁN</button>
                        </div>
                    </div>
                </div>
            </div>
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-content" style={{width:'27%'}}>
                        <h3>Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng ?</h3>
                        <div className="dialog-content-button">
                            <button onClick={onConfirm}>Xác nhận</button>
                            <button onClick={onCloseDialog}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
            {showDialogMess && (
                <div className="dialog">
                    <div className="dialog-content" style={{width:'28%'}}>
                        <h3>Hãy thêm một số sản phẩm vào giỏ để thanh toán!</h3>
                        <div className="dialog-content-button">
                            <button onClick={onContinue}>Mua sắm</button>
                            <button onClick={onCloseDialog}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
export default Cart;