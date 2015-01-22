(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
      this.game = game;
      this.$el = $el;
      this.setupBoard();
      this.bindEvents();
  };

  View.prototype.bindEvents = function () {
      var that = this;
      this.$el.on('click', '.sq', function (event) {
          that.makeMove($(event.currentTarget));
      });
  };

  View.prototype.makeMove = function ($square) {
      try {
        this.game.playMove($square.data("pos"));
      } catch (e) {
        alert("invalid move");
        return;
      }
      var mark = this.game.currentPlayer;
      $square.text(mark);
      $square.addClass(mark).removeClass("hoverable unmarked");
      if (this.game.isOver()) {
          var $p = $("<p class='endgame'>");
          if (this.game.winner()) {
              $p.text("You win, " + mark + "!");
              $(".hoverable").removeClass("hoverable");
              $(".unmarked").attr("style", "background-color: white");
              $("." + mark).addClass("winner");
          }
          else {
              $p.text("It's a draw!");
          }
          this.$el.append($p);
          this.$el.off('click', '.sq');
      }
  };

  View.prototype.setupBoard = function () {
      for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
              var $div = $("<div class='sq hoverable unmarked'>");
              $div.data("pos", [i, j]);
              this.$el.append($div);
          }
      }
  };
})();
