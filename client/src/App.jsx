import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TeacherPage from "./pages/TeacherPage";
import PositionPage from "./pages/PositionPage";
import { Layout, Menu } from "antd";

const { Header, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">Giáo viên</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/positions">Vị trí công tác</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<TeacherPage />} />
            <Route path="/positions" element={<PositionPage />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
