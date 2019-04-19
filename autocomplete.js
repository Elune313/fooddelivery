function autocomplete(input, items, callback) {
  var currentFocus;

  /*execute a function when someone writes in the text field:*/
  input.addEventListener("input", function(e) {
      var val = this.value;
      closeAllLists();
      if (!val) { 
        return false;
      }
      currentFocus = -1;
      
      var autocompleteList = document.createElement("DIV");
      autocompleteList.setAttribute("id", this.id + "autocomplete-list");
      autocompleteList.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(autocompleteList);
      
      items.forEach(function(item, index) {
        if (item.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          listItem = document.createElement("DIV");
          listItem.innerHTML = "<strong>" + item.substr(0, val.length) + "</strong>";
          listItem.innerHTML += item.substr(val.length);
          item = item.replace(/'/g, "&apos;");
          listItem.innerHTML += "<input type='hidden' value='" + item + "'>";
          listItem.addEventListener("click", function(e) {
            input.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
            callback(input.value);
          });
          autocompleteList.appendChild(listItem);
        }
      });
  });

  /*execute a function presses a key on the keyboard:*/
  input.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) {
        x = x.getElementsByTagName("div");
      }
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1 && x) {
          x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) {
      return false;
    }
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) {
      currentFocus = 0;
    }
    if (currentFocus < 0) {
      currentFocus = (x.length - 1);
    }
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}