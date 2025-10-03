import React, { useEffect, useState } from "react";
import { Table, Button, Spin, message } from "antd";
import PositionForm from "./PositionForm";
import api from "../api/api";

function PositionList() {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/teacher-positions");
      setPositions(res.data);
    } catch (err) {
      message.error("Không thể tải danh sách vị trí công tác");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const columns = [
    { title: "Mã vị trí", dataIndex: "code", key: "code" },
    { title: "Tên vị trí", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "des", key: "des" },
    { title: "Trạng thái", dataIndex: "isActive", key: "isActive", render: v => v ? "Hoạt động" : "Ngưng" },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpenForm(true)} style={{ marginBottom: 16 }}>
        ➕ Thêm vị trí công tác
      </Button>
      <Spin spinning={loading}>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={positions}
          pagination={false}
        />
      </Spin>

      <PositionForm open={openForm} onClose={() => { setOpenForm(false); fetchPositions(); }} />
    </>
  );
}

export default PositionList;
