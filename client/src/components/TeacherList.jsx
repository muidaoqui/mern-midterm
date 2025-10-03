import React, { useEffect, useState } from "react";
import { Table, Button, Spin, message, Tag } from "antd";
import TeacherForm from "./TeacherForm";
import api from "../api/api";

function TeacherList() {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
  const [openForm, setOpenForm] = useState(false);

  const fetchTeachers = async (page = 1, limit = 5) => {
    try {
      setLoading(true);
      const res = await api.get(`/teachers?page=${page}&limit=${limit}`);
      setTeachers(res.data.teachers);
      setPagination({ current: res.data.page, pageSize: limit, total: res.data.total });
    } catch (err) {
      message.error("Không thể tải danh sách giáo viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const columns = [
    { title: "Mã GV", dataIndex: "code", key: "code" },
    { title: "Tên", dataIndex: ["userId", "name"], key: "name" },
    { title: "Email", dataIndex: ["userId", "email"], key: "email" },
    { title: "SĐT", dataIndex: ["userId", "phoneNumber"], key: "phoneNumber" },
    { title: "Địa chỉ", dataIndex: ["userId", "address"], key: "address" },
    { title: "Trạng thái", dataIndex: "isActive", key: "isActive", render: v => v ? "Đang công tác" : "Ngưng" },

    {
      title: "Vị trí công tác",
      dataIndex: "teacherPositionsId",
      key: "teacherPositionsId",
      render: (positions) =>
        positions && positions.length > 0 ? (
          positions.map((pos) => (
            <Tag color="blue" key={pos._id}>
              {pos.name}
            </Tag>
          ))
        ) : (
          <span>Chưa có</span>
        ),
    },

    {
      title: "Học vấn",
      dataIndex: "degrees",
      key: "degrees",
      render: (degrees) =>
        degrees && degrees.length > 0 ? (
          degrees.map((deg, index) => (
            <Tag color="green" key={index}>
              {deg.type} - {deg.major} ({deg.school}, {deg.year})
            </Tag>
          ))
        ) : (
          <span>Chưa có</span>
        ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpenForm(true)} style={{ marginBottom: 16 }}>
        ➕ Thêm giáo viên
      </Button>
      <Spin spinning={loading}>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={teachers}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page, pageSize) => fetchTeachers(page, pageSize),
          }}
        />
      </Spin>

      <TeacherForm open={openForm} onClose={() => { setOpenForm(false); fetchTeachers(); }} />
    </>
  );
}

export default TeacherList;
