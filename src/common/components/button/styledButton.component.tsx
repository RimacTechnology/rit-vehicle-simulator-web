import './styledButton.style.scss'
import { Button } from 'antd'

interface Props {
    children: React.ReactNode
    style?: any
    light?: boolean
    submitButton?: boolean
}

function StyledButton(props: Props) {
    const { children, style, light, submitButton } = props

    return (
        <Button
            htmlType={submitButton ? 'submit' : 'button'}
            className={`styledButton ${light ? 'light-button' : ''}`}
            style={style}>
            {children}
        </Button>
    )
}

export default StyledButton