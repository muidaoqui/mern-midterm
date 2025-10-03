import React, { useState } from "react";
import { Drawer, Form, Input, Button, message } from "antd";
import api from "../api/api";

function PositionForm({ open, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await api.post("/teacher-positions", values);
      message.success("Thêm vị trí công tác thành công");
      form.resetFields();
      onClose();
    } catch (err) {
      message.error(err.response?.data?.message || "Lỗi khi thêm vị trí công tác");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer title="Thêm vị trí công tác" width={400} onClose={onClose} open={open}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="name" label="Tên vị trí" rules={[{ required: true, message: "Nhập tên vị trí" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="code" label="Mã vị trí" rules={[{ required: true, message: "Nhập mã vị trí" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="des" label="Mô tả">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Lưu
        </Button>
      </Form>
    </Drawer>
  );
}

export default PositionForm;
