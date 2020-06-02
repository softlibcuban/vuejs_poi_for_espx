<template >
  <div>
    <!-- <div class="notification is-success updow" v-show="infoShow">
      <button class="delete" @click="closeElem"></button>
      {{textInfo}}
    </div>
    <div class="notification is-danger updow" v-show="errorShow">
      <button class="delete" @click="closeElem"></button>
      {{textInfo}}
    </div> -->

    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Header</h1>
          <h2 class="subtitle">EspX web</h2>
        </div>
      </div>
      <div class="hero-foot">
        <div class="tabs is-centered is-medium">
          <ul>
            <li >
              <router-link to="/">Dashboard</router-link>
            </li>
            <li >
              <a>Ejemplo de otro link pepe</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style >
  .content{
    padding: 15px 20px;
  }
</style>