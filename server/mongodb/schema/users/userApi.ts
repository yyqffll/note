import express from 'express'
import User from './user'
import { checkParam, findOne, decrypt } from '../../utils'

const router = express.Router()

// 登录
router.post('/user/login', (req, res) => {
  if (!req.body.userName) return res.json({ success: false, msg: '请输入用户名!' })
  findOne({ userName: req.body.userName }, User).then((data: any) => {
    if (checkParam(data)) return res.json({ success: false, msg: '用户名或密码错误!' })
    if (decrypt(data.userPwd) === decrypt(req.body.userPwd)) {
      User.findByIdAndUpdate({ _id: data._id }, { userStatus: 'loginIn' }, { new: true }).then(data => {
        res.json({ success: true, msg: '登录成功!', data })
      })
    } else {
      res.json({ success: false, msg: '用户名或密码错误!' })
    }
  })
})

// 获取用户信息
router.post('/user/getUserInfo', (req, res) => {
  findOne(req.body, User).then(data => {
    res.json({ success: true, msg: '用户获取成功!', data })
  }).catch(err => {
    res.json({ success: false, msg: '用户获取失败!', data: { err } })
  })
})

export default router
