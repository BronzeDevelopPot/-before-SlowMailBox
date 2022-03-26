import './login.css';

const Login = () => {
    return(
        <login>
            <div>
                <h1 className='title'>추억의 느린 우체통</h1>
                <img className='vending_machine' src='/login_img/test.jpg'></img>
                <h3 className='signup_promotion'>느린우체통 만들기</h3>
                <img className='kakao_login_button' src="/login_img/kakao_login_large_wide.png"></img> 
            </div>
        </login>
    )
}

export default Login;