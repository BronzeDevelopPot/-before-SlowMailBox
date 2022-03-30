import { Link } from "react-router-dom";
import "./letter.css";

const Letter = () => {
/*
    {
        const modal = document.getElementById("modal");
        const btnModal = document.getElementById("modalTest");
        btnModal.addEventListener("click", e =>{
            modal.style.display = "flex";
        })
    }

*/  

  return (
    <div>
      <div>
        <textarea rows="33" cols="40" className="textArea"></textarea>
      </div>
      <div className="letter_sendline">
        <button className="letter_send">작성</button>
      </div>



      {/* 모달창 테스트 */}
      <div id="modal" class="modal-overlay">
        <div class="modal-window">
          <div id = "content">
            <div class ="nickname_ment">닉네임 입력</div>
            <input type="text" class="nickname" name="nickname"></input>
            
            <div class = "date_content">보낼 날짜를 선택해주세요!</div>
            <select class="date_year" name="date_year">
               <option value="2022">2022</option>
            </select>
            <div>년</div>
              <select class="date_month" name="date_month">
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <div>월</div>
                <select class="date_month" name="date_month">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
              <div>일</div>


              <button class="close-area">작성</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Letter;
