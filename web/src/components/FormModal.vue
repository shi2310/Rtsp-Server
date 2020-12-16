<template>
  <a-modal
    :title="formConfig.title"
    :visible="visible"
    @cancel="visible = false"
    @ok="submit()"
    width="600px"
    :mask-closable="false"
    :keyboard="false"
  >
    <a-form :form="form">
      <a-form-item
        v-bind="layout"
        v-for="(item, index) in formConfig.items"
        :key="index"
        :label="item.label"
      >
        <!--根据type来显示是控件-->
        <a-input
          v-if="item.type === 'input'"
          v-decorator="[
            item.name,
            {
              rules: item.rules,
            },
          ]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          allow-clear
        ></a-input>
        <a-select
          v-else-if="item.type === 'select'"
          :mode="item.mode"
          v-decorator="[
            item.name,
            {
              rules: item.rules,
            },
          ]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        >
          <!--如果是select或者checkbox 、Radio就还需要选项信息-->
          <a-select-option
            v-for="item in item.options"
            :key="item.value"
            :value="item.value"
            :dropdownMatchSelectWidth="false"
            >{{ item.label }}</a-select-option
          >
        </a-select>
        <a-input-number
          v-else-if="item.type === 'number'"
          v-decorator="[
            item.name,
            {
              rules: item.rules,
            },
          ]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :min="item.min"
          :max="item.max"
        />
        <a-date-picker
          v-else-if="item.type === 'datetime'"
          v-decorator="[
            item.name,
            {
              rules: item.rules,
            },
          ]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :disabledDate="item.disabledDate"
        />
        <a-range-picker
          v-else-if="item.type === 'datetimeRange'"
          v-decorator="[
            item.name,
            {
              rules: item.rules,
            },
          ]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :disabled-date="item.disabledDate"
        />
        <a-textarea
          v-else-if="item.type === 'textarea'"
          v-decorator="[
            item.name,
            {
              rules: item.rules,
            },
          ]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :rows="3"
          allow-clear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  props: {
    formConfig: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      layout: { labelCol: { span: 6 }, wrapperCol: { span: 16 } },
    };
  },
  methods: {
    handleOpenForm(obj = []) {
      this.form.resetFields();
      this.visible = true;
      setTimeout(() => {
        this.form.setFieldsValue(obj);
      }, 100);
    },
    submit() {
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.$emit("submit", values);
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
