import React, {useRef} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {deleteUser, searchUsers, selectSearch,updateUser} from "@/services/ant-design-pro/api";
import {Image} from "antd";

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,

  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
  },

  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: { text: '男' },
      1: { text: '女' },
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100} />
      </div>
    ),
  },
  {
    title: '星球编号',
    dataIndex: 'planetCode',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户', status: 'Default' },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },
  {
    title: '标签',
    dataIndex: 'tags',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <button
        key="edit"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        修改
      </button>,
      <button
        key="save"
        style={{ display: action?.isEditable?.(record.id)? 'inline' : 'none' }}
        onClick={async () => {
          try {
            const values = await action?.getEditableRowValues?.(record.id);
            const response = await updateUser({ ...record, ...values });
            if (response && response.data) {
              console.log('更新成功');
              action?.reload();
            } else {
              console.error('更新失败');
            }
          } catch (error) {
            console.error('更新出错:', error);
          }
        }}
      >
        保存
      </button>,
      <button
        key="delete"
        onClick={async () => {
          try {
            const response = await deleteUser({ id: record.id });
            if (response && response.data) {
              // 删除成功后的逻辑，例如刷新表格
              console.log('删除成功');
              action?.reload();
            } else {
              console.error('删除失败');
            }
          } catch (error) {
            console.error('删除出错:', error);
          }
        }}
      >
        删除
      </button>
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params , sort, filter) => {
        console.log(sort, filter);
        // const userList = await searchUsers();
        const userList = await selectSearch(params);

        return {
          data: userList,
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
