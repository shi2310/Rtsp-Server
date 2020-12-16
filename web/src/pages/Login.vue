<template>
  <div class="box">
    <img src="../assets/logo.png" />
    <a-form :form="form" class="login-form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            },
          ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          Remember me
        </a-checkbox>
        <a class="login-form-forgot" href="">
          Forgot password
        </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
        Or
        <a href="">
          register now!
        </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store
            .dispatch("login", {
              ...values,
            })
            .then((data) => {
              if (data.Success) {
                this.$router.push({ path: "/index" });
              } else {
                this.$message.error(data.Msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 3.8rem;
    display: inline-block;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  form {
    width: 500px;
    display: inline-block;
  }
}
</style>
