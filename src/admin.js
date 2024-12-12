const showModalBtn = document.getElementById("showModalBtn");
const confirmModal = document.getElementById("confirm");
const cancelBtn = document.getElementById("cancelBtn");
const startBtn = document.getElementById("startBtn");

showModalBtn.addEventListener("click", function () {
    confirmModal.style.display = "flex";
});

cancelBtn.addEventListener("click", function () {
    confirmModal.style.display = "none";
});

const confirmCeckbox = document.getElementById("confirm-check");
confirmCeckbox.addEventListener("change", function () {
    startBtn.disabled = !confirmCeckbox.checked;
});

const fetchData = async () => {
    try {
      const response = await fetch('https://yourdomain.com/api/execute-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: "run",  // 実行したい操作のタイプ
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();  // エラーメッセージの取得
        throw new Error(errorData.error || 'Unknown error occurred');
      }
  
      const result = await response.json();  // 成功時のデータ取得
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

startBtn.addEventListener("click", function () {
    fetchData();
});