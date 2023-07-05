<template>
  <v-chip size="large" :density="density"
          class="pl-0"
          :closable="closable">

    <v-btn v-if="avatarChangeable"
           size="xs"
           density="compact"
           icon
           @click.stop="changeIconId(-1)"
    >
      <v-icon size="xs">mdi-arrow-left</v-icon>
    </v-btn>

    <v-avatar left>
      <v-img class="characterIcons"
             :style="backgroundPosition"></v-img>
    </v-avatar>

    <v-btn v-if="avatarChangeable"
           size="xs"
           density="compact"
           icon
           @click.stop="changeIconId(+1)"
    >
      <v-icon size="xs">mdi-arrow-right</v-icon>
    </v-btn>

    <div class="pl-2">
      {{ name }}
    </div>

  </v-chip>

</template>

<script>

export default {
  name: 'CharacterIcon',
  props: {
    iconId: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      default: '',
    },
    density: {
      type: String,
      default: 'comfortable'
    },
    closable: {
      type: Boolean,
      default: false,
    },
    avatarChangeable: {
      type: Boolean,
      default: false,
    },
    maxIconId: {
      type: Number,
      default: 79,
    }
  },
  computed: {
    backgroundPosition() {
      let posRow = 0;
      let posCol = 0;

      if (this.iconId > 0) {
        if (this.iconId > 7) {
          posCol = (this.iconId % 8) * -32;
        } else {
          posCol = this.iconId * -32;
        }
        posRow = Math.floor(this.iconId / 8) * -32;
      }

      return `background-position: ${posCol}px ${posRow}px;`
    },
  },
  methods: {
    changeIconId(addition) {
      let newId = this.iconId + addition;

      if (newId < 0) {
        newId = this.maxIconId;
      }
      if (newId > this.maxIconId) {
        newId = 0;
      }

      this.$emit('changeIcon', { newId, name: this.name });
    },
  },
  components: {
  },
  data: () => ({
  }),
};

</script>

<style scoped>
  .characterIcons {
    display: inline-block;
    background: white url(@/assets/1bit-portraits.png);
    height: 32px !important; width: 32px !important;
    border-radius: 50%;
  }
</style>
