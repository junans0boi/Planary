import "./ModalWithCloseButton.css";

function ModalWithCloseButton({ onClose, onSubmit, children }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(); // ✅ 비동기 함수 처리
      console.log("✅ onSubmit 실행 완료");
    } catch (error) {
      console.error("❌ onSubmit 실행 중 오류:", error);
    }

    console.log("✅ 모달 닫기 시도");
    onClose(); // ✅ 모달 닫기
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="modal-form">
          {children} {/* ✅ `AddDiaryModal` 내용 표시 */}
          <div className="modal-buttons">
            <button type="submit">완료</button>
            <button type="button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithCloseButton;
