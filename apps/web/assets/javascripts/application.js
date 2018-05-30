// application.js

Vue.component("list-item", {
  props: ["item"],

  methods: {
    open_edit_modal: function(event) {
      Vue.set(this.$root.edit_modal, "item", Object.assign({}, this.item));
      Vue.set(this.$root.edit_modal, "open", true);
    },
    delete_item: function(event) {
      $.post({
        url: this.item_path,
        dataType: "json",
        data: {
          _method: "DELETE"
        },
        success: (res) => {
          Vue.set(this.$root, "items", res);
        }
      });
    }
  },

  computed: {
    item_path: function() {
      return `/items/${this.item.id}`;
    },
    edit_item_path: function() {
      return `/items/${this.item.id}/edit`;
    },
    reading_text: function() {
      if (this.item.reading === null || this.item.reading === "") {
        return this.item.character;
      } else {
        return `${this.item.character} (${this.item.reading})`;
      }
    }
  },

  template: `
    <li class="item" :id="'item-' + item.id">
      <a class="reading item-link" @click.prevent="open_edit_modal" :href="edit_item_path">
        {{ reading_text }}
      </a>

      <a class="meaning item-link" @click.prevent="open_edit_modal" :href="edit_item_path">
        {{ item.meaning }}
      </a>

      <span class="type">{{ item.type }}</span>

      <div class="item-buttons">
        <button class="btn-delete-item" type="submit" @click.prevent="delete_item">Delete</button>
      </div>
    </li>
    `
});


Vue.component("item-edit-modal", {
  props: ["item", "is_open"],

  watch: {
    is_open: function(value) {
      if (value === true) {
        $('#item-edit-modal')
          .modal({
            onHide: () => {
              Vue.set(this.$root.edit_modal, "open", false);
            }
          })
          .modal('show');
      } else {
        $('#item-edit-modal').modal('hide');
      }
    },
  },

  computed: {
    update_item_path: function() {
      return `/items/${this.item.id}`;
    }
  },

  methods: {
    update_item: function(event) {
      $.post({
        url: this.update_item_path,
        dataType: "json",
        data: {
          _method: "PATCH",
          item: {
            character: this.item.character,
            reading: this.item.reading,
            meaning: this.item.meaning
          }
        },
        success: (res) => {
          Vue.set(this.$root, "items", res);
        }
      });
      this.close();
    },
    close: function(event) {
      Vue.set(this.$root.edit_modal, "open", false);
    }
  },

  template: `
    <div id="item-edit-modal" class="item-edit-modal ui modal">
      <i class="close icon"></i>

      <div class="header">Edit {{ item.character }}</div>

      <div class="content">
        <form id="item-edit" class="item-edit-form" action="POST">
          <input type="hidden" name="_method" value="PATCH" />
          <label for="#item-character">Character</label>
          <input id="item-character" class="item-character" type="text" v-model="item.character" />
          <label for="#item-reading">Reading</label>
          <input id="item-reading" class="item-reading" type="text" v-model="item.reading" />
          <label for="#item-meaning">Meaning</label>
          <input id="item-meaning" class="item-meaning" type="text" v-model="item.meaning" />
        </form>
      </div>

      <div class="actions">
        <div class="ui button" @click="close">Cancel</div>
        <div class="ui button" @click="update_item">Update</div>
      </div>
    </div>
  `
});


$(document).ready(function() {
  window.vm = new Vue({
    el: "#app",

    data: {
      edit_modal: {
        open: false,
        item: {}
      },
      items: [],
    },

    created: function() {
      $.get({
        url: "/items",
        dataType: "json",
        success: (data) => {
          this.items = data;
        }
      })
    }
  });
});


$(document).on("click", "#item-submit", function(event) {
  event.preventDefault();
  let character = $("#item-character");

  $.post({
    url: "/items",
    dataType: "json",
    data: {
      item: {
        character: character.val()
      }
    },
    success: (res) => {
      Vue.set(window.vm, "items", res);
      character.val(null);
    }
  });
});
