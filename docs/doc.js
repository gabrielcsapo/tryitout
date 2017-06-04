(function() {
    window.onload = function() {
        // clear the description
        document.querySelector('.description').innerHTML = '';

        var words = 'Building libraries should be the main priority. Once you do that, it should be about sharing them with the world. 🎉';
        words.split('').forEach((c, i) => {
            setTimeout(() => {
                document.querySelector('.description').innerHTML = document.querySelector('.description').innerHTML + c;
            }, 50 * i);
        });

        var buttons = document.querySelectorAll('.run');
        [].forEach.call(buttons, function(button) {
          button.click();
        });
    }
}())
