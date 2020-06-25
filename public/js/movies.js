//~ -------------------------
//*         Utils
//~ -------------------------

function createMovieRow(movie) {
    var parent = document.querySelector('tbody');
    var tr = document.createElement('tr');
    tr.setAttribute('id', movie._id);

    var htmlString = "<td><button type=\"button\" name=\"remove_movie\" data-id=" + movie._id + "aria-label=\"Delete\">[X]</button></td>"
        + "<td>" + movie.title + "</td>"
        + "<td>" + movie.genre + "</td>";

    tr.innerHTML = htmlString;
    parent.appendChild(tr);

    tr.querySelector('button[name=remove_movie]').addEventListener('click', function () {
        removeMovie(movie._id);
    });
}

function removeMovieRow(id) {
    var parent = document.querySelector('tbody');
    var rowToDelete = document.getElementById(id);
    parent.removeChild(rowToDelete);
}

//~ -------------------------
//*     Http Requests
//~ -------------------------

function createNewMovie() {
    var form = document.querySelector('form[name=add_movie]');
    var data = {
        title: form.title.value,
        genre: form.genre.value
    };

    form.title.value = '';
    form.genre.value = '';

    http('POST', 'http://localhost:3000/movies/', data)
        .then(function (response) {
            var data = JSON.parse(response);
            createMovieRow(data.movie)
        })
        .catch(function (error) {
            console.log('failed', error)
        })
}

function removeMovie(id) {
    http('DELETE', 'http://localhost:3000/movies/' + id)
    .then(function (response) {
        var data = JSON.parse(response);
        removeMovieRow(data.id);
    })
    .catch(function (error) {
        console.log('failed', error);
    })
}

//~ -------------------------
//*     Event Listeners
//~ -------------------------

function initDeleteButtons() {
    var deleteBtns = document.querySelectorAll('button[name=remove_movie]');

    if (deleteBtns.length > 0) {
        deleteBtns.forEach(function (btn) { 
            btn.addEventListener('click', function () {
                removeMovie(this.getAttribute('data-id'));
            }); 
        });
    }
}

function initCreateButton() {
    var createBtn = document.querySelector('button[name=create_movie]');

    if (createBtn) {
        createBtn.addEventListener('click', createNewMovie);
    }
}

//~ -------------------------
//*         Init
//~ -------------------------

function init() {
    initCreateButton();
    initDeleteButtons();
}

window.addEventListener('load', init);