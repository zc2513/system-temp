<template>
  <div class="proviewBox">
    <img src="@/assets/proview.gif" width="100%" height="100%" alt="">
    <i @click="$router.push('/system/company')" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.proviewBox{
    position: relative;
    width: 100%;
    height: 100%;
    i{
        position: absolute;
        width: 20%;
        height: 10vh;
        left: 0;
        top: 0;
        cursor: pointer;
    }
}
</style>
