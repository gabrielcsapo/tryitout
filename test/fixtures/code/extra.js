(function () {
  window.extra = function (name) {
    return `!${name}!`
  }

  window.onload = function () {
    // clear the description
    var words = document.querySelector('.description').textContent
    document.querySelector('.description').innerHTML = ''

    var letters = words.split('')
    for (var i = 0; i < letters.length; i++) {
      setTimeout((function (c) {
        if (c === '|') {
          return function () { document.querySelector('.description').innerHTML = document.querySelector('.description').innerHTML + '</br>' }
        }
        return function () { document.querySelector('.description').innerHTML = document.querySelector('.description').innerHTML + c }
      }(letters[i])), 50 * i)
    }

    var buttons = document.querySelectorAll('.run');
    [].forEach.call(buttons, function (button) {
      button.click()
    })
  }
}())
