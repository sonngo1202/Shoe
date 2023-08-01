import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Index() {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const [card, setCard] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/new`)
      .then((resp => resp.json()))
      .then((card) => setCard(card))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const imgContainer = document.querySelector('.aspect-ratio-169');
    const imgPositions = document.querySelectorAll('.aspect-ratio-169 img');
    const dotItems = document.querySelectorAll('.dot');

    const slider = (index) => {
      imgContainer.style.left = `-${index * 100}%`;

      const dotActive = document.querySelector('.active');
      if (dotActive) {
        dotActive.classList.remove('active');
      }
      dotItems[index].classList.add('active');

      setCurrentImage(index);
    };

    const handleDotClick = (index) => () => {
      slider(index);
    };

    if (imgContainer) {
      imgPositions.forEach((image, index) => {
        image.style.left = `${index * 100}%`;
        dotItems[index].addEventListener('click', handleDotClick(index));
      });
    }

    const timerId = setTimeout(() => {
      let nextImage = currentImage + 1;
      if (nextImage >= imgPositions.length) {
        nextImage = 0;
      }
      slider(nextImage);
    }, 5000);

    return () => {
      clearTimeout(timerId);
      dotItems.forEach((dot, index) => {
        dot.removeEventListener('click', handleDotClick(index));
      });
    };
  }, [currentImage]);

  const onProduct = (product) => {
    navigate(`/product/${product.name}`, { state: { product, cate: 'Sản phẩm mới nhất' } });
  }

  const Price = (price) => {
    const price_new = price * 1;
    return price_new.toLocaleString();
  }

  return (
    <><section id='Slider'>
      <div className='aspect-ratio-169'>
        <img src='https://file.hstatic.net/1000230642/file/hunter_x_-_dune_otp_real_f5f808523a944dcab9c5e492c37a9c7a.jpg'/>
        <img src='https://file.hstatic.net/1000230642/file/1920x750_gosto_bb0795caa61e4ba5bbf8abbbc047d172.jpg'/>
        <img src='https://file.hstatic.net/1000230642/file/1920x750_hunter_junior_efec6325ab764c66baad7983c098f7b3.jpg'/>
      </div>
      <div className='dot-container'>
        <div className={`dot ${currentImage === 0 ? 'active' : ''}`} />
        <div className={`dot ${currentImage === 1 ? 'active' : ''}`} />
        <div className={`dot ${currentImage === 2 ? 'active' : ''}`} />
      </div>
    </section><section class="product-card">
        <div class="product-card-title">
          <p>SẢN PHẨM MỚI NHẤT</p>
        </div>
        <div class="cartegory-card-content row">
          {card.map((product) => (
            <div class="cartegory-card-content-item">
              <button onClick={() => onProduct(product)}>
                <img src={product.imageMain} />
                <h1>{product.name}</h1>
                <div class="cartegory-card-content-price row">
                  {product.sale !== 0 && <p style={{ textDecorationLine: 'line-through', marginRight: '30px' }}>{Price(product.price)}<sup>đ</sup></p>}
                  <p style={{ color: 'red' }}>{Price(product.price * (100 - product.sale) / 100)}<sup>đ</sup></p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section></>
  );
}

export default Index;
