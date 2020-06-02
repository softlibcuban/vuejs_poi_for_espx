<template>
  <div class="box">
    <span class="icon has-text-info">
      <i class="fa fa-2x fa-thermometer-half"></i>
    </span>
    <span class="has-text-info fa-2x">25 C</span>
    <span class="has-text-info fa-2x">|</span>

    <span class="icon has-text-info">
      <i class="fa fa-2x fa-wind"></i>
    </span>
    <span class="has-text-info fa-2x">55 %</span>
  </div>
</template>
<script>
export default {
    name: "DhtFullTxt",
    props: [
        'temp',
        'hum'
    ]
}
</script>