import lazyLoading from './lazyLoading.js'
export default (routers, data) => {
    // generaMenu(routers, data)
    console.log(routers)
}
console.log(lazyLoading)
// eslint-disable-next-line no-unused-vars
function generaMenu(routers, data) {
    data.forEach((item) => {
        const menu = Object.assign({}, item)
        menu.component = lazyLoading(menu.component)
        if (!item.leaf) {
            menu.children = []
            if (item.children) {
                generaMenu(menu.children, item.children)
            }
        }
        routers.push(menu)
    })
}

