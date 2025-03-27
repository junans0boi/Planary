const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5006; // 원하는 포트

app.use(cors()); // CORS 정책 해제

const HOLIDAY_API_URL = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
const API_KEY = "Ji/Vur8oL32qoBr9dad17kebaW+dRQks4qsLXLi1S9gfvvLc7IR7PV0nIauCz3FK99oeZy9/lAvDBqN+rSqFBg=="; // Decoded API Key 사용
// 인코딩 : Ji%2FVur8oL32qoBr9dad17kebaW%2BdRQks4qsLXLi1S9gfvvLc7IR7PV0nIauCz3FK99oeZy9%2FlAvDBqN%2BrSqFBg%3D%3D
// 디코딩 : Ji/Vur8oL32qoBr9dad17kebaW+dRQks4qsLXLi1S9gfvvLc7IR7PV0nIauCz3FK99oeZy9/lAvDBqN+rSqFBg==

app.get("/api/holidays", async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1;

    const response = await axios.get(HOLIDAY_API_URL, {
      params: {
        solYear: year,
        solMonth: month.toString().padStart(2, "0"),
        ServiceKey: API_KEY,
        _type: "json",
      },
    });

    console.log("API Response:", response.data);

    // Check and always return an array
    if (response.data.response?.body?.items?.item) {
      const items = response.data.response.body.items.item;
      res.json(Array.isArray(items) ? items : [items]);
    } else {
      res.json([]); // Return an empty array if no data
    }
  } catch (error) {
    console.error("Error fetching holidays:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch holidays" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});