<template>
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
</template>

<script>
  import Vue from "vue";

  export default {
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
  };
</script>
