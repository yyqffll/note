<template>
  <div id="login-page">
    <div id="content">
      <Avatar ref="avatar" :avatarImg="avatarImg" />
      <Form ref="form" hide-required-mark :model="model" :rules="rules">
        <Row>
          <Col span="24">
            <FormItem label="用户名：" prop="userName">
              <Input v-model="model.userName" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="密码：" prop="userPwd">
              <Input type="password" v-model="model.userPwd" placeholder="请输入密码"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <Button type="primary" @click="handleLogin" :loading="btnLoading">登录</Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script setup name="login">
import Avatar from '@/components/Avatar'
import avatarImg from '../assets/images/avatar.png'

import { ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { debounce } from '@/libs/utils'

const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
const avatar = ref()
const form = ref()
const model = reactive({
  userName: '',
  userPwd: ''
})
const rules = reactive({
  userName: [{ required: true, message: '不能为空', trigger: 'blur' }],
  userPwd: [{ required: true, message: '不能为空', trigger: 'blur' }]
})
let btnLoading = ref(false)
const handleLogin = debounce(() => {
  btnLoading.value = true
  form.value.validate(vaild => {
    if (!vaild) return btnLoading.value = false
    store.dispatch('login', model).then(res => {
      proxy.$Message.success({ content: res.msg })
      router.replace('/home')
    }).catch(err => {
      btnLoading.value = false
      proxy.$Message.error({ content: err })
      avatar.value.hoverLikeFun()
    })
  })
})
</script>

<style lang="less" scoped>
#login-page {
  height: 100%;
  position: relative;
  #content {
    width: 20%;
    height: max-content;
    padding: 0 16px 16px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
    box-shadow: 0 0 4px 4px #aebcd3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .ivu-form {
      .ivu-row {
        .ivu-col {
          .ivu-btn {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
