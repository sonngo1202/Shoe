import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import Dialog from "./Dialog";

function handleClick() {
    document.querySelector(".product-content-right-product-bottom-content-big").classList.toggle("activeB");
}
function Product(props) {
    const [productdetail, setProductDetail] = useState([]);
    const [size, setSize] = useState({});
    const [card, setCard] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [checkSelectSize, setCheckSelectSize] = useState(true);
    const [message, setMessage] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state.product;
    const cate = location.state.cate;

    useEffect(() => {
        fetch(`http://localhost:8080/size/${product.id}`)
            .then((respone) => respone.json())
            .then((data) => setProductDetail(data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/card/${product.id}`)
            .then((resp => resp.json()))
            .then((card) => setCard(card))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        const bigImg = document.querySelector(".product-content-left-big-img img")
        const smallImg = document.querySelectorAll(".product-content-left-small-img img")
        smallImg.forEach(function (imgItem, X) {
            imgItem.addEventListener("click", function () {
                bigImg.src = imgItem.src
            })
        })
        const chitiet = document.querySelector(".chitiet")
        const baoquan = document.querySelector(".baoquan")
        const chinhsachdoisize = document.querySelector(".chinhsachdoisize")
        if (chitiet) {
            chitiet.addEventListener("click", function () {
                document.querySelector(".chitiet").style.fontWeight = "bold"
                document.querySelector(".baoquan").style.fontWeight = "normal"
                document.querySelector(".chinhsachdoisize").style.fontWeight = "normal"
                document.querySelector(".product-content-right-product-bottom-content-chitiet").style.display = "block"
                document.querySelector(".product-content-right-product-bottom-content-baoquan").style.display = "none"
                document.querySelector(".product-content-right-product-bottom-content-chinhsachdoisize").style.display = "none"
            })
        }
        if (baoquan) {
            baoquan.addEventListener("click", function () {
                document.querySelector(".chitiet").style.fontWeight = "normal"
                document.querySelector(".baoquan").style.fontWeight = "bold"
                document.querySelector(".chinhsachdoisize").style.fontWeight = "normal"
                document.querySelector(".product-content-right-product-bottom-content-chitiet").style.display = "none"
                document.querySelector(".product-content-right-product-bottom-content-baoquan").style.display = "block"
                document.querySelector(".product-content-right-product-bottom-content-chinhsachdoisize").style.display = "none"
            })
        }
        if (chinhsachdoisize) {
            chinhsachdoisize.addEventListener("click", function () {
                document.querySelector(".chitiet").style.fontWeight = "normal"
                document.querySelector(".baoquan").style.fontWeight = "normal"
                document.querySelector(".chinhsachdoisize").style.fontWeight = "bold"
                document.querySelector(".product-content-right-product-bottom-content-chitiet").style.display = "none"
                document.querySelector(".product-content-right-product-bottom-content-baoquan").style.display = "none"
                document.querySelector(".product-content-right-product-bottom-content-chinhsachdoisize").style.display = "block"
            })
        }
        const butTon = document.querySelector(".product-content-right-product-bottom-top")
        if (butTon) {
            return () => {
                butTon.addEventListener("click", handleClick)
            }
        }
    }, [])

    const onSizeChange = (size) => {
        setSize(size);
        setCheckSelectSize(false);
    };

    const onAddCart = () => {
        if (!checkSelectSize) {
            const itemCart = {
                amount: quantity,
                pDetail: {
                    id: size.id,
                    quantity: size.quantity,
                    size: size.size,
                    product: product
                }
            };
            fetch(`http://localhost:8080/cart/add`, {
                method: "POST",
                body: JSON.stringify(itemCart),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
                .catch((err) => console.log(err));
            setShowDialog(true);

        }
        else setMessage(true);
    }

    const onByProduct = async() => {
        if (!checkSelectSize) {
            const itemCart = {
                amount: quantity,
                pDetail: {
                    id: size.id,
                    quantity: size.quantity,
                    size: size.size,
                    product: product
                }
            };
            try {
                const response = await fetch(`http://localhost:8080/cart/add`, {
                    method: "POST",
                    body: JSON.stringify(itemCart),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                });
                if (response.ok) {
                    // Fetch hoàn thành thành công
                    navigate(`/cart`);
                } else {
                    // Xử lý khi có lỗi trong phản hồi
                    console.log("Có lỗi xảy ra trong quá trình thêm vào giỏ hàng");
                }
            } catch (error) {
                // Xử lý khi có lỗi trong quá trình gửi yêu cầu
                console.log(error);
            }
        }
        else setMessage(true);
    }

const onProduct = (product) => {
    navigate(`/product/${product.name}`, { state: { product, cate: 'Sản phẩm' } });
}

const onPlus = () => {
    if (quantity < size.quantity) {
        setQuantity(quantity + 1)
    }
}

const onSub = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1)
    }
}

