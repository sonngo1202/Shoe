import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./style.css";

function Delivery(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const itemCarts = location.state?.itemCarts;
    const [totalPriceofSale, setTotalPriceofSale] = useState(0);
    const [vat, setVAT] = useState(0)
    const [name, setName] = useState(props.user ? props.user.name : '');
    const [phone, setPhone] = useState(props.user ? props.user.phone : '');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [commune, setCommune] = useState('');
    const [street, setStreet] = useState('');
    const [checkInput, setCheckInput] = useState(false)
    const [address, setAddress] = useState([]);
    const [districts, setDistricts] = useState([])

    useEffect(() => {
        fetch(`https://provinces.open-api.vn/api/?depth=3`)
            .then((resp) => resp.json())
            .then((data) => setAddress(data))
            .catch((err) => console.log(err))
    })

    useEffect(() => {
        { address.filter(add => add.name === city).map((ci) => setDistricts(ci.districts)) }
    }, [city])

    useEffect(() => {
        if (itemCarts) {
            let totalPriceofSale = 0;
            itemCarts.forEach(itemCart => {
                totalPriceofSale += (itemCart.pDetail.product.price * itemCart.amount * (100 - itemCart.pDetail.product.sale) / 100);
            });
            setTotalPriceofSale(totalPriceofSale);
            setVAT(totalPriceofSale * 10 / 100);
        }
    }, [itemCarts]);

    const onLogin = () => {
        if (!props.user) {
            navigate(`/login`, {
                state: { check: 1, itemCarts }
            })
        }
    }
    const onPay = () => {
        if (name === '' || phone === '' || city === '' || district === '' || commune === '' || street === '') {
            setCheckInput(true)
        } else {
            if (props.user) {
                navigate(`/payment`, {
                    state: { itemCarts, city, district, commune, street }
                })
            } else {
                navigate(`/payment`, {
                    state: { itemCarts, name, phone, city, district, commune, street }
                })
            }
        }
    }

    const Price = (price) => {
        const price_new = price * 1;
        return price_new.toLocaleString();
    }
    if (itemCarts) {
        return (
            <section class="delivery">
                <div class="container">
                    <div class="delivery-top-wrap">
                        <div class="delivery-top">
                            <div class="delivery-top-cart delivery-top-item">
                                <i class="fas fa-shopping-bag"></i>
                            </div>
                            <div class="delivery-top-address delivery-top-item">
                                <i class="	fas fa-map-marker-alt"></i>
                            </div>
                            <div class="delivery-top-payment delivery-top-item">
                                <i class="fas fa-money-check-alt"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="delivery-content row">
                        <div class="delivery-content-left">
                            <p>Vui lòng chọn địa chỉ giao dịch</p>
                            <button class="delivery-content-left-login row" onClick={onLogin}>
                                <i class="fas fa-sign-in-alt"></i>
                                <p>Đăng nhập (Nếu bạn đã có tài khoản)</p>
                            </button>
                            <div class="delivery-content-left-input-top row">
                                <div class="delivery-content-left-input-top-item">
                                    <label for="">Họ tên <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" value={name} readOnly={props.user ? true : false} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div class="delivery-content-left-input-top-item">
                                    <label for="">Điện thoại<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" value={phone} readOnly={props.user ? true : false} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div class="delivery-content-left-input-top-item">
                                    <label for="">Tỉnh/TP <span style={{ color: 'red' }}>*</span></label>
                                    <select onChange={(e) => setCity(e.target.value)}>
                                        <option value="">Chọn Tỉnh/Thành Phố</option>
                                        {address.map((ci) => (
                                            <option value={ci.name}>{ci.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class="delivery-content-left-input-top-item">
                                    <label for="">Quận/Huyện <span style={{ color: 'red' }}>*</span></label>
                                    <select onChange={(e) => setDistrict(e.target.value)}>
                                        <option value="">Chọn Quận/Huyện</option>
                                        {address.filter(add => add.name === city).map((ci) => (
                                            ci.districts.map((dis) => (
                                                <option value={dis.name}>{dis.name}</option>
                                            ))
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div class="delivery-content-left-input-bottom">
                                <label for="">Phường/Xã <span style={{ color: 'red' }}>*</span></label>
                                <select onChange={(e) => setCommune(e.target.value)}>
                                    <option value="">Chọn Phường/Xã</option>
                                    {districts.filter(dis => dis.name === district).map((dis) => (
                                            dis.wards.map((comm)=>(
                                                <option value={comm.name}>{comm.name}</option>
                                            ))
                                    ))}
                                </select>
                                <label for="">Địa chỉ <span style={{ color: 'red' }}>*</span></label>
                                <input type="text" onChange={(e) => setStreet(e.target.value)} />
                            </div>
                            {checkInput && <p style={{ color: 'red', marginTop: '20px' }}>Thông tin chưa đầy đủ! Hãy nhập đầy đủ thông tin</p>}
                            <div class="delivery-content-left-button row">
                                <a href="/cart"><i class="fa fa-reply" aria-hidden="true" style={{ paddingRight: '4px' }}></i><p>Quay lại giỏ hàng</p></a>
                                <button onClick={onPay}><p style={{ fontWeight: 'bold' }}>THANH TOÁN VÀ GIAO HÀNG</p></button>
                            </div>
                        </div>
                        <div class="delivery-content-right">
                            <table>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Giảm giá</th>
                                    <th>Số lượng</th>
                                    <th>Giá tiền</th>
                                </tr>
                                {itemCarts.map((itemCart) => (
                                    <tr>
                                        <td style={{ width: '50%' }}>{itemCart.pDetail.product.name}</td>
                                        <td>{itemCart.pDetail.product.sale}<span>%</span ></td>
                                        <td>{itemCart.amount}</td>
                                        <td><p>{Price(itemCart.pDetail.product.price * (100 - itemCart.pDetail.product.sale) / 100)} <sup>đ</sup></p></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td style={{ fontWeight: 'bold' }} colSpan={3}>Tổng</td>
                                    <td style={{ fontWeight: 'bold' }}><p>{Price(totalPriceofSale)}<sup>đ</sup></p></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold' }} colSpan={3}>Thuế VAT</td>
                                    <td style={{ fontWeight: 'bold' }}><p>{Price(vat)}<sup>đ</sup></p></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold' }} colSpan={3}>Tổng tiền hàng</td>
                                    <td style={{ fontWeight: 'bold' }}><p>{Price(vat + totalPriceofSale)}<sup>đ</sup></p></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else {
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
export default Delivery