import "./main.css";

const Main = () => {
  return (
    <main>
      <div className="mailbox">
        <p className="post">P O S T</p>

        <div className="size1"></div>
        <div className="size1"></div>

        <div className="line">
          <div className="size2"></div>
          <div className="wayin"></div>
        </div>

        <div className="wayout"></div>
      </div>

      <button className="sendbutton">전송</button>
      <button className="sharebutton">내 우체통 공유하기 (Link 공유)</button>
    </main>
  );
};

export default Main;
