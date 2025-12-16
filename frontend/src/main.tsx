// React アプリのエントリポイントです。
// index.html の #root に対して <App /> をマウントし、全画面を React で描画します。
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {/* StrictMode は開発時に問題を見つけやすくするためのラッパーです（本番挙動とは一部異なります）。 */}
        <App />
    </React.StrictMode>
);
