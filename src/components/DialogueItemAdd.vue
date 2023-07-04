<template>
  <div class="tf-nc pa-1 shrink" >
    <v-btn icon="mdi-plus-box"
           @click="$emit('addItem')"
           size="small"
           density="comfortable">
    </v-btn>
  </div>
</template>

<script>

export default {
  name: 'DialogueItemAdd',
  props: {
  },
  computed: {
  },
  data: () => ({
  }),
};

</script>
