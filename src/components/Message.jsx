import './Message.css';

function Message({ type, text }) {
    return (
      <div className={`message ${type}`}>
        {text}
      </div>
    );
  }

  export default Message