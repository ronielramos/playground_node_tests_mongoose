const User = require('../models/user.model')
const Item = require('../models/item.model')
const Post = require('../models/post.model')
const mongoose = require('mongoose')
const arroz = require('./test.controller')

exports.test = async (req, res) => {
  console.log(`teste`)
  try {
    let user = new User({ _id: new mongoose.Types.ObjectId(), name: 'Astolfo' })
    let post = new Post({ _id: new mongoose.Types.ObjectId(), texto: 'Teste', criador: user._id })
    let item = new Item({ _id: new mongoose.Types.ObjectId(), numero: 1, criador: new mongoose.Types.ObjectId() })
    //
    user['posts'] = post._id
    user['itens'] = item._id

    user = await user.save()
    post = await post.save()
    item = await item.save()

    return res.status(200).json({ status: 200, resultado: [user, post, item] })
  } catch (e) {
    console.error(e)

    // console.error.bind(console, e)
    res.status(400)
    res.json({ [res.status]: e })
  }
}

exports.getItens = async (req, res) => {
  console.log('getItens')
  const tabela = req.params.tabela
  console.log(tabela)

  const users = await User.find()
  const itens = await Item.find()
  const posts = await Post.find()

  console.log(users.length)
  console.log(itens.length)
  console.log(posts.length)

  res.status(200)
  return res.json({ status: res.status, resultado: [users, itens, posts] })
}

exports.getItem = async (req, res) => {
  let teste = arroz.testAsync('aaa')

  console.log(teste)
  console.log('Post', req.body)

  const user = await User.findOne({ _id: '5bd5325c2de98e44eb306356' }).populate({ path: 'posts', select: 'texto' })
  let erro = { erro: 'teste' }

  res.status(200)

  try {
    throw erro
  } catch (e) { console.error(e) }
  return res.json({ status: res.status, resultado: [user] })
}

exports.testAsync = async function (parametro) {
  return 'Funcionou ' + parametro
}
