import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const BKFooter = ({ rootUrl }) => {
    return (
        <footer className="cont cont-col max-full">
            <Container>
            <Row>
                {/* Col 1 */}
                <Col>
                    <a href="/" className="logo-link">
                        <img src="/img/Logo.png" alt="Logo" className="logo-img" />
                    </a>
                </Col>
                {/* Col 2 */}
                <Col>
                    <h2 className="footer-column-title">Main</h2>
                    <ul className="footer-link-list">
                        <li className="footer-link"><a href={`${rootUrl}/`}>Home</a></li>
                        <li className="footer-link"><a href={`${rootUrl}/why-dublin-at-home`}>Why us?</a></li>
                        <li className="footer-link"><a href="/properties">Browse</a></li>
                        <li className="footer-link"><a href={`${rootUrl}/tailored-stays/`}>Tailored Stays</a></li>
                        <li className="footer-link"><a href={`${rootUrl}/blog`}>Blog</a></li>
                    </ul>
                </Col>
                {/* Col 3 */}
                <Col>
                    <h2 className="footer-column-title">Help</h2>
                    <ul className="footer-link-list">
                        <li className="footer-link"><a href={`${rootUrl}/make-an-enquiry`}>Make an Enquiry</a></li>
                        <li className="footer-link"><a href={`${rootUrl}/contact-us`}>Contact us</a></li>
                        <li className="footer-link"><a href={`${rootUrl}/faq`}>FAQ</a></li>
                    </ul>
                </Col>
                <Col md={4}>
                    <h2 className="newsletter-title">Subscribe</h2>
                    <p className="newsletter-description">Join our newsletter to stay up to date on features and releases.</p>
                    <form className="cont cont-row gap-16 newsletter-form">
                        <label htmlFor="email-input" className="visually-hidden">Enter your email</label>
                        <input type="email" id="email-input" className="newsletter-input" placeholder="Enter your email" required />
                        <input type="submit" className="cta-main green newsletter-button" value="Subscribe" />
                    </form>
                    <span className="newsletter-disclaimer">
                    <a href={`${rootUrl}/terms-and-conditions`} style={{ color: '#22bea4' }}>By subscribing you agree to our Privacy Policy</a> and provide consent to receive updates from our company.
                    </span>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <p className="footer-copyright">© 2024 Dublin At Home. All rights reserved.<span className="termsSpacer"><a href={`${rootUrl}/terms-and-conditions`}>Terms of Service</a></span></p>
                </Col>
            </Row>
            </Container>
        </footer>
    )
}

export default BKFooter