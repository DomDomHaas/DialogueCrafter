<template>
  <v-combobox v-model="characters"
              :items="predefinedCharacters"
              label="Characters"
              :placeholder="placeHolder"
              variant="underlined"
              :multiple="true"
              item-title="name"
              item-value="iconId"
              :delimiters="[',']"
              hide-details
  >
    <template v-slot:item="{ props, item }">
      <CharacterIcon v-bind="props"
                     :iconId="item?.raw.iconId"
                     :name="item?.raw.name"
                     :avatarChangeable="true"
                     @changeIcon="catchChangeIcon"
                     density="compact"
      ></CharacterIcon>
    </template>

    <template v-slot:selection="{ props, item }">
      <CharacterIcon v-bind="props"
                     :iconId="item?.raw.iconId"
                     :name="item?.raw.name"
                     density="compact"
                     closable
      ></CharacterIcon>
    </template>

    <template v-slot:no-data>
      <div class="pa-2">
        Define characters so you can assign dialogue items to them
      </div>
    </template>
  </v-combobox>

</template>

<script>
import CharacterIcon from '@/components/CharacterIcon.vue'

export default {
  name: 'CharacterInput',
  props: {
    predefinedCharacters: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    characters: {
      get() {
        return this.predefinedCharacters || [];
      },
      set(value) {
        let newValue = value;
        if (value instanceof Array) {
          newValue = value[value.length - 1];
        }

        const newCharacters = [...this.predefinedCharacters];
        newCharacters.push({
          iconId: this.defaultIconId++,
          name: newValue,
        });

        this.changeCharacters(newCharacters);
      }
    },
  },
  methods: {
    catchChangeIcon({ newId, name }) {

      const newCharacters = [...this.characters];
      const charObj = newCharacters.filter((c) => c.name === name)[0] || null;

      if (charObj) {
        charObj.iconId = newId;
        this.changeCharacters(newCharacters);
      }

    },
    changeCharacters(newValue) {
      this.$emit('changeCharacters', newValue);
    },
  },
  components: {
    CharacterIcon,
  },
  data: () => ({
    defaultIconId: 1,
    placeHolder: 'Define Characters to reference the different DialogueItems',
  }),
};

</script>
