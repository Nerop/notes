$(function() {
    var notes = [];
    class Note {
        constructor(task, date) {
            this.task = document.getElementById('task').value;
            this.date = document.getElementById('date').value;
        }
    }

    function get_notes(array) {

        var notes_str = localStorage.getItem('note');
        if (notes_str !== null) {
            notes = JSON.parse(notes_str);
        }
        return notes;
    }

    function add() {
        var task = document.getElementById('task').value;
        var date = document.getElementById('date').value;

        var notes = get_notes();
        notes.push(new Note());
        localStorage.setItem('note', JSON.stringify(notes));

        show();

        return false;
    }

    function remove() {
        var id = this.getAttribute('id');
        var notes = get_notes();
        notes.splice(id, 1);
        localStorage.setItem('note', JSON.stringify(notes));

        show();

        return false;
    }

    function removeOptions() {
        $('#filter')
            .find('option')
            .remove()
            .end();
    }

    function showFilteredNotes(array) {
        var filteredNotes = [];
        var html = '<ul>';
        for (i = 0; i < array.length; i++) {
            if (array[i].date == localStorage.getItem('filteredNote')) {
                filteredNotes.push(array[i]);

            }
        }
        for (var i = 0; i < filteredNotes.length; i++) {
            html += '<div class="note">' + '<div class="row text-right"><button class="btn-xs btn-danger btn-delete remove" ' + "id=" + i + '>X</button></div>' + '<div class="note-header">' + '<p>' + filteredNotes[i].task + '</p>' + '</div>' + '<div class="note-footer">' + filteredNotes[i].date + '</div></div>';
            //localStorage.setItem('filteredNote', JSON.stringify(array[i].date));
            $('#filter').append('<option>' + filteredNotes[i].date + '</option>');
        }

        html += '</ul>';
        //console.log(filteredNotes);
        document.getElementById('notes').innerHTML = html;
    }

    function show(array) {
        var array = get_notes();
        removeOptions();
        var html = '<ul>';
        for (var i = 0; i < array.length; i++) {
            html += '<div class="note">' + '<div class="row text-right"><button class="btn-xs btn-danger btn-delete remove" ' + "id=" + i + '>X</button></div>' + '<div class="note-header">' + '<p>' + array[i].task + '</p>' + '</div>' + '<div class="note-footer">' + array[i].date + '</div></div>';
            //localStorage.setItem('filteredNote', JSON.stringify(array[i].date));
            $('#filter').append('<option>' + array[i].date + '</option>');
        }

        html += '</ul>';



        document.getElementById('notes').innerHTML = html;

        var buttons = document.getElementsByClassName('remove');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', remove);
        }
    }

    document.getElementById('add').addEventListener('click', add);

    show(get_notes());

    $('.btn-add').click(function() {
        if (!$('#task').val()) {
            $('#add').prop('disabled', true);
        }
        $('.adder').css("visibility", 'visible');
        $('.btn-add').hide();
    });
    $('#add').click(function() {
        $('.adder').css("visibility", 'hidden');
        $('#task').val('');
        $('.btn-add').show();
    });
    $('#task').keyup(function() {
        if (!$(this).val()) {
            $('#add').prop('disabled', true);
        } else $('#add').prop('disabled', false);
    });
    $('#filter').change(function() {
        localStorage.setItem('filteredNote', this.value);
    });
    $('.btn-apply').click(function() {
        showFilteredNotes(notes);
    });
    $('.btn-decline').click(function () {
        show(get_notes());
    });
});
