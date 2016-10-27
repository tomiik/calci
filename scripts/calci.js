(function(){
  var Calci = {
    init: function() {
      $('#calculator .input').click(function(){
        var input;
        if(this.dataset.keyType == "digit"){
          Calci.handleInput(this.dataset.digit);
        }else if (this.dataset.keyType == "operator"){
          Calci.handleOperator(this.dataset.operator);
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

      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(function(digit){
        $(document).bind('keyup',digit,function(){
          Calci.handleInput(digit);
        });
      });
      ['+', '-', '*', '/'].forEach(function(operator){
        $(document).bind('keyup',operator,function(){
          Calci.handleOperator(operator);
        });
      });

      $(document).bind('keyup', '.', function(){
        Calci.handleDot();
      });

      $(document).bind('keyup', 'backspace', function(){
        Calci.handleDelete();
      });

      $(document).bind('keyup', 'shift+=', function(){
        Calci.handleOperator('+');
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
    handleOperator: function(operator){
      if($("#preview").html().length == 0){
        if(operator == '-'){
          Calci.handleInput('-');
        }
      }else{
        if(Calci.isLastCharOperator()){
          Calci.handleDelete();
        }
        lastChar = Calci.getLastChar();
        if(lastChar.length != ""){
          Calci.handleInput(operator);
        }else{
          Calci.handleInput('-');
        }
      }
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
        Calci.clearResult();
      }
    },
    handleDeleteAll: function(){
      $("#preview").html('');
      Calci.clearResult();
    },
    evaluateResult: function() {
      lastChar = Calci.getLastChar();
      if(Calci.isLastCharOperator()){
        Calci.handleDelete();
      }
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
    },
    getLastChar: function() {
      str = $("#preview").html();
      if(str.length == 0){
        return str;
      }else{
        return str[str.length-1];
      }
    },
    isLastCharOperator(){
      lastChar = Calci.getLastChar();
      return ['+', '-', '*', '/'].indexOf(lastChar) != -1;
    }

  }


  $(document).ready(function(){
    Calci.init();
  });
})();
