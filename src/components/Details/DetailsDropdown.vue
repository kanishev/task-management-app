<template>
  <details class="detail-dropdown" ref="details">
    <summary>
      <slot name="handle"></slot>
    </summary>
    <div class="dropdown-content">
      <slot name="content"></slot>
    </div>
  </details>
</template>

<script>
export default {
  methods: {
    open() {
      this.$refs.details.setAttribute("open", "");
    },
    close() {
      this.$refs.details.removeAttribute("open");
    },
  },
};
</script>

<style scoped>
details {
  position: absolute;
  top: 12px;
  right: 10px;
}
details.detail-dropdown summary {
  outline: none;
  cursor: pointer;
  display: inline-block;
}

details.detail-dropdown summary::-webkit-details-marker {
  display: none;
}

details.detail-dropdown div.dropdown-content {
  display: flex;
  flex-direction: column;
  color: #303d44;
  position: absolute;
  top: -9px;
  left: -75px;
  width: 85px;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #90909066;
  z-index: 99;
}

details.detail-dropdown div.dropdown-content label.content-item {
  width: 100%;
}

details.detail-dropdown div.dropdown-content label.content-item:hover {
  color: #303d44;
}

details[open].detail-dropdown summary:before {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: fadein 200ms ease-in-out;
  cursor: default;
  z-index: 99;
}
</style>
