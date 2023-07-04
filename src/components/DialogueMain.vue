<template>
  <v-container :fluid="true"
               class="pa-4">

    <v-row align="center" >
      <v-col class='flex-shrink-1 flex-grow-0' cols='3'>
        Characters can be used to reference the different dialogue items with the chapters.
        The characters icons are only working in the editor.
      </v-col>

      <v-col class='px-4 flex-grow-1'>
        <CharacterInput :predefined-characters="characters"
                        @changeCharacters="catchCharactersChange"/>
      </v-col>
    </v-row>

<!--    <v-row v-if="!hasChapters"
           align="center"
    >
      <v-col cols="12" class="flex-grow-0 flex-shrink-0">
        No Dialogues yet! Start with adding a chapter
      </v-col>

    </v-row>-->

    <v-row v-if="hasChapters"
           v-for="(chapter, index) of chapters"
           :key="index"
            style="flex-wrap: nowrap;" >

      <v-col cols="12" class="flex-shrink-0 flex-grow-1">
        <DialogueChapter :id="chapter.id"
                         :name="chapter.name"
                         :dialogues="chapter.dialogues"
                         :characters="characters"
                         @addItem="catchAddItem"
                         @addChapterItem="catchAddChapterItem"
                         @changeChapterProperty="catchChapterPropertyChange"
                         @changeProperty="catchPropertyChange" />
      </v-col>
    </v-row>

    <v-row align="center" >

      <v-col class="flex-shrink-1 flex-grow-0">
        <v-btn icon="mdi-notebook-plus"
               density='comfortable'
               @click="catchAddChapter" >
        </v-btn>
      </v-col>

      <v-col class="flex-grow-1 flex-shrink-0"
              cols="3">
        Add New Chapter
      </v-col>
    </v-row>

  </v-container>

</template>
<script>
import {defineComponent} from 'vue'
import DialogueChapter from "@/components/DialogueChapter.vue";
import CharacterInput from '@/components/CharacterInput.vue'
/*
import jsonDialogues from "@/../public/dialogueTest.json";
*/

export default defineComponent({
  name: "DialogueMain",
  props: {
    dialogueList: Object,
  },
  computed: {
    hasChapters() {
      return this.chapters?.length > 0;
    },
    chapters() {
      return this.myList.chapters;
    },
    characters() {
      return this.myList.characters;
    },
  },
  beforeMount() {
    if (!this.dialogueList) {
      this.catchAddChapter();
    } else {
      this.myList = this.dialogueList;
    }
  },
  watch: {
    dialogueList() {
      this.myList = this.dialogueList; // || this.getInitialDialogueList();
    }
  },
  methods: {
    catchClearItem(itemTitle) {

      this.$emit('listUpdate', this.myList);
    },
    catchAddItem({ chapterName, id, title }) {

      const listItem = this.getDialogueItemFromChapters(this.chapters, chapterName, id, title);
      this.addItemOption(listItem);

      this.$emit('listUpdate', this.myList);
    },
    catchAddChapter() {
      if (this.myList === null) {
        this.myList = this.getInitialDialogueList();
      }

      this.addChapter(this.chapters);

      this.$emit('listUpdate', this.myList);
    },
    catchAddChapterItem(chapterName) {
      const chapter = this.chapters.filter((c) => c.name === chapterName)[0] || null;
      if (chapter) {
        this.addDialogue(chapter);
        this.$emit('listUpdate', this.myList);
      }
    },
    catchPropertyChange({ id,
                          title,
                          property,
                          oldValue,
                          newValue,
                          chapterName,
                        }) {

      const listItem = this.getDialogueItemFromChapters(this.myList.chapters, chapterName, id, title);
      if (listItem) {
        listItem[property] = newValue;
        this.$emit('listUpdate', this.myList);
      }
    },
    catchChapterPropertyChange({ id,
                                 chapterName,
                                 property,
                                 oldValue,
                                 newValue,
                               }) {

      const chapter = this.chapters.filter((c) => c.id === id && c.name === chapterName)[0] || null;
      if (chapter) {
        chapter[property] = newValue;
        this.$emit('listUpdate', this.myList);
      }
    },
    catchCharactersChange({ oldValue, newValue }) {
      this.myList.characters = newValue;
      this.$emit('listUpdate', this.myList);
    },
    addChapter(chapterList) {
      if (!chapterList) {
        chapterList = [];
      }

      const newChapter = {
        id: chapterList.length,
        name: '',
      };

      this.addDialogue(newChapter);

      chapterList.push(newChapter);

      return chapterList;
    },
    addDialogue(chapter) {
      if (!chapter) {
        return;
      }

      if (!chapter.dialogues) {
        chapter.dialogues = [];
      }

      chapter.dialogues.push({
        id: chapter.dialogues.length,
        title: '',
        character: undefined,
        text: '',
        options: [],
      })
    },
    addItemOption(item) {
      if (!item) {
        return;
      }

      if (!item.options) {
        item.options = [];
      }

      item.options.push({
        id: item.options.length,
        title: '',
        text: '',
        next: ''
      })
    },
    getInitialDialogueList() {
      return {
        characters: [],
        chapters: [],
      };
    },
    getDialogueItemFromChapters(chapters, chapterName, id, itemTitle) {
      if (!chapters) {
        return null;
      }

      const chapter = chapters.filter((c) => c.name === chapterName)[0] || null;

      if (chapter) {
        const listItem = this.getDialogueItem(chapter.dialogues, id, itemTitle);
        if (listItem) {
          return listItem;
        }

      } else {
        console.error(`getDialogueItemFromChapters: Chapter not found ${chapterName}`);
      }

      return null;
    },
    getDialogueItem(list, id, itemTitle) {
      if (!list) {
        return null;
      }

      for (let i = 0; i < list.length; i++) {
        const listItem = list[i];
        if (listItem.id === id && listItem.title === itemTitle) {
          return listItem;
        }

        if (listItem.options?.length > 0) {
          const subItem = this.getDialogueItem(listItem.options, id, itemTitle);
          if (subItem) {
            return subItem;
          }
        }
      }

      return null;
    },
  },
  data: () => ({
    myList: null,
  }),
  components: { CharacterInput, DialogueChapter },
})
</script>

<style scoped>

</style>
