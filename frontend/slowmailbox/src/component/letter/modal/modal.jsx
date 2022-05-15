import { useState } from "react";
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

  const arr = [];
  if(thisMonth == 6 || thisMonth == 9 || thisMonth == 11){
    arr.splice(0,arr.length);

    for(var x=thisDate; x<=30; x++){
      arr.push(x);
    }
  }
  else{
    arr.splice(0,arr.length);

    for(var y=thisDate; y<=31; y++){
      arr.push(y);
    }
  }

  const [selectedMonth, setSelectedMonth] = useState(thisMonth);
  const [dateList, setDateList] = useState(arr);
  const onChange = (e) => {
    setSelectedMonth(e.target.value);

    if (e.target.value == thisMonth){

      if(e.target.value == 6 || e.target.value == 9 || e.target.value == 11){
        let date_1 = [];
        date_1.splice(0,date_1.length);

        for(var i=thisDate; i<=30; i++){
          date_1.push(i);
        }
        setDateList(date_1);
      }
      else{
        let date_2 = [];
        date_2.splice(0,date_2.length);

        for(var j=thisDate; j<=31; j++){
          date_2.push(j);
        }
        setDateList(date_2);
      }
    }
    else if (e.target.value == 6 || e.target.value == 9 || e.target.value == 11){
      setDateList([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])
    }
    else{
      setDateList([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31])
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