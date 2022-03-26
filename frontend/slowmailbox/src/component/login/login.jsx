import {React} from 'react';
import {Link} from 'react-router-dom';
import './login.css';

const Login = () => {
    return(
        <login>
            <div>
                <img className='kakao_login_button' src="/login_img/kakao_login_large_wide.png"></img> 
                <Link to="/main"><button>메인으로</button></Link>
            </div>
        </login>
    )
}

export default Login;