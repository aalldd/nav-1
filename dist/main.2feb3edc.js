// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $('.addButton');
var x = localStorage.getItem('hashMap');
var hashMapObject = JSON.parse(x);
var hashMap = hashMapObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn/'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com/'
}];

var simpify = function simpify(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //删除 / 开头的内容
};

var render = function render() {
  $siteList.find('li:not(.addButton)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n        <div class=\"site\">\n                <div class=\"logo\">".concat(node.logo, "</div>\n                <div class=\"link\">").concat(simpify(node.url), "</div>\n                <div class=\"close\">\n                    <svg class=\"icon\" aria-hidden=\"true\">\n                        <use xlink:href=\"#icon-close\"></use>\n                    </svg>\n                </div>\n            </div>\n    </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url, '_self');
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      console.log(index);
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请问你要添加的网站是啥？');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simpify(url)[0].toUpperCase(),
    logoType: 'text',
    url: url
  });
  render();
}); // 监听页面关闭的事件

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('hashMap', string);
}; // 输入一些喜欢的网站的首字母就自动跳转过去，有点不方便暂时注释掉
// $(document).on('keypress', (e) => {
//     const { key } = e
//     hashMap.forEach(item => {
//         if (item.logo.toLowerCase() === key) {
//             window.open(item.url, '_self')
//         }
//     })
// })
// 由于代码部署到github发现，github会默认给每一个请求添加https的协议，所以静态资源无法访问成功
// let backgroundList=[]
// let viewPortWidth=document.body.clientWidth
// for(let i=1;i<12;i++){
//     backgroundList.push(`https://192.168.124.4:8888/images/bg${i}.jpg`)
// }
// 添加背景变换功能
// const fn=()=>{
//     let url = getBgUrl()
//     let back=$('body').css('backgroundImage').substring(26)
//     // 只有图片和上一次不一样的时候 才改变背景
//     if(url!==back){
//             $('body').css("background-image", `url(${url})`)    
//     }else{
//         fn()
//     }
// }
// 只有我打开静态资源服务器的时候，才将刷新背景图的按钮显示出来
// if(backgroundList.length===0){
//     $('.refresh').css("display",'none')
// }
// $('.refresh').on('click', fn)
// const getBgUrl = () => {
//     let random = Math.floor(Math.random() * backgroundList.length)
//     return backgroundList[random]
// }
// 背景图自动变化
// let autoChange=setInterval(()=>{
//     fn()
// },10000)
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.2feb3edc.js.map