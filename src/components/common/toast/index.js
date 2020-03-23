import Toast from './Toast'
const obj = {}
obj.install = function(Vue) {
  // 1.创建toast的构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.new的方式，通过构造器创建一个组件
  const toast = new toastContrustor()
  // 3.把创建的组件挂载在某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.tost.$el就对应一个元素了，把这个元素挂载到body上
  document.body.appendChild(toast.$el)
  //通过1-4步，把toast组件添加到页面内（整个项目就一个index.html文件）相当于全局添加了这个组件

  // 5.把$toast做成vue的原型属性,并且赋值为第二步创建的toast组件
  Vue.prototype.$toast = toast
  // 第五步：把toast组件封装在Vue原型上，方便在其他组件上使toast组件的方法
}
export default obj