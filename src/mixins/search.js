export default {
    data() {
        return {
            baseParams: {
                page: 1,
                size: 10
            }
        }
    },
    methods: {
        getPageData(page) {
            this.baseParams.page = page
        },
        pagesizes(size) {
            this.baseParams.page = 1
            this.baseParams.size = size
        }
    }
}
