$(document).ready(function() {
    var buttonsDiv = $('#buttons');
    var imagesDiv = $('#images');
    var imageList = ['Fallout',
                    'Elder Scrolls',
                    'Watch Dogs',
                    'Yakuza',
                    'Devil May Cry',
                    'Nioh',
                    'Dark Souls',
                    'Assassins Creed',
                    'Kingdom Hearts',
                    'Destiny']
    var imgInfoList = []
    
    function displayImage(query) {
        let api_key = "aEPt7IpsWlRDaQKubl9gd1Wrg8heKalJ",
            imgLimit = 10,
            rating = 'pg-13';

        $.ajax({ 
            url: `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&rating=${rating}&limit=${imgLimit}`,
            method: 'GET'
        }).then(function(response) {
            response.data.forEach(function(gif,idx) {
                imgInfo = {
                    name: (query+idx),
                    rating: gif.rating,
                    preview: gif.images['480w_still'].url,
                    mp4: gif.images['original'].url
                }
                imgInfoList.push(imgInfo);
                //console.log(imgInfoList);
                addImage(imgInfo.name,imgInfo.preview,imgInfo.rating);
            })
        })
    }

    function addImageButton(img) {
        let no_spc_res = img.replace(/\s/g, '');
        let buttonElem = $(`<button>`).addClass('img-btn').attr('value',no_spc_res).html(img);
        buttonsDiv.append(buttonElem);
    }

    function addImage(img_name,img_url,rating) {
         imagesDiv.append(`<div class='img-with-txt'>Rating: ${rating}<br><img name='${img_name}' src='${img_url}'></div>`);
    }

    function renderButtons() {
        buttonsDiv.empty();

        imageList.forEach(function(img){
            addImageButton(img);
        })  
    }

    function checkInput()
    {
        $('body').on('click','.img-btn', function() {
            displayImage($(this).attr('value'));
        })

        $('body').on('click','img', function() {
            let imgName = $(this).attr('name');
            //console.log(imgName);

            let isPlaying = $(this).hasClass('playing');
            let index = imgInfoList.map(function (obj) {
                if(obj.name == imgName)
                    return obj.name
            }).indexOf(imgName);

            if(!isPlaying)
                $(this).attr('src',imgInfoList[index].mp4).toggleClass('playing');
            else
                $(this).attr('src',imgInfoList[index].preview).toggleClass('playing');
        })

        $('#submit').on('click',function(event) {
            event.preventDefault();
            let gameName = $('#gameName').val().trim();
            addImageButton(gameName);
        })
    }

    checkInput();
    renderButtons();

})