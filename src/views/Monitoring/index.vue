<template>
  <div class="monitoring-container">
    <div>
      <router-link to="/nested/menu2">退出大屏</router-link>
      <h4>首屏----66666---大屏展示</h4>
    </div>
  </div>
</template>

<script>

export default {
    name: 'Monitoring'
}
</script>

<style lang="scss" scoped>
.monitoring {
  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #ccc;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
