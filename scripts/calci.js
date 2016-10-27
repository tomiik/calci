var Calci = {
  init: function() {
    $('#calculator .input').click(function(){
      var input;
      if(this.dataset.keyType == "digit"){
        Calci.handleInput(this.dataset.digit);
      }else if (this.dataset.keyType == "operator"){
        Calci.handleInput(this.dataset.operator);
      }else if (this.dataset.keyType == "dot"){
        Calci.handleDot();
      }else if (this.dataset.keyType == "delete"){
        Calci.handleDelete();
      }else if (this.dataset.keyType == "equals"){
        Calci.evaluateResult();
      }
    });

    $("#calculator #delete").dblclick(function(){
      Calci.handleDeleteAll();
    });

    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/'].forEach(function(digit){
      $(document).bind('keyup',digit,function(){
        Calci.handleInput(digit);
      });
    });

    $(document).bind('keyup', '.', function(){
      Calci.handleDot();
    });

    $(document).bind('keyup', 'backspace', function(){
      Calci.handleDelete();
    });

    $(document).bind('keyup', 'shift+=', function(){
      Calci.handleInput('+');
    });
    ['=', 'return'].forEach(function(key){
      $(document).bind('keyup', key, function(){
        Calci.evaluateResult();
      })
    })


  },
  handleInput: function(input){
    $("#preview").html($("#preview").html() + input);
  },
  handleDot: function(){
    lastNumber = Calci.getLastNumber();
    if(lastNumber.indexOf('.') == -1){
      if(lastNumber.length == 0){
        Calci.handleInput('0');
      }
      Calci.handleInput('.');
    }
  },
  handleDelete: function(){
    $("#preview").html($("#preview").html().slice(0,-1));
    if($("#preview").html().length == 0){
      this.clearResult();
    }
  },
  handleDeleteAll: function(){
    $("#preview").html('');
    this.clearResult();
  },
  evaluateResult: function() {
    $("#result").html(eval($("#preview").html()));
  },
  clearResult: function(){
    $("#result").html('');
  },
  getLastNumber: function(){
    str = $("#preview").html();
    regexp = /[+\-*/]?[0-9.]*$/
    matches = str.match(regexp);
    if(matches == null){
      return str;
    }else {
      regexp = /[0-9.]*$/
      matches = str.match(regexp);
      return matches[0];
    }
  }
}


$(document).ready(function(){
  Calci.init();
});
