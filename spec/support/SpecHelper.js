beforeEach(function() {
  this.addMatchers({
    toBeEmpty: function() {
      return this.actual.length < 1;
    },

    toBeNonEmpty: function() {
      return this.actual.length > 0;
    }
  });
});
