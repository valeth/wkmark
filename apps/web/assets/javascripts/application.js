// application.js

import Vue from "vue";
import ListItem from "./components/ListItem.vue";
import ItemEditModal from "./components/ItemEditModal.vue";

$(document).ready(function() {
  window.app = new Vue({
    el: "#app",

    data: {
      edit_modal: {
        open: false,
        item: {}
      },
      items: [],
    },

    components: {
      "list-item": ListItem,
      "item-edit-modal": ItemEditModal
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
      Vue.set(window.app, "items", res);
      character.val(null);
    }
  });
});
