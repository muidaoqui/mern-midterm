import React from "react";
import { Card } from "antd";
import TeacherList from "../components/TeacherList";

function TeacherPage() {
  return (
    <Card title="Quản lý giáo viên" style={{ margin: 20 }}>
      <TeacherList />
    </Card>
  );
}

export default TeacherPage;
