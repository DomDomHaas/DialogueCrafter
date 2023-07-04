<template>
  <v-container :fluid="true"
               class="pa-2"
               style="border: 1px gray dashed; border-radius: 5px;"
               >

    <v-row align="center">

      <v-col cols="8"
             class="flex-grow-1 flex-shrink-1">
        <v-text-field :model-value="chapterName"
                      @blur="chapterName = $event.target.value"
                      label="Chapter"
                      placeholder="Pick a chapter name to reference in your game"
                      prepend-icon="mdi-book"
                      hide-details
                      density="compact"
                      class="pa-1">
        </v-text-field>
      </v-col>

      <v-col class="flex-shrink-1 flex-grow-0">
        <v-btn icon="mdi-text-box-plus"
               density="comfortable"
               @click="$emit('addChapterItem', name)" >
        </v-btn>

      </v-col>

      <v-col class="flex-shrink-0 flex-grow-1">
        Add New Dialogue
      </v-col>

      <v-col class="flex-grow-0">
        <v-btn :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-left'"
               density="compact"
               @click="expanded = !expanded" >
        </v-btn>
      </v-col>

    </v-row>

    <v-row>
      <ul v-if="expanded"
          v-for="(dialogue, index) of dialogues"
          :id="`tree_${index}`"
          style="display: flex;"
          class="tf-tree tf-gap-sm pa-2">

        <dialogue-item :id="dialogue.id"
                       :title="dialogue.title"
                       :text="dialogue.text"
                       :next="dialogue.next"
                       :children="dialogue.options"
                       :character="dialogue.character"
                       :characters="characters"
                       :key="`tree_${index}`"
                       @addItem="catchAddItem"
                       @clearItem="catchClearItem"
                       @changeProperty="catchPropertyChange"
        />
      </ul>
    </v-row>
  </v-container>


</template>

<script>
import DialogueItem from "@/components/DialogueItem.vue";

export default {
  name: 'DialogueChapter',
  props: {
    id: String,
    name: String,
    dialogues: Array,
    characters: Array,
  },
  computed: {
    chapterName: {
      get() {
        return this.name;
      },
      set(value) {
        this.changeChapterProperty('name', this.name, value);
      }
    },
  },
  methods: {
    catchAddItem({ id, title }) {
      this.$emit('addItem', { chapterName: this.chapterName, id, title });
    },
    catchClearItem({ id, title }) {
      this.$emit('clearItem', { chapterName: this.chapterName, id, title });
    },
    catchPropertyChange({ id,
                          title,
                          property,
                          oldValue,
                          newValue,
                        }) {

      this.$emit('changeProperty', {
        id,
        title,
        property,
        oldValue,
        newValue,
        chapterName: this.name,
      });

    },
    changeChapterProperty(property, oldValue, newValue) {
      this.$emit('changeChapterProperty', {
        id: this.id,
        chapterName: this.chapterName,
        property,
        oldValue,
        newValue,
      });
    },
  },
  data: () => ({
    expanded: true,
  }),
  components: {
    DialogueItem,
  },
};

</script>
