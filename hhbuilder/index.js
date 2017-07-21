setupListener();

function setupListener(event) {
  var addButton = document.getElementsByClassName('add');
  for (var i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener('click', validateData);
  }

  var submitButton = document.getElementsByTagName('button');
  for (var i = 0; i < submitButton.length; i++) {
    submitButton[1].addEventListener('click', serializeData);
  }
}

function validateData(event) {
  var age = document.forms[0]["age"].value;
  var relationship = document.forms[0]["rel"].value;
  var smoker;
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type.toLowerCase() == 'checkbox') {
      smoker = inputs[i];
    }
  }
  if (smoker.checked) {
    smoker = true;
  } else {
    smoker = false;
  }

  if (age == "") {
    alert("Age is required");
    event.preventDefault();
  } else if (age <= 0) {
    alert("Age must be greater than 0");
    event.preventDefault();
  } else if (relationship == "") {
    alert("Relationship is required");
    event.preventDefault();
  } else {
    addToDOM(age, relationship, smoker);
    // Allows for DOM elements to persist after clicking add
    event.preventDefault();
    // Clears the form after clicking add
    document.forms[0].reset();
  }
}

function addToDOM(age, relationship, smoker) {
  var householdList = document.createElement('div');
  householdList.className = "household";
  householdList.innerHTML = '<span class="user">age: ' + age + ', relationship: ' + relationship + ', smoker: ' + smoker + ' </span><span class="dismiss" style="color: red">&times;</span>';
  document.body.appendChild(householdList);
  setupDismiss()
}

function setupDismiss(event) {
  var removeItem = document.getElementsByClassName('dismiss');
  for (var i = 0; i < removeItem.length; i++) {
    removeItem[i].addEventListener('click', removeListItem);
  }
}

function removeListItem(event) {
  var container = event.currentTarget;
  container.parentNode.remove();
  serializeData();
}

function serializeData(event) {
  event.preventDefault();
  var debugElement = document.getElementsByClassName('debug');
  console.log(debugElement);
  var householdElement = document.getElementsByClassName('user');
  debugElement[0].innerHTML = '';
  for (var i = 0; i < householdElement.length; i++) {
    var householdText = householdElement[i].innerHTML;
    var properties = householdText.split(', ');
    var obj = {};
    properties.forEach(function(property) {
      var tup = property.split(': ');
      obj[tup[0]] = tup[1];
    });
    var json = JSON.stringify(obj);
    debugElement[0].innerHTML = debugElement[0].innerHTML + json + '\n';
    debugElement[0].style.display = 'block';
  }
}
