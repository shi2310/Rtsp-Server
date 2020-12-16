<template>
  <div class="box">
    <SearchForm
      title="点位设置"
      :formInputs="searchFromInputs"
      :form="searchFrom"
      @clickSubmitForm="search()"
    >
      <a-button type="default">
        重置
      </a-button>
    </SearchForm>
    <div class="table">
      <a-button icon="plus" type="primary" @click="addPoint()">新建</a-button>
      <a-table
        :columns="columns"
        :data-source="data"
        :row-key="(record) => record.ID"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :expandedRowKeys="expandedRowKeys"
        @expand="expandRow"
      >
        <a slot="operation" slot-scope="text, record">
          <a-popconfirm title="确定删除?" @confirm="() => doSomething(record)">
            <a><a-icon type="delete" /> 删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a><a-icon type="edit" /> 编辑</a>
          <a-divider type="vertical" />
          <a><a-icon type="video-camera" /> 添加摄像头</a>
        </a>
        <a-table
          slot="expandedRowRender"
          :row-key="(record) => record.ID"
          :columns="innerColumns"
          :data-source="innerData"
          :loading="innerLoading"
          :pagination="false"
        >
          <span slot="name" slot-scope="text, record">
            <router-link
              :to="{
                path: '/VideoSurveillance',
                query: {},
              }"
            >
              <a-icon type="instagram" /> {{ record.Name }}
            </router-link>
          </span>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              title="确定删除?"
              @confirm="() => doSomething(record)"
            >
              <a><a-icon type="delete" theme="filled" /> 删除</a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a><a-icon type="edit" theme="filled" /> 编辑</a>
          </template>
        </a-table>
      </a-table>
    </div>
    <FormModal
      :form-config="formModalConfig"
      ref="submitForm"
      @submit="submitForm"
    />
  </div>
</template>

<script>
import SearchForm from "../components/SearchForm";
import FormModal from "../components/FormModal";

const columns = [
  { title: "点位编号", dataIndex: "PointCode", key: "PointCode" },
  { title: "点位名称", dataIndex: "PointName", key: "PointName" },
  { title: "经度", dataIndex: "Lat", key: "Lat" },
  { title: "纬度", dataIndex: "Lng", key: "Lng" },
  { title: "型号", dataIndex: "Size", key: "Size" },
  { title: "创建时间", dataIndex: "CreatedAt", key: "CreatedAt" },
  {
    title: "操作",
    key: "operation",
    align: "center",
    scopedSlots: { customRender: "operation" },
  },
];

const innerColumns = [
  {
    title: "摄像头",
    dataIndex: "Name",
    ellipsis: true,
    scopedSlots: { customRender: "name" },
  },
  { title: "视频流地址", dataIndex: "Url", ellipsis: true, width: "60%" },
  {
    title: "操作",
    dataIndex: "operation",
    align: "center",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  data() {
    return {
      searchFrom: {
        pointName: "",
        pointCode: "",
      },
      searchFromInputs: [
        {
          model: "pointName",
          label: "点位名称",
          type: "input",
        },
        {
          model: "pointCode",
          label: "点位编号",
          type: "input",
        },
      ],
      data: [],
      columns,
      pagination: {},
      loading: false,
      expandedRowKeys: [],
      innerColumns,
      innerLoading: false,
      innerData: [],
      formModalConfig: {
        title: "点位设置",
        items: [
          {
            name: "PointCode",
            label: "点位编号",
            type: "input",
            placeholder: "请输入点位编号",
            rules: [{ required: true, message: `请输入点位编号` }],
          },
          {
            name: "PointName",
            label: "点位名称",
            type: "input",
            placeholder: "请输入点位名称",
            rules: [{ required: true, message: `请输入点位名称` }],
          },
          {
            name: "Lat",
            label: "经度",
            type: "input",
            placeholder: "请输入经度",
            rules: [{ required: true, message: `请输入经度` }],
          },
          {
            name: "Lng",
            label: "纬度",
            type: "input",
            placeholder: "请输入纬度",
            rules: [{ required: true, message: `请输入纬度` }],
          },
          {
            name: "Size",
            label: "型号",
            type: "input",
            placeholder: "请输入型号",
            rules: [{ required: true, message: `请输入型号` }],
          },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    search() {
      console.log(JSON.stringify(this.searchFrom));
    },
    doSomething(record) {
      console.log(record);
    },
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getData({
        pageSize: pagination.pageSize,
        current: pagination.current,
      });
    },
    getData(params = {}) {
      this.loading = true;
      this.$myaxios
        .get(`/api/points`, { data: { ...params, pageSize: 10 } })
        .then((response) => {
          this.loading = false;
          const data = response.data;
          if (data && data.Success && data.Data) {
            const { List, TotalCount } = data.Data;
            this.data = List;
            const pagination = { ...this.pagination };
            pagination.total = TotalCount;
            this.pagination = pagination;
          } else {
            this.$message.error(data.Msg);
          }
        });
    },
    expandRow(expanded, record) {
      const key = record.ID;
      if (expanded) {
        this.innerLoading = true;
        this.$myaxios
          .get(`/api/cameras`, { data: { pointCode: record.PointCode } })
          .then((response) => {
            this.innerLoading = false;
            const data = response.data;
            if (data && data.Success && data.Data) {
              const { List } = data.Data;
              this.innerData = List;
            } else {
              this.$message.error(data.Msg);
            }
          });
        this.expandedRowKeys = [];
        this.expandedRowKeys.push(key);
      } else {
        this.expandedRowKeys = [];
      }
    },
    addPoint() {
      this.$refs.submitForm.handleOpenForm({ id: 1 });
    },
  },
  components: {
    SearchForm,
    FormModal,
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;

  .table {
    background-color: white;
    padding: 10px;
  }
}
</style>
