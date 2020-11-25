<template>
  <div id="app">
    <nav>
      <div class="nav-items">
        <router-link to="/">Timer</router-link>
        <router-link to="/settings">Settings</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
body {
  background-color: #E6203C;
  color: black;
}
</style>
