## ReactNative原理分析与热更新



> React Native技术架构



![img](https://pic3.zhimg.com/v2-349367c8b1f7aa118672f848861c006e_b.jpg)

绿色：是我们应用开发的部分，我们写的代码基本上都是在这一层，最终打包的时候生成一个bundle

蓝色：代表公用的跨平台的代码和工具引擎，一般我们不会动蓝色部分的代码。

黄色：代表平台相关的 bridge 代码，做定制化的时候会添加修改代码。

红色：代表系统平台的功能，另外红色上面有一个虚线，表示所有平台相关的东西都通过 bridge 隔离开来了，红色部分是独立于 React Native 的。



> Javascript VM 

JavaScriptCore 是 JavaScript 引擎，通常会被叫做虚拟机，负责解释和执行 JavaScript 代码，是WebKit默认内嵌的JavaScript引擎。

##### 	webkit架构图：

![img](https://pic1.zhimg.com/80/v2-8fa19bbfacd897295d3f1789de83cca0_1440w.jpg)

​		WebKit由四个部分组成，分别是：

1. WebKit Embedding API：负责浏览器UI与WebKit进行交互的部分

2. Platform API（WebKit Ports）：让Webkit更加方便的移植到各个操作系统、平台上，提供的一些调用Native Library的接口。例如在渲染层面，iOS系统中通过Safari的CoreGraphics处理，而Android系统中则是通过Skia处理。

3. WebCore

4. JSCore

   其中最重要的是WebCore和JSCore部分。

   存在许多基于WebKit分支开发的浏览器引擎，分别做了不同程度的优化，但这些引擎的功能都是解释执行 JavaScript代码。 - Google 的 V8 - Mozilla 的 SpiderMonkey - FaceBook最近推出的React Native引擎Hermes。经过官方的数据验证，Faceback 团队提出的关键性指标相较于原先的 JavaScriptCore 方案都有了显著提高。首先，是产物文件的大小方面，RN 所依赖的必要 so 库，Hermes 比 JavaScriptCore 减少了约 16%，V8 则要远大于 Hermes 和 JavaScriptCore。

   

> Bridge

在 React Native 中，原生端和 JavaScript 交互是通过 Bridge 进行的，Bridge 的作用就是给 React Native 内嵌的 JS Engine 提供原生接口的扩展供 JS 调用。所有的本地存储、图片资源访问、图形图像绘制、3D 加速、网络访问、震动效果、NFC、原生控件绘制、地图、定位、通知等都是通过 Bridge 封装成 JS 接口以后注入 JS Engine 供 JS 调用。理论上，任何原生代码能实现的效果都可以通过 Bridge 封装成 JS 可以调用的组件和方法, 以 JS 模块的形式提供给 RN 使用。



> 热更新原理

​       React Native 开发的应用支持热更新，因为 React Native 的产物是 bundle 文件，其实本质上就是 JS 代码，在 App 启动的时候就会去服务器上获取 bundle 文件，我们只需要更新 bundle 文件，从而使得 App 不需要重新前往商店下载包体就可以进行版本更新，开发者可以在用户无感知的情况下进行功能迭代或者 bug 修复。但是值得注意的是，AppStore 禁止热更新的功能中有调用私有 API、篡改原生代码和改变 App 的行为。

​       为了方便更新 一般把一个包拆分成：一个基础包+ n 个业务包，其中基础包是不变的，这就是 runtime，业务包就是具体的业务，后面如果有更新，也只需要再打出一个业务包就行。

![](/Users/ganlinzhen/Library/Application Support/typora-user-images/image-20210129110132498.png)

目前热更新有两种方案：

1. 预加载: 在app启动时，检查更新
2. 按需加载：在进入相应RN页面的时候检查