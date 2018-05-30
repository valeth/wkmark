<template>
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
</template>

<script>
  import Vue from "vue";

  export default {
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
  };
</script>
