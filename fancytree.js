(function ($) {
console.log('loading fancytree');
Drupal.behaviors.initFancytree = {
  attach: function (context, settings) {
    if (!$.isFunction($.fancytree)) {
      return;
    }
    if(!settings.fancytree){
      settings.fancytree = {};
    }
    $('.fancytree', context)
      .once('init-fancytree')
      .fancytree(settings.fancytree);
  }
};

})(jQuery);