const $siteList = $('.siteList')
const $lastLi = $('.addButton')
const x = localStorage.getItem('hashMap')
const hashMapObject = JSON.parse(x)
const hashMap = hashMapObject || [{ logo: 'A', url: 'https://www.acfun.cn/' },
{ logo: 'B', url: 'https://www.bilibili.com/' }]
const simpify = (url) => {
    return url.replace('https://', '').
        replace('http://', '').
        replace('www.', '').
        replace(/\/.*/, '')  //删除 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.addButton)').remove()
    hashMap.forEach((node,index) => {
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
        $li.on('click',()=>{
            window.open(node.url,'_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            console.log(index);
            hashMap.splice(index,1)
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

$(document).on('keypress',(e)=>{
    const {key}=e
    hashMap.forEach(item=>{
        if(item.logo.toLowerCase()===key){
            window.open(item.url,'_self')
        }
    })
})
