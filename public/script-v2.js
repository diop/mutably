const url = 'http://mutably.herokuapp.com'
const resource  = '/albums/'

// Controllers
$(document).ready(function(){
  getAllAlbums();
  $(document).on('click', '.delete-btn', CONTROLLER.deleteAlbum)
  $(document).on('click', '.edit-btn', CONTROLLER.showModal)
  $(document).on('click', '.close-btn', CONTROLLER.hideModal)
  $(document).on('click', '.save-changes-btn', CONTROLLER.saveChanges)
})

// Global Vars
var ELEMENTS = {
  modalContent: function () { return $('.modal-content')},
  editButtons: function() { return $('.edit-btn')},
  albumEditForm: function() { return $('.album-edit-form')}
}

var DATA = {
  fetchAlbums: function(){
    fetch(url + resource, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
      'Content-Type': 'application/json'
      })
    })
    .then(checkStatus)
    .then(getJSON)
    .catch(err => console.log(err))
  },

  updateAlbum: function(){
    fetch(url + id, {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json',
    		'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        _id: albumId,
        artistName: artist,
        name: name,
        releaseDate: releaseDate,
        __v: version,
        genres: genres
      })
    }).then(checkStatus)
      .catch(err => console.log(err))
  }
}

var CONTROLLER = {
  /*
    0. add a click handler to the update button
    1. Extract data from the form
    2. Pass the data to my DATA function, and make an API call to update the data
    3. On success, update the UI
  */
  updateAlbum: function(event) {
    var updatedAlbum = extractAlbumFromEditForm()
    DATA.updateAlbum(updatedAlbum)
    .then(function(response) {
      UI.updateAlbum()
    })
  },
  /*
    1.
    2.
    3.
  */
  deleteAlbum: function() {}
}

var UI = {
  showAlbums: function(albums){
    albums.forEach( album => {
      $(".list-group")
        .append(`
        <li class="list-group-item"
          data-id="${album._id}"
          data-artist="${album.artistName}"
          data-name="${album.name}"
          data-release="${album.releaseDate}"
          data-version="${album.__v}"
          data-genres="${album.genres}"
        >
        ${JSON.stringify(album.name)}
         <i class="fa fa-trash-o" aria-hidden="true"></i>
         <a class="edit-btn" data-toggle="modal" data-target="#musicModal"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
        </li>
         `);
    })
  }
  updateAlbum: function(album) {
  /* DOM manipulation */
  },

  addAlbum: function(album) {
  },

  deleteAlbum: function() {}
}
