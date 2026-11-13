# 你說對不隊！｜黎明 RGB 小旅行

獨立發布的黎明新村日常採集遊戲。依使用者指定的遊戲版本，將公開前端程式及必要照片、短片整理成可獨立託管的靜態網站。遊戲不再依賴原 trycloudflare 臨時通道。

## 遊玩

https://yuenfeng0910.github.io/limin-rgb-game/

- 電腦：點地面移動，或使用方向鍵。
- 手機：點地面移動。
- 靠近光圈進入景點，完成互動收集記憶。
- 開啟「記憶手帳」或「村落地圖」查看進度與景點。
- 可播放村落短片與開關遊戲音樂。

進度保存在目前瀏覽器的 localStorage，不跨裝置同步。正式網址是新來源，原臨時網址的存檔不會自動搬過來。

## 與探索網站搭配

探索網站：https://yuenfeng0910.github.io/slowplay-websites/

遊戲頁面已有探索網站入口；探索網站亦可嵌入此正式遊戲網址。遊戲與 H5P 的成績及進度獨立。

## 本機執行

```sh
python3 -m http.server 8080
```

開啟 http://localhost:8080 。不需要後端、npm 或編譯。

## 來源與註記

- 來源版本：使用者提供之黎明 RGB 小旅行 `points5` 遊戲；取得時程式引用 `companions2` 資源。
- 遊戲內照片、短片與故事保留來源版本的內容，未替素材另行宣告開源授權。
- NPC 對話為創作；部分景點座標是遊戲配置，不應視為真實拍攝座標。詳細說明在遊戲與地理資料中保留。
- 街廓資料 © OpenStreetMap contributors，ODbL：https://www.openstreetmap.org/copyright 。保留地理資料原有 attribution 與說明。
- 地點核對連結指向 Google Maps。字型使用 Google Fonts，無法連線時會使用系統字型。

## GitHub Pages

Settings → Pages → Deploy from a branch → main → /(root)。推送 main 後自動更新網站。

## 正式影片更新

遊戲內影片已替換為恩鳳提供的 street-treasure-plane-master.mp4（15 秒、1080×1920、H.264/AAC），僅調整 MP4 faststart 索引位置，未重新編碼畫面或音訊。
