<template>
  <div class="tab-control">
    <div class="tab-item" 
      v-for="(item, index) in titles" 
      :key="index"
      :class="{active: index === currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  },
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    justify-content: space-around;
    background: #fff;
  }
  .tab-item {
    flex-grow: 1;
    text-align: center;
  }
  .tab-item span {
    line-height: 40px;
    padding: 5px;
  }
  .active {
    color: var(--color-height-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-height-text);
  }
</style>