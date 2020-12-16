<template>
  <div class="box">
    <SearchForm
      title="船舶档案"
      :formInputs="searchFromInputs"
      :form="searchFrom"
      @clickSubmitForm="search()"
    >
      <a-button type="default">
        重置
      </a-button>
    </SearchForm>
    <div class="table">
      <a-button icon="plus" type="primary">新建</a-button>
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="ID"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <a slot="operation" slot-scope="text, record">
          <a-popconfirm title="确定删除?" @confirm="() => doSomething(record)">
            <a><a-icon type="delete" /> 删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a><a-icon type="edit" /> 编辑</a>
        </a>
      </a-table>
    </div>
  </div>
</template>

<script>
import SearchForm from "../components/SearchForm";

const columns = [
  { title: "MMSI", dataIndex: "MMSI", key: "MMSI" },
  { title: "船舶名称", dataIndex: "Name", key: "Name" },
  { title: "异常类型", dataIndex: "Type", key: "Type" },
  { title: "点位", dataIndex: "Point", key: "Point" },
  { title: "创建时间", dataIndex: "CreatedAt", key: "CreatedAt" },
  {
    title: "操作",
    key: "operation",
    align: "center",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  data() {
    return {
      searchFrom: {
        type: "",
        name: "",
        mmsi: "",
        dateRange: "",
        point: "",
      },
      searchFromInputs: [
        {
          model: "type",
          label: "类型",
          type: "select",
          opts: [
            { label: "不限", value: "" },
            { label: "AIS未开启", value: "1" },
            { label: "船名遮挡", value: "2" },
            { label: "类型伪造", value: "3" },
            { label: "AIS静态消息伪造", value: "4" },
          ],
        },
        {
          model: "name",
          label: "船舶名称",
          type: "input",
        },
        {
          model: "mmsi",
          label: "MMSI",
          type: "input",
        },
        {
          model: "dateRange",
          label: "日期范围",
          type: "daterange",
        },
        {
          model: "point",
          label: "点位",
          type: "select",
          opts: [
            { label: "不限", value: "" },
            { label: "黄浦江3号", value: "1" },
            { label: "黄浦江1号", value: "2" },
            { label: "黄浦江2号", value: "3" },
            { label: "黄浦江4号", value: "4" },
          ],
        },
      ],
      data: [],
      columns,
      pagination: {},
      loading: false,
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
        .get(`/api/abnormal`, { data: { ...params, pageSize: 10 } })
        .then((response) => {
          this.loading = false;
          const data = response.data;
          if (data && data.Success && data.Data) {
            const { List, TotalCount } = data.Data;
            this.data = List;
            const pagination = { ...this.pagination };
            pagination.total = TotalCount;
            this.pagination = pagination;
          }
        });
    },
  },
  components: {
    SearchForm,
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
