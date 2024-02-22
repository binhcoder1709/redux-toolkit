import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAll, findOne, remove } from "../services/user.service";

export default function ListUser() {
  // state chua du lieu
  const dispatch = useDispatch();
  // lấy dữ liệu trong kho lưu trữ
  const listUser = useSelector((state) => state.user.data);
  const userEdit = useSelector((state) => state.user.userEdit);
  console.log(userEdit);
  const loadData = () => {
    dispatch(findAll());
  };
  useEffect(() => {
    loadData();
  }, []);
  // hàm xóa 1 bản ghi theo id
  const handleDelete = (id) => {
    dispatch(remove(id));
  };

  // hàm cập nhật một bản ghi theo id
  const handleEdit = (id) => {
    // gọi api tìm kiếm thông tin một bản ghi theo id
    dispatch(findOne(id));
  };
  return (
    <>
      <div>
        <h3>danh sach nguoi dung</h3>
        <table border={1}>
          <thead>
            <tr>
              <th>#</th>
              <th>ho va ten</th>
              <th>tuoi</th>
              <th>gioi tinh</th>
              <th>ngay sinh</th>
              <th>email</th>
              <th>dia chi</th>
              <th>tuy chon</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.user_name}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.date_of_birth}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)}>sua</button>
                  <button onClick={() => handleDelete(user.id)}>xoa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
