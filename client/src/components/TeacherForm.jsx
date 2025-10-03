import React, { useState, useEffect } from "react";
import { Drawer, Form, Input, Button, DatePicker, Select, message, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import api from "../api/api";

function TeacherForm({ open, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]);

  const fetchPositions = async () => {
    try {
      const res = await api.get("/teacher-positions");
      setPositions(res.data);
    } catch (err) {
      message.error("Không thể tải danh sách vị trí công tác");
    }
  };

  useEffect(() => {
    if (open) {
      fetchPositions();
    }
  }, [open]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await api.post("/teachers", values);
      message.success("Thêm giáo viên thành công");
      form.resetFields();
      onClose();
    } catch (err) {
      message.error(err.response?.data?.message || "Lỗi khi thêm giáo viên");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer title="Thêm giáo viên mới" width={500} onClose={onClose} open={open}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Nhập tên giáo viên" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Số điện thoại">
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Địa chỉ">
          <Input />
        </Form.Item>

        <Form.Item name="identity" label="CMND/CCCD">
          <Input />
        </Form.Item>

        <Form.Item name="dob" label="Ngày sinh">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="teacherPositionsId" label="Vị trí công tác">
          <Select
            mode="multiple"
            placeholder="Chọn vị trí công tác"
            options={positions.map((pos) => ({
              label: `${pos.name} (${pos.code})`,
              value: pos._id,
            }))}
          />
        </Form.Item>

        <Form.List name="degrees">
          {(fields, { add, remove }) => (
            <>
              <label><b>Học vấn (Degrees)</b></label>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "type"]}
                    rules={[{ required: true, message: "Loại bằng cấp" }]}
                  >
                    <Input placeholder="Loại (Cử nhân, Thạc sĩ...)" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "school"]}
                    rules={[{ required: true, message: "Trường học" }]}
                  >
                    <Input placeholder="Trường" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "major"]}
                  >
                    <Input placeholder="Chuyên ngành" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "year"]}
                  >
                    <Input placeholder="Năm tốt nghiệp" type="number" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "isGraduated"]}
                    initialValue={true}
                  >
                    <Select
                      style={{ width: 120 }}
                      options={[
                        { label: "Đã tốt nghiệp", value: true },
                        { label: "Chưa tốt nghiệp", value: false },
                      ]}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm bằng cấp
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Button type="primary" htmlType="submit" loading={loading}>
          Lưu
        </Button>
      </Form>
    </Drawer>
  );
}

export default TeacherForm;
