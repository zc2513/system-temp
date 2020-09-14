export default (name) => resolve => require([`@/views${name}`], resolve)
// export default (name) => () => import(`@/views/${name}`)
