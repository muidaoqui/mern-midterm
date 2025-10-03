import React from "react";
import { Card } from "antd";
import PositionList from "../components/PositionList";

function PositionPage() {
  return (
    <Card title="Quản lý vị trí công tác" style={{ margin: 20 }}>
      <PositionList />
    </Card>
  );
}

export default PositionPage;
