import React from "react";
import "./style.css";

const Footer = (props) => {
    return (
        <div>
            <section class="app-container">
                <p>Tải ứng dụng Bitis</p>
                <div class="app-google">
                    <img src="https://www.grab.com/sg/wp-content/uploads/sites/4/2016/05/google-play.png" />
                    <img src="https://www.grab.com/sg/wp-content/uploads/sites/4/2016/05/app-store.png" />
                </div>
            </section>
            <footer>
                <div class="footer-top">
                    <li><a href=""><img
                        src="https://file.hstatic.net/1000230642/file/bocongthuong_f866573d7d9d4e7fb16d09817459d3cb.png" /></a></li>
                    <li><a href="">Liên hệ</a></li>
                    <li><a href=""></a>Tuyển dụng</li>
                    <li><a href=""></a>Giới thiệu</li>
                    <li><a href="" class="fab fa-facebook"></a> <a href=""
                        class="fab fa-youtube"></a> <a href="" class="fab fa-instagram"></a>
                    </li>
                </div>
                <div class="footer-center">
                    <p>
                        CÔNG TY TNHH SẢN XUẤT HÀNG TIÊU DÙNG BÌNH TIÊN <br /> Địa chỉ: 22
                        Lý Chiêu Hoàng, Phường 10, Quận 6, TP. Hồ Chí Minh <br /> Điện
                        thoại:(028) 38 753 443 <br /> Email:Liên hệ các vấn đề về đơn
                        hàng Online, kênh cửa hàng, đại lý (offline) :
                        chamsockhachhang@bitis.com.vn <br /> Hotline: 0966158666 ( cước
                        phí: 1.000đ/phút ) <br /> Thời gian tư vấn: 8h – 12h, 13h – 21h30
                        các ngày trong tuần (trừ ngày Lễ, Tết) <br /> Giấy CNĐKDN:
                        0301340497
                    </p>
                </div>
                <div class="footer-bottom">Bitis All rights reserveds</div>
            </footer>
        </div>
    );
};
export default Footer;