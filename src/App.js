//import logo from "./logo.svg";
import "./App.scss";
import { Tabs } from "antd";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import Scrf from "./Pages/Scrf/Scrf";
const { TabPane } = Tabs;
function App() {
  return (
    <div className="App">
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={<span className="tabsText">فروشگاه snappcarfix</span>}
            key="1"
          >
            <Scrf />
          </TabPane>
          <TabPane
            tab={<span className="tabsText">فروشگاه درایورز</span>}
            key="2"
          ></TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
}

export default App;
