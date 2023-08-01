import "./style.css";

function Dialog(props) {
   const onClose = () => {
    props.onClose();
   }

    return (
        <div className="dialog-mess">
            <div className="dialog-mess-content">
                <h3>{props.mess}</h3>
                <div className="dialog-mess-content-button">
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
}
export default Dialog;