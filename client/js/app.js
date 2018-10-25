let getChirps = () => {
    $('.tbody').empty();
    jQuery.get('/api/chirps', (data) => {
        let chirpArray = Object.keys(data).map(chirpID => {

            var chirp = data[chirpID];
            chirp.id = chirpID;
            return chirp
        });
        chirpArray.pop();
        chirpArray.reverse();
        chirpArray.forEach(chirp => {
            let newChirpDiv = $(`
               
            
                <tr>

                <td> ${chirp.id} </td>
                
                <td>${chirp.author} </td>
            
                <td>
                ${chirp.chirp}
                <button type="button" id="xbutton" class="close" aria-label="Close" data-id="${chirp.id}">
                    ×
                </button>
                </td>

               
              </tr>
             

            

            
            `);
            $('.tbody').append(newChirpDiv);
        });
        $('.close').on('click', function (e) {
            console.log(e.target.dataset.id)
            $.ajax({
                type: 'DELETE',
                url: '/api/chirps/' + e.target.dataset.id

            }).then (function(value){
                getChirps();
            })
        });
    });
};

getChirps();






$("#chirp-button").click((event) => {
    console.log('I want to delete the chirp with id');
    console.log(event.target.dataset.id)
});

$('#chirp-btn').click((e) => {
    // <button data-id = '{{id}}' class = 'remove'>X</button>
    e.preventDefault();
    //construct chirp object using method from jQuery
    let data = {
        author: $("#author").val(),
        chirp: $("#chirp").val(),
    }
    console.log(data);
    $.post("api/chirps", data)
    .then (function(value){
        getChirps();
});
})




