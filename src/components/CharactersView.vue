<template>
  <v-container>
    <v-row>
      <v-col>
        <v-icon>mdi-face-woman</v-icon>
        {{ characterInfo }}
      </v-col>
    </v-row>

    <v-row>
      <v-col class='px-4 flex-grow-1'>
        <CharacterInput :predefined-characters="predefinedCharacters"
                        @changeCharacters="catchCharactersChange"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import CharacterInput from "@/components/CharacterInput.vue";

export default {
  name: 'CharactersView',
  props: {
    predefinedCharacters: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
  },
  methods: {
    catchCharactersChange(newCharacters) {
      this.$emit('charactersChange', newCharacters);
    },
  },
  components: {
    CharacterInput,
  },
  data: () => ({
    characterInfo: `Use characters to reference the different dialogue items within the chapters.
    The characters icons are only working in the editor.`,
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
