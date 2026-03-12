export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-col" data-aos="fade-up" data-aos-delay="100">
            <h3>Duffus Flooring</h3>
            <p>Providing exceptional flooring solutions for residential and commercial spaces. Elevating standards, one floor at a time.</p>
          </div>
          <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#leave-review">Leave a Review</a></li>
            </ul>
          </div>
          <div className="footer-col" data-aos="fade-up" data-aos-delay="300">
            <h3>Contact Info</h3>
            <div className="contact-details">
              <p><i className="fas fa-phone"></i> <span>+1 (876) 314-1008 / +1 (876) 384-4916</span></p>
              <p><i className="fas fa-envelope"></i> <span><a href="mailto:duffusflooring@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>duffusflooring@gmail.com</a></span></p>
              {/*
              <p><i className="fas fa-map-marker-alt"></i> Your City, State</p>
              */}
            </div>
            <div className="social-links">
              <a href="https://www.facebook.com/duffus.flooring1" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/duffusflooring/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
