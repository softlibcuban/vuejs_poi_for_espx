<template>
  <div>
    <div class="columns">
      <div class="column">
        <DhtFullTxt />
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>
<script>
import DhtFullTxt from "@/components/DhtFullTxt";

export default {
  data: () => {
    return {
      lvl: 10
    };
  },
  components: {
    DhtFullTxt
  }
};
</script>
