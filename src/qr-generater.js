import QRCode from "qrcode";

const fetchData = async () => {
  try {
    const date = new Date();
    const queryParams = {
      state: "waiting"
    }
    const response = await fetch('https://yourdomain.com/api/execute-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        params: queryParams // クエリに必要なパラメータ
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();  // エラーメッセージの取得
      throw new Error(errorData.error || 'Unknown error occurred');
    }

    const result = await response.json();  // 成功時のデータ取得
    qrGenerator(result.id)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function qrGenerator(getParams) {
  QRCode.toCanvas(
    document.getElementById("canvas"),
    "https://yourdomain.com/?id=" + getParams,
    {
      margin: 4,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      scale: 6,
      width: window.innerHeight * 0.75,
    },
    function (error) {
      if (error) console.error(error);
      console.log("success!");
    }
  );
}

const insert = document.getElementById("insert");
const inputPassenger = document.getElementById("passengers");
insert.addEventListener('click', function () {
  fetchData();
})