const $siteList = $('.siteList')
const $lastLi = $('.addButton')
const x = localStorage.getItem('hashMap')
const hashMapObject = JSON.parse(x)
let hashMap = hashMapObject || [{ logo: 'A', url: 'https://www.acfun.cn/' },
{ logo: 'B', url: 'https://www.bilibili.com/' }]
const simpify = (url) => {
    return url.replace('https://', '').
        replace('http://', '').
        replace('www.', '').
        replace(/\/.*/, '')  //删除 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.addButton)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simpify(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url, '_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            console.log(index);
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网站是啥？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({ logo: simpify(url)[0].toUpperCase(), logoType: 'text', url: url })
    render()
});
// 监听页面关闭的事件
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('hashMap', string)
}
// 输入一些喜欢的网站的首字母就自动跳转过去，有点不方便暂时注释掉
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
