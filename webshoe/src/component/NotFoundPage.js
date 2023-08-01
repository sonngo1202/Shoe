import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function NotFoundPage() {
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

export default NotFoundPage;
