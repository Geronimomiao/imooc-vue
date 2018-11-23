<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <!-- 插槽 不同的页面 此处的内容不同 -->
        <!-- 可以根据 name 属性 来指定不同插槽的内容 -->
        <slot name="bread"></slot>
      </nav>
    </div>
  </div>
</template>