const Price = (price) => {
    const price_new = price * 1;
    return price_new.toLocaleString();
}

const onCloseDialog = () => {
    setShowDialog(false);
}

return (
    <><section class="product">
        <div class="contaner">
            <div class="product-top row">
                <p>TRANG CHỦ <span>&#8594;</span> {cate} <span>&#8594;</span>{product.name}</p>
            </div>
            <div class="product-content row">
                <div class="product-content-left row">
                    <div class="product-content-left-big-img">
                        <img src={product.imageMain} />
                    </div>
                    <div class="product-content-left-small-img">
                        <img src={product.imageMain} />
                        <img src={product.imageGallery1} />
                        <img src={product.imageGallery2} />
                        <img src={product.imageGallery3} />
                    </div>
                </div>
                <div class="product-content-right">
                    <div class="product-content-right-product-name">
                        <h1>{product.name}</h1>
                    </div>
                    <div class="product-content-right-product-price row">
                        {product.sale != 0 && <p style={{ textDecorationLine: 'line-through', marginRight: '30px' }}>{Price(product.price)}<sup>đ</sup></p>}
                        <p style={{ color: 'red' }}>{Price(product.price * (100 - product.sale) / 100)}<sup>đ</sup></p>
                    </div>
                    <div class="product-content-right-product-status">
                        {!checkSelectSize && <p><span style={{ fontWeight: 'bold' }}>Tình trạng</span>: Còn hàng ({size.quantity})<span style={{ color: 'red' }}>*</span></p>}
                    </div>
                    <div class="product-content-right-product-color-size">
                        <p style={{ fontWeight: 'bold' }}>Size:</p>
                        <div class="size">
                            {productdetail.map((detail) => (
                                <button className={size == detail ? "selected" : ""} key={detail} onClick={() => onSizeChange(detail)} disabled={detail.quantity == 0 ? 'disabled' : ''}>
                                    {detail.size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div class="quantity">
                        <p style={{ fontWeight: 'bold' }}>Số lượng:</p>
                        <button style={{ width: '25px', height: '25px', backgroundColor: '#ffffff', border: '1px solid #f3f4f4' }} onClick={onSub}> - </button>
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
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button style={{ width: '25px', height: '25px', backgroundColor: '#ffffff', border: '1px solid #f3f4f4' }} onClick={onPlus}> + </button>
                    </div>
                    {message && checkSelectSize && <p style={{ color: 'red' }}>Vui lòng chọn size</p>}
                    <div class="product-content-right-product-button">
                        <button onClick={onByProduct}><i class="fa fa-shopping-cart"></i>
                            MUA HÀNG
                        </button>
                        <button onClick={onAddCart}>
                            THÊM VÀO GIỎ HÀNG
                        </button>
                    </div>
                    <div class="product-content-right-product-icon">
                        <div class="product-content-right-product-icon-item">
                            <i class="fa fa-phone"></i>
                            <p>Hotline</p>
                        </div>
                        <div class="product-content-right-product-icon-item">
                            <i class="fa fa-comment"></i>
                            <p>Chat</p>
                        </div>
                        <div class="product-content-right-product-icon-item">
                            <i class="fa fa-envelope"></i>
                            <p>Mail</p>
                        </div>
                    </div>
                    <div class="product-content-right-product-QR">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQct2onGPHJWABPaVcB8MyTWbxxsQeZouFJQCu0yzslIJT9jDdh2VIBBT0&usqp=CAU" />
                    </div>
                    <div class="product-content-right-product-bottom">
                        <div class="product-content-right-product-bottom-top">
                            &#8744;
                        </div>
                        <div class="product-content-right-product-bottom-content-big">
                            <div class="product-content-right-product-bottom-content-title row">
                                <div class="product-content-right-product-bottom-content-title-item chitiet">
                                    <p>Chi tiết</p>
                                </div>
                                <div class="product-content-right-product-bottom-content-title-item baoquan">
                                    <p>Bảo quản</p>
                                </div>
                                <div class="product-content-right-product-bottom-content-title-item chinhsachdoisize">
                                    <p>Chính sách đổi size</p>
                                </div>
                            </div>
                            <div class="product-content-right-product-bottom-content">
                                <div class="product-content-right-product-bottom-content-chitiet">
                                    Valentine này, cùng Biti’s Hunter khám phá những trải nghiệm thật đẹp của tình yêu,
                                    của OTP chính mình với BST Dune – OTP Real Black/ White edition <br /> <br />
                                    💥 FORM CHUNKY GỌN CHÂN, nâng chiều cao thêm 6cm để dễ HUN-tér hơn nè <br /><br />

                                    💥 ĐẾ LITEFLEX 3.0 CAO-ÊM-COOL tôn dáng, thời thượng, sẵn sàng cùng trải
                                    nghiệm mọi hoạt động trong tình yêu <br /><br />

                                    💥 MŨ QUAI/ PHẦN THÂN TRÊN SI NUBUCKS phong cách, thời thượng, dễ dàng
                                    mix-match cho mọi món đồ đôi <br /><br />

                                    💥 LÓT ĐẾ ÊM ÁI O-FOAM ép 3D với 6 điểm massage để bên nhau nhiều ngày nhiều “5”
                                    vẫn thoải mái <br /><br />

                                    💥 ĐẾ SƠN CHUYỂN NHIỀU MÀU tôn vinh mọi cá tính cá nhân, mọi sắc thái của
                                    tình yêu đôi lứa <br /><br />

                                    - Có dây buộc <br /><br />

                                    - Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể
                                    chênh lệch khoảng 3-5%. <br />
                                </div>
                                <div class="product-content-right-product-bottom-content-baoquan">
                                    Chưa có nội dung <br />
                                </div>
                                <div class="product-content-right-product-bottom-content-chinhsachdoisize">
                                    <ul>
                                        <li><b>1. Đổi kích cỡ giày</b><br /><br />

                                            <u>Điều kiện:</u><br /><br />

                                            Sản phẩm còn mới 100% chưa qua sử dụng hoặc giặt tẩy, nguyên phiếu bảo hành,
                                            tem nhãn sản phẩm, không bị dơ bẩn, trầy xước.<br />
                                            Khách hàng phải có hoá đơn giao hàng (phiếu giao hàng, email xác nhận đơn
                                            hàng).<br />
                                            Trong vòng 7 ngày kể từ ngày nhận hàng.<br />
                                            Áp dụng 01 sản phẩm được đổi lệch 01 size so với size đã mua và được đổi 01
                                            lần.<br />
                                            Không hỗ trợ đối với những sản phẩm có thông báo: không áp dụng đổi trả -
                                            bảo hành.<br />
                                            Không hỗ trợ đổi mẫu theo nhu cầu.<br />
                                            Không hỗ trợ trả hàng hoàn tiền.<br /> <br />
                                            <u>Địa điểm:</u><br /><br />

                                            Đối với đổi size: Tại tất cả các cửa hàng tiếp thị của Biti’s trên toàn quốc
                                            (nếu có sản phẩm và còn kích cỡ). Danh sách cửa hàng tiếp thị tại đây. Thời
                                            gian hỗ trợ từ 14h00 - 20h00 các ngày trong tuần.<br />
                                            Đối với đổi size/ đổi màu/ đổi mẫu khi hết size: Gửi về trung tâm giao hàng
                                            Biti’s tại địa chỉ: 95/6 Trần Văn Kiểu, Phường 10, Quận 6. Thời gian hỗ trợ
                                            đổi size tại kho từ 09h00-11h00 & 14h00 - 16h00 (Thứ 3 - Thứ 7).<br /> <br />
                                            <u>Lưu ý:</u><br /><br />

                                            Khách hàng chỉ được đổi chênh lệch 1 kích cỡ so với kích cỡ ban đầu.
                                            Ví dụ: Mẫu Hunter X2 màu đen kích cỡ 40 hết, kích cỡ cần đổi sẽ được đổi
                                            sang Hunter X2 màu đỏ kích cỡ tương ứng. Kích cỡ 40 được chấp nhận đổi sang
                                            39 (Giảm 1 size) hoặc 41 (Tăng 1 size).
                                            Chỉ áp dụng đổi sang sản phẩm khác trong trường hợp đã hết size, hết màu của
                                            sản phẩm cần đổi, sản phẩm mới phải có giá trị lớn hơn hoặc bằng sản phẩm
                                            trước đó (khách hàng sẽ bù tiền chênh lệch nếu giá trị cao hơn và sẽ không
                                            được hoàn lại tiền chênh lệch nếu giá trị thấp hơn).<br />
                                        </li><br />
                                        <li><b>2. Đổi trả hàng khi sản phẩm lỗi</b><br /><br />

                                            Kiểm tra điều kiện hoàn trả hàng bên dưới.<br />
                                            Đóng gói sản phẩm và tất cả phụ kiệm kèm theo về trung tâm giao hàng Biti's
                                            như hướng dẫn.<br />
                                            Nhận sản phẩm mới.<br /><br />
                                            <u>Địa điểm:</u><br /><br />

                                            Khi Biti’s giao nhầm màu, nhầm kích cỡ, nhầm sản phẩm hoặc sản phẩm bị hư
                                            hỏng do nhà sản xuất. Khách hàng gửi các hình ảnh sản phẩm nhận được kèm mã
                                            đơn hàng đến email: tuvan_online@bitis.com.vn để được bộ phận tư vấn hỗ
                                            trợ.<br />
                                            Sản phẩm cần đổi còn mới 100% chưa qua sử dụng hoặc giặt tẩy, nguyên phiếu
                                            bảo hành, tem nhãn sản phẩm, không bị dơ bẩn, trầy xước, đầy đủ bao bì, túi
                                            hộp (nếu có).<br />
                                            Khách hàng phải có hoá đơn giao hàng (phiếu giao hàng, email xác nhận đơn
                                            hàng).<br />
                                            Trong vòng 7 ngày kể từ ngày nhận hàng.<br />
                                            Trừ trường hợp được quyền đổi hàng như trên, Biti's không nhận xử lý các vấn
                                            đề khác.<br /><br />
                                            <u>Lưu ý:</u><br /><br />

                                            Trường hợp sản phẩm lỗi gửi về Biti’s để đổi lại, thông tin hướng dẫn địa
                                            điểm cụ thể sẽ được bộ phận tư vấn cung cấp theo email mà khách hàng đã liên
                                            hệ.<br />
                                            Trường hợp sản phẩm lỗi cần đổi, khi gửi về đổi nhưng bị hết hàng, khách
                                            hàng có thể đổi sang sản phẩm khác có giá trị lớn hơn hoặc bằng sản phẩm
                                            trước đó (khách hàng sẽ bù tiền chênh lệch nếu giá trị cao hơn và sẽ không
                                            được hoàn lại tiền chênh lệch nếu giá trị thấp hơn).<br />
                                        </li><br />
                                        <li><b>3. Chi phí vận chuyển cho việc đổi kích cỡ và đổi hàng
                                            lỗi</b><br /><br />

                                            Trường hợp lỗi từ Biti’s giao sai thông tin sản phẩm (không đúng kích cỡ,
                                            không đúng sản phẩm), hư hỏng trong quá trình vận chuyển hoặc từ nhà sản
                                            xuất khách hàng được miễn phí hoàn toàn chi phí vận chuyển đổi hàng. Khách
                                            hàng gửi hàng về trong thời gian 7 ngày (không tính thứ 7, Chủ nhật) kể từ
                                            ngày nhận hàng, khách mang hàng ra bưu điện và chọn người nhận thanh
                                            toán.
                                        </li><br />
                                        Trường hợp lỗi do khách hàng trong việc đặt sai đơn hàng, Biti’s đã giao
                                        đúng sản phẩm theo thông tin trên đơn hàng đã đặt, chi phí vận chuyển hai
                                        chiều khi gửi đổi sẽ do khách hàng thanh toán.<br /><br />
                                        <li><b>4. Địa chỉ đổi size</b><br /><br />

                                            Trung tâm giao hàng Biti's.<br />

                                            Địa chỉ: Số 95/6 Trần Văn Kiểu Phường 10, Quận 6, TP. Hồ Chí Minh.<br />

                                            Email: tuvan_online@bitis.com.vn<br />

                                            Hotline tư vấn online: <span>0966 158 666</span><br />

                                            Website: www.bitis.com.vn hoặc facebook: www.facebook.com/bitis<br />
                                        </li><br />
                                        <li><b>5. Thời gian xử lý</b><br /><br />
                                            Sau khi nhận được sản phẩm gửi về, Biti’s sẽ kiểm tra và đổi trả hàng trong
                                            vòng 7 ngày làm việc.<br />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section><section class="product-card">
            <div class="product-card-title">
                <p>SẢN PHẨM lIÊN QUAN</p>
            </div>
            <div class="cartegory-card-content row">
                {card.map((product) => (
                    <div class="cartegory-card-content-item">
                        <button onClick={() => onProduct(product)}>
                            <img src={product.imageMain} />
                            <h1>{product.name}</h1>
                            <div class="cartegory-card-content-price row">
                                {product.sale != 0 && <p style={{ textDecorationLine: 'line-through', marginRight: '30px' }}>{Price(product.price)}<sup>đ</sup></p>}
                                <p style={{ color: 'red' }}>{Price(product.price * (100 - product.sale) / 100)}<sup>đ</sup></p>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </section>
        {showDialog && <Dialog mess="Sản phẩm đã được thêm vào giỏ" onClose={onCloseDialog} />}
    </>
);
};
export default Product;