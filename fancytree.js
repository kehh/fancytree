(function($) {
  if(!Drupal.fancytree){
    Drupal.fancytree = {};
  }
  /**
  * Function to store the selected data
  */
  Drupal.fancytree.select = function(e) {
            var tree = $(e.target).fancytree('getTree');
            var selKeys = $.map(/*data.*/tree.getSelectedNodes(true), function(node) {
              return node.getKeyPath();
            });
            $(e.target).parent('.fancytree-wrapper').find('input.treevalue').val(JSON.stringify(selKeys));
          };
  Drupal.fancytree.create = function(e) {
          var getTree = function(selector) {
              return $(selector).fancytree('getTree');
            };
          var filterWrapper = $('<div class="filter-wrapper"></div>');
          var filter = $('<input class="filter" type="text" placeholder="Filter..." />');
          var reset = $('<button class="reset" disabled="disabled">&times;</button>');
          reset.click(e.target, function(e, eventdata) {
            e.preventDefault();
            filter.val("");
            getTree(e.data).clearFilter();
            $(this).attr('disabled', 'disabled');


          });
          filterWrapper.append(filter).append(reset);
          $(this).prepend(filterWrapper);
          filter.keyup(e.target, function(e, filterdata) {
            var tree = getTree(e.data);

            var match = $(this).val();
            if (e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === "") {
              reset.click();
              return;
            }
            // Pass text as filter string (will be matched as substring in the node title)
            var n = tree.applyFilter(match);
            reset.attr("disabled", false);
          }).focus();
        };
  Drupal.behaviors.initFancytree = {
    attach: function(context, settings) {
      //if (!$.isFunction($.fancytree)) {
      // return;
      // }
      if (!settings.fancytree) {
        settings.fancytree = {};
      }

      for (var id in settings.fancytree) {
        var setting = settings.fancytree[id];
        setting.create = Drupal.fancytree.create;
        if (setting.checkbox) {
          // Initialise the value field with the values that are actually
          // selected in the tree
          setting.init = setting.select = Drupal.fancytree.select;
        }
        var selector = '#' + id;
        var treeElement = $(selector);
        console.log(selector);
        treeElement.once(function(){
          $(this).fancytree(setting);
        });
      }
    }
  };
})(jQuery);
