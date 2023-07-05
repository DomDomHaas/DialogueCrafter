<template>
  <v-layout>
    <v-app-bar color="gray">
      <template v-slot:prepend>
        <v-app-bar-nav-icon><v-icon>mdi-forum-outline</v-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Dialogue Crafter</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-file-upload"
               variant='outlined'
               density='comfortable'
               @click="openFile" />

        <v-btn class='ml-4'
               icon="mdi-content-save"
               variant='outlined'
               density='comfortable'
               @click="saveFile"/>
      </template>
    </v-app-bar>

    <v-navigation-drawer location="right"
                         temporary
                         v-model="showCharacters"
                          >
      <CharactersView :predefined-characters="characters"
                      @charactersChange="catchCharactersChange"
      />
    </v-navigation-drawer>

    <v-main >
      <v-container fluid="" >
        <v-row justify="space-between">
          <v-col class="flex-grow-1">
            <v-icon>mdi-information</v-icon>
            {{ mainInfo }}
          </v-col>

          <v-col class="flex-grow-0">
            <v-btn @click.stop="showCharacters = !showCharacters">
              Show Characters
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <DialogueMain :dialogueList="jsonDialogues"
                          @chapterChange="catchListUpdate"/>

          </v-col>
        </v-row>

      </v-container>

      <v-snackbar v-model="showError" >
        {{ fileError }}
        <br />
        <br />
        Make sure you have select a valid JSON file.
      </v-snackbar>
    </v-main>
  </v-layout>

</template>

<script>
import DialogueMain from '@/components/DialogueMain.vue'
import { fileOpen, fileSave } from "browser-fs-access";

import CharactersView from "@/components/CharactersView.vue";

export default {
  created() {
    this.jsonDialogues = this.getInitDialogues();
  },
  mounted() {
  },
  computed: {
    characters() {
      return this.jsonDialogues.characters;
    },
  },
  methods: {
    getInitDialogues() {
      return {
        characters: [],
        chapters: [{
          id: 0,
          name: '',
          dialogues: [{
            id: 0,
            title: '',
            character: undefined,
            text: '',
            options: [],
          }],
        }],
      };
    },
    catchListUpdate(list) {
      this.jsonDialogues = list;
    },
    catchCharactersChange(newCharacters) {
      if (!this.jsonDialogues) {
        this.jsonDialogues = {};
      }

      this.jsonDialogues.characters = newCharacters;
    },
    async saveFile() {
      this.fileError = null;
      this.showError = false;

      try {
        const content = JSON.stringify(this.jsonDialogues);
        const blob = new Blob([content], {
          type: "application/json",
        });

        const defaultFileName = `pdDialog_${Date.now()}.json`;

        await fileSave(blob, {
          fileName: defaultFileName,
          extensions: ['.json'],
        });

      } catch (e) {
        this.fileError = e;
        this.showError = true
      }

    },
    async openFile() {
      this.fileError = null;
      this.showError = false;

      try {

        const jsonFile = await fileOpen([{
          description: 'JSON files',
          extensions: ['.json'],
          multiple: false,
        }]);

        const text = await jsonFile.text()

        this.jsonDialogues = JSON.parse(text);
      } catch (e) {
        this.fileError = e;
        this.showError = true
      }

    },
  },
  data: () => ({
    jsonDialogues: null,
    fileError: null,
    showError: false,
    showCharacters: false,
    mainInfo: 'Create dialogue trees, save it and import it into your game engine!',
  }),
  components: {
    CharactersView,
    DialogueMain,
  },
};
</script>

<style scoped>
/*
.mainGrid {
  height: 90%;
  width: 90%;
  border: 1px solid white;
}
*/

header {
  line-height: 1.5;
}

</style>

<style>
/* white connections for the items */
.tf-tree .tf-nc:after,
.tf-tree .tf-nc:before,
.tf-tree .tf-node-content:after,
.tf-tree .tf-node-content:before,
.tf-tree li li:before {
  border-color: #fff;
}

</style>
