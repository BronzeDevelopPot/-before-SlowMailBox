import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./modal.css";
import styles from "./modal.module.css";


const Modal = () => {

  const[modals, nextModal] = useState({
    modal1 : true,
    modal2 : false
  });
  const {modal1, modal2} = modals;
  const submit = () => {
    nextModal({modal1:false, modal2:true});    
  };

  
  /* 리스트 만들어서 month <append>*/
  const today = new Date();
  const thisDate = today.getDate();
  const thisMonth = today.getMonth() + 1;
  const monthList = [];
  for (var i=thisMonth; i<13; i++){ 
    monthList.push(i); 
  }

  const [selectedMonth, setSelectedMonth] = useState();
  const [dateList, setDateList] = useState([]);
  const onChange = (e) => {
    setSelectedMonth(e.target.value);

    if (e.target.value <= 8){
      setDateList([1,2])
    }
    else if (e.target.value > 8){
      setDateList([3,4,5])
    }
  }

  const [selectedDate, setSelectedDate] = useState();
  const handleDate = (e) => {
    setSelectedDate(e.target.value);
  }

  return (
    <div id="modal" className="modal-overlay">
      <div className="modal-window">
          
          <div className={modal1 === true ? styles.appe : styles.disa}>
            <div className = "nickname_ment"> 닉네임을 입력하세요! </div>
            <input type="text" className ="nickname" name="nickname"></input>
            
            <div className = "date_ment">보낼 날짜를 선택해주세요!</div>
            <div className = "date_select">
              <select className ="year" name="year">
                <option value="2022">2022</option>
              </select>
              <div>년</div>

              <select className ="month" name="month" id="month_id" 
                onChange={onChange} value={selectedMonth}>
                  {monthList.map((item) => (
                    <option value={item} key={item}>{item}</option>
                  ))}
              </select>
              <div>월</div>

              <select className ="date" name="date" id="date_id"
                onChange={handleDate} value={selectedDate}>
                  {dateList.map((item) => (
                      <option value={item} key={item}>{item}</option>
                  ))}
              </select>
              <div>일</div>
              
            </div>

              <button className="summit_button" onClick={submit}>작성</button>
          </div>


        
          <div className={modal2 === true ? styles.appe : styles.disa}>
            <Link to="/">
            <div className="close-area">X</div>
            </Link>
            <div className="complete_ment">편지 전송이 완료되었습니다!</div>
            <div className="join_ment">나도 추억의 우체통을 만들고 싶다면?</div>
            <img
            className="kakao_start_login_button"
            src="/letter_img/kakao_login_start_large_wide.png"
            ></img>
          </div>

          
      </div>
    </div>
  );
};

export default Modal;