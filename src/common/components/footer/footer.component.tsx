import { Col, Row } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import './footer.style.scss'

function StyledFooter() {
    return (
        <Footer className='footer'>
            <Row>
                <Col span={14} className="footerText container">
                    <p className='footerText'>Copyright ©2022 Rimac RACE Produced by Team Nevera</p>
                </Col>
                <Col span={10} className="footerSpace">
                </Col>
            </Row>
        </Footer>
    )
}

export default StyledFooter