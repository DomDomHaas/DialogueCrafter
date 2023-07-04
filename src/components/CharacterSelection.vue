<template>
  <v-autocomplete v-model="character"
                  :items="characters"
                  :clearable="true"
                  label="Character"
                  placeholder="Pick a character"
                  variant="plain"
                  hide-details
                  item-title="name"
                  item-value="name" >

    <template v-slot:item="{ props, item, index }">
      <CharacterIcon v-bind="props"
                     :iconId="item?.raw.iconId"
                     :name="item?.raw.name"
      ></CharacterIcon>
    </template>

    <template v-slot:selection="{ props, item, index }">
      <CharacterIcon v-bind="props"
                     :iconId="item?.raw.iconId"
                     :name="item?.raw.name"
      ></CharacterIcon>
    </template>

    <template v-slot:no-data>
      <div class="pa-2">
        You need to provide a list of characters on the top of the chapter!
      </div>
    </template>
  </v-autocomplete>

</template>

<script>
import CharacterIcon from '@/components/CharacterIcon.vue'

export default {
  name: 'CharacterSelection',
  props: {
    iconId: {
      type: Number,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    characters: {
      type: Array,
      default: () => undefined, // ['Eddie', 'Ivon', 'Malea'],
    },
  },
  computed: {
    character: {
      get() {
        if (!this.iconId && !this.name) {
          return undefined;
        }

        return { iconId: this.iconId, name: this.name };
      },
      set(value) {
        this.$emit('changeCharacter', value);
      },
    },
  },
  methods: {
  },
  components: {
    CharacterIcon,
  },
  data: () => ({
  }),
};

</script>
