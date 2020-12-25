import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ConfigProvider } from "antd";
import heIL from "antd/lib/locale/he_IL";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={heIL} direction="rtl">
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
