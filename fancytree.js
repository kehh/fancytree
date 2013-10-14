(function($) {
  console.log('loading fancytree');
  Drupal.behaviors.initFancytree = {
    attach: function(context, settings) {
      //if (!$.isFunction($.fancytree)) {
      // return;
      // }
      if (!settings.fancytree) {
        settings.fancytree = {};
      }
      if (!settings.fancytree.selector) {
        settings.fancytree.selector = '.fancytree';
      }
      if(settings.fancytree.checkbox){
        settings.fancytree.select = function(e, data){
          console.log(data);
          console.log(data.tree.getSelectedNodes());
          var selected = data.tree.getSelectedNodes();
          for(i in selected){

          }

          var selKeys = $.map(data.tree.getSelectedNodes(), function(node){
            return node.key;
          });
          console.log(selKeys);
          $(this).parent('.fancytree-wrapper').find('input').val(JSON.stringify(selKeys));
          // $("#echoSelection3").text(selKeys.join(", "));

        }
      }
      $(settings.fancytree.selector, context).once('init-fancytree').fancytree(settings.fancytree);
    }
  };
})(jQuery);
