function sandbox(html){
  var el;

  beforeEach(function(){
    el = $(html);
    $(document.body).append(el);
  });

  afterEach(function(){
    el.remove();
    el = null;
  });
};