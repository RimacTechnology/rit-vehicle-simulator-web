import { Col, Row } from 'antd';
import { useOutlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import './homeLayout.style.scss'

import logo from '../../../assets/images/logo.svg'
import StyledFooter from '../footer/footer.component';

function HomeLayout() {
    const outlet = useOutlet();
    
    const { t, i18n } = useTranslation();


    return (
        <div className="login w100-h100 container">
            <Row style={{ height: '100%' }}>
                <Col span={14} className="loginColumn">
                    <section className='loginContainer'>
                        <img className='logo' src={logo} alt={t('login.logoAlt') + ""} />
                        {outlet}
                    </section>
                </Col>
                <Col span={10} className="imageColumn">
                </Col>
            </Row>
            <StyledFooter />
        </div>
    )
}

export default HomeLayout