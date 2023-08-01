import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./style.css";
import Dialog from "./Dialog";

function Payment(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const itemCarts = location.state?.itemCarts;
    const city = location.state?.city;
    const district = location.state?.district;
    const commune = location.state?.commune;
    const street = location.state?.street
    const itemBills = itemCarts.map(itemCart => {
        const totalPrice = itemCart.pDetail.product.price * itemCart.amount * (100 - itemCart.pDetail.product.sale) / 100;
        const price = itemCart.pDetail.product.price;
        return {
            ...itemCart,
            totalPrice: totalPrice,
            price : price
        };
    });
    const [totalPriceofSale, setTotalPriceofSale] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [currentTime, setCurrentTime] = useState("");
    const [vat, setVAT] = useState(0)
    const [total, setTotal] = useState(0)
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (itemCarts) {
            let totalPriceofSale = 0, totalAmount = 0;
            itemCarts.forEach(itemCart => {
                totalAmount += itemCart.amount;
                totalPriceofSale += (itemCart.pDetail.product.price * itemCart.amount * (100 - itemCart.pDetail.product.sale) / 100);
            });
            setTotalAmount(totalAmount);
            setTotalPriceofSale(totalPriceofSale);
            setVAT(totalPriceofSale * 10 / 100);
            setTotal(totalPriceofSale + totalPriceofSale * 10 / 100 + 30000);
        }
    }, [itemCarts]);

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const formattedTime = `${year}-${month}-${day}`;
            setCurrentTime(formattedTime);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const Price = (price) => {
        const price_new = price * 1;
        return price_new.toLocaleString();
    }

    const onBuy = () => {
        setShowDialog(true);
        let bill = {};
        if (props.user) {
            bill = {
                fee: 30000,
                paymentTime: currentTime,
                address: street + '-' + commune + '-' + district + '-' + city,
                tottalAmount: totalAmount,
                totalPrice: totalPriceofSale,
                cus: null,
                u: props.user,
                listItemBill: itemBills
            }
        } else {
            bill = {
                fee: 30000,
                paymentTime: currentTime,
                address: street + '-' + commune + '-' + district + '-' + city,
                tottalAmount: totalAmount,
                totalPrice: totalPriceofSale,
                cus: {
                    id: 0,
                    name: location.state?.name,
                    phone: location.state?.phone
                },
                u: null,
                listItemBill: itemBills
            }
        }
        console.log(bill)
        fetch('http://localhost:8080/bill/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bill)
        })
            .catch((err) => console.log(err))
        fetch(`http://localhost:8080/cart/deletes`,{
            method: 'POST',
        })
            .catch((err) => console.log(err))
    }

    const onCloseDialog = () => {
        setShowDialog(false);
        navigate(`/trang-chủ`);
    }


    if (itemCarts) {
        return (
            <section class="payment">
                <div class="container">
                    <div class="payment-top-wrap">
                        <div class="payment-top">
                            <div class="payment-top-cart payment-top-item">
                                <i class="fas fa-shopping-bag"></i>
                            </div>
                            <div class="payment-top-address payment-top-item">
                                <i class="	fas fa-map-marker-alt"></i>
                            </div>
                            <div class="payment-top-payment payment-top-item">
                                <i class="fas fa-money-check-alt"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="payment-content row">
                        <div class="payment-content-left">
                            <div class="payment-content-left-method-delivery">
                                <p style={{ fontWeight: 'bold' }}>Phương thức giao hàng</p>
                                <div class="payment-content-left-method-delivery-item">
                                    <input type="radio" checked />
                                    <label for="">Giao hàng chuyển phát nhanh</label>
                                </div>
                            </div>
                            <div class="payment-content-left-method-payment">
                                <p style={{ fontWeight: 'bold' }}>Phương thức thanh toán</p>
                                <p>Mọi giao dịch đều được bảo mật và mã hóa.Thông tin thẻ tín dụng sẽ không bao giờ được lưu lại</p>
                                <div class="payment-content-left-method-payment-item">
                                    <input name="thanhtoan" value="thanhtoan" type="radio" />
                                    <label for="">Thanh toán bằng thẻ tín dụng(OnePay)</label>
                                </div>
                                <div class="payment-content-left-method-payment-item-img">
                                    <img src="https://pubcdn.ivymoda.com/ivy2/images/1.png" alt="" />
                                </div>
                                <div class="payment-content-left-method-payment-item">
                                    <input name="thanhtoan" value="thanhtoan" type="radio" />
                                    <label for="">Thanh toán bằng thẻ ATM(OnePay)</label>
                                    <p>Hỗ trợ thanh toán online hơn 38 ngân hàng phổ biến Việt Nam</p>
                                </div>
                                <div class="payment-content-left-method-payment-item">
                                    <input name="thanhtoan" value="thanhtoan" type="radio" />
                                    <label for="">Thanh toán bằng Momo</label>
                                </div>
                                <div class="payment-content-left-method-payment-item">
                                    <input name="thanhtoan" value="thanhtoan" type="radio" />
                                    <label for="">Thanh toán khi giao hàng</label>
                                </div>
                            </div>
                        </div>
                        <div class="payment-content-right">
                            <div class="payment-content-right-total">
                                <table>
                                    <tr>
                                        <td style={{ fontSize: '20px' }} colSpan={3}>Tổng</td>
                                        <td style={{ fontSize: '20px', paddingLeft: '250px' }}><p>{Price(totalPriceofSale)}<sup>đ</sup></p></td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontSize: '20px', paddingTop: '20px' }} colSpan={3}>Thuế VAT</td>
                                        <td style={{ fontSize: '20px', paddingLeft: '250px', paddingTop: '20px' }}><p>{Price(vat)}<sup>đ</sup></p></td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontSize: '20px', paddingTop: '20px' }} colSpan={3}>Phí vận chuyển</td>
                                        <td style={{ fontSize: '20px', paddingLeft: '250px', paddingTop: '20px' }}><p>30.000<sup>đ</sup></p></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="payment-content-right-total">
                                <div class="row">
                                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Tổng cộng</p>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'red', paddingLeft: '290px' }}>{Price(total)}<sup>đ</sup></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="payment-content-right-payment">
                        <button onClick={onBuy}>TIẾP TỤC THANH TOÁN</button>
                    </div>
                </div>
                {showDialog && <Dialog mess="Bạn đã mua hàng thành công!" onClose={onCloseDialog} />}
            </section>
        );
    }
    else {
        return (
            <div className="not-found-container">
                <div className="not-found-content">
                    <h1 className="not-found-title">Trang không tìm thấy</h1>
                    <p className="not-found-message">
                        Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
                    </p>
                    <Link to="/trang-chủ" className="not-found-link">
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        );
    }
}

export default Payment;