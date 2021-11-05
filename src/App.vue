<template>
  <div>
    <MyComp />
    <Drag />
    <Tes />
  </div>
</template>
<script>
  import MyComp from "./components/MyComp";
  import Drag from "./components/Drag";
  import Tes from "./components/Tes";

  export default {
    name: "App",
    components: {MyComp, Drag, Tes},
    data() {
      return {
        value: "",
      };
    },
    methods: {},
  };
</script>