
<template>
  <div class="content-box-cls">
    <el-table
      ref="multipleTable"
      v-loading="isloading"
      stripe
      :data="lists"
      :border="border"
      highlight-current-row
      @select="handleSelect"
      @row-click="selectTableData"
      @select-all="selectAll"
      @row-dblclick="dblclick"
    >
      <!-- 多选框 -->
      <el-table-column v-if="type" type="selection" width="55" :align="align" />

      <!-- 展示列 -->
      <template v-for="(item,index) in titles">
        <el-table-column
          :key="index"
          :align="align"
          :label="item.name"
        >
          <template slot-scope="scope">
            <template v-if="item.data === 'consPhone'">
              <el-progress v-if="scope.row[item.data] === 100" :text-inside="true" :stroke-width="20" :percentage="scope.row[item.data]" status="success" />
              <el-progress v-else :text-inside="true" :stroke-width="20" :percentage="scope.row[item.data]" />
            </template>
            <template v-else>
              {{ scope.row[item.data] }}
            </template>
          </template>

        </el-table-column>
      </template>

      <!-- 按钮项 -->
      <el-table-column v-if="btns" fixed="right" :label="btns.title" :width="btns.width" :align="align">
        <template slot-scope="{row}">
          <div class="btnCzBox">
            <template v-for="(ele,y) in btns.btnlist">
              <!-- <el-popconfirm
                v-if="ele.con==='删除' && ele.confirm"
                :key="y"
                :confirm-button-text="ele.confirm.confirmButtonText || '确认'"
                :cancel-button-text="ele.confirm.cancelButtonText || '取消'"
                icon="el-icon-info"
                icon-color="red"
                :title="ele.confirm.title||'是否删除当前项'"
              >
                <el-button
                  slot="reference"
                  class="ml10"
                  :style="ele.style? ele.style:''"
                  :type="ele.type"
                  :size="ele.size||'mini'"
                  :icon="ele.icon"
                  :circle="ele.circle"
                  :plain="ele.plain"
                  :disabled="disableType(row,ele.con)"
                  :class="ele.className ? ele.className:classType(row,ele)"
                  @click.stop="operate(ele.con||ele.icon,row)"
                >
                  {{ ele.con }}
                </el-button>
              </el-popconfirm> -->
              <el-button
                :key="y"
                :style="ele.style? ele.style:''"
                :type="ele.type"
                :size="ele.size||'mini'"
                :icon="ele.icon"
                :circle="ele.circle"
                :plain="ele.plain"
                :disabled="disableType(row,ele.con)"
                :class="ele.className ? ele.className:classType(row,ele)"
                @click.stop="operate(ele.con||ele.icon,row)"
              >
                {{ ele.con }}
              </el-button>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <br>
  </div>
</template>
<script>
/*  方法注释：
    {
        handleSelect    --- 选择框方法      (返回触发事件本身 与 选中行数据)
        selectTableData --- 点击行方法      (返回触发事件本身 与 选中行数据)
        selectAll       --- 全选框方法      (返回触发事件本身 与 选中数据)
        dblclick        --- 双击方法        (返回触发事件本身 与 当前双击行数据)
        operate         --- 操作按钮方法    (返回点击的按钮本身参数 与 按钮当前行数据)
        selectData      --- 自定义参数      (存储当前点击的参数和数据)
    }
*/
import datas from '@/assets/json/data'
export default {
    props: {
        type: {
            type: Boolean,
            default: false
        },
        isloading: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        align: { // left/center/right
            type: String,
            default: 'center'
        },
        msg: {
            type: Object,
            default: function() {
                return {}
            }
        },
        lists: {
            type: Array,
            default: function() {
                return datas.slice(0, 8)
            }
        },
        titles: {
            type: Array,
            default: function() {
                return [
                    { name: '订单编号', data: 'orderCode' },
                    { name: '订单状态', data: 'state' },
                    { name: '单位编号', data: 'cNumber' },
                    { name: '单位名称', data: 'cName' },
                    { name: '订单金额', data: 'total' },
                    { name: '支付方式', data: 'payMethod' },
                    { name: '登记时间', data: 'ctime' }]
            }
        },
        btns: {
            type: Object,
            default: function() {
                return { // ----------------------------按钮项配置/不传则不展示
                    title: '操作',
                    width: '200', // 按钮项宽度
                    btnlist: [
                        {
                            icon: 'el-icon-zoom-in', // 使用字体图标为按钮
                            circle: true, // 控制按钮是否为圆形   false/true  默认false
                            type: 'primary', // 按钮模式
                            size: 'small', // 按钮大小medium / small / mini 默认为mini
                            style: {
                                color: '#fff', // 文字颜色
                                backgroundColor: '#e2e2e2', // 按钮背景色
                                borderColor: '#e2e2e2'
                            }
                        },
                        {
                            con: '详情',
                            type: 'success',
                            style: {
                                color: '#fff',
                                backgroundColor: '#f00',
                                borderColor: '#f00'
                            }
                        },
                        {
                            con: '共存',
                            icon: 'el-icon-check',
                            type: 'primary',
                            size: 'small',
                            style: {
                                color: '#00c',
                                backgroundColor: '#999',
                                borderColor: '#999'
                            }
                        }
                    ]
                }
            }
        }
    },
    data() {
        return {
            list: [],
            selectData: null // 点击状态数据记录
        }
    },
    watch: {
        msg: {
            handler(val, oldVal) {
                this.list = val
            },
            deep: true
        }
    },
    methods: {
        handleSelect(selection, row) { // 表单行数据获取
            this.radio(row, 'select框')
        },
        selectTableData(row) {
            this.radio(row, '行')
        },
        dblclick(row) {
            this.radio(row, '双击')// 走 第三次点击 所以还是选中
        },
        operate(item, row) { // 按钮
            this.$emit('sendVal', { type: item, data: row })
        },
        radio(row, type) { // 点击状态封装 处理当前点击事件并存储，在下次点击时清除其它 （行单选方法 存储行数据）
            if (this.selectData && this.selectData === row) {
                this.$refs.multipleTable.toggleRowSelection(row, false)
                this.$refs.multipleTable.setCurrentRow()
                this.selectData = null
            } else {
                this.selectData = row
                this.$refs.multipleTable.clearSelection()// 清空多选框的所有选中状态
                this.$refs.multipleTable.toggleRowSelection(row, true)// 选中当前点击项
                this.$refs.multipleTable.setCurrentRow(row)// 选中当前行的背景状态
            }
            this.$emit('sendVal', { type: type, data: this.selectData })
        },
        selectAll(selection) { // 选中所有触发
            if (selection.length === 0) { // 取消全选 清空行样式
                this.$refs.multipleTable.setCurrentRow()
                this.selectData = null
            } else {
                this.selectData = [...selection]
            }
            this.$emit('sendVal', { type: '全选', data: this.selectData })
        },
        disableType(v, c) { // ---禁用状态验证
            return false
        },
        classType(v, ele) { // ---按钮样式
            return ele
        },
        contentSave(row, val) {
            if (row.status === '2' && val === '1') {
                return '取消屏蔽'
            } else {
                return val
            }
        }

    }
}
</script>
<style lang='scss' scoped>
.content-box-cls{
  ::v-deep{
    .el-button [class*=el-icon-]+span{
      margin: 0;
    }
    .btnCzBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}

</style>

