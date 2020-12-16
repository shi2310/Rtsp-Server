<template>
  <div class="head">
    <h3>
      {{ title }}
    </h3>
    <a-divider />
    <a-form-model
      layout="inline"
      :model="form"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <!--标签显示名称-->
      <a-form-model-item
        v-for="item in formInputs"
        :key="item.model"
        :label="item.label"
      >
        <!--根据type来显示是什么标签-->
        <a-input
          v-model="form[item.model]"
          :placeholder="'请输入' + item.label"
          v-if="item.type === 'input'"
        ></a-input>
        <a-select
          v-model="form[item.model]"
          :placeholder="'请选择' + item.label"
          v-if="item.type === 'select'"
        >
          <!--如果是select或者checkbox 、Radio就还需要选项信息-->
          <a-select-option
            v-for="item in item.opts"
            :key="item.value"
            :value="item.value"
            :dropdownMatchSelectWidth="false"
            >{{ item.label }}</a-select-option
          >
        </a-select>
        <a-switch
          v-model="form[item.model]"
          v-if="item.type === 'switch'"
        ></a-switch>
        <a-date-picker
          v-model="form[item.model]"
          :placeholder="'请选择' + item.label"
          v-if="item.type === 'date'"
          valueFormat="yyyy-MM-dd"
        >
        </a-date-picker>
        <a-range-picker
          v-model="form[item.model]"
          v-if="item.type === 'daterange'"
        >
        </a-range-picker>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit" style="margin-right: 10px">
          提交
        </a-button>
        <!-- 插槽备用 -->
        <slot></slot>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    form: Object, // form表单的绑定对象
    formInputs: Array, // form表单内部输入框
  },
  methods: {
    handleSubmit() {
      this.$emit("clickSubmitForm");
    },
  },
};
</script>
<style lang="less" scoped>
.head {
  margin-bottom: 10px;
  padding: 10px;
  background-color: white;
}
</style>
