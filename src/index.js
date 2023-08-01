// write your code here
let ramenList;

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(ramens => {
        //console.log(ramens);
        
        ramenList = ramens;
        displayRamenMenu();
   
    })
    .catch(error => console.log(error));
});

function displayRamenMenu() {
    const divRamens = document.getElementById('ramen-menu');
    divRamens.innerHTML = '';
    for (let i = 0; i < ramenList.length; i++) {
        const img = document.createElement('img');
        img.src = ramenList[i].image;
        img.title = img.alt = ramenList[i].name;
        img.addEventListener('click', e => onClickImg(e));
        const pIdx = document.createElement('p');
        pIdx.textContent = i.toString();
        pIdx.hidden = true;
        divRamens.append(img, pIdx);
    }
}

function onClickImg(e) {
    //console.log(e);
    const idx = parseInt(e.target.nextSibling.textContent, 10);
    const divRamenDetail = document.getElementById('ramen-detail');
    divRamenDetail.children[0].src = ramenList[idx].image;
    divRamenDetail.children[0].alt = ramenList[idx].name;
    divRamenDetail.children[1].textContent = ramenList[idx].name;
    divRamenDetail.children[2].textContent = ramenList[idx].restaurant;

    const spanRating = document.getElementById('rating-display');
    spanRating.textContent = ramenList[idx].rating;
    const pComment = document.getElementById('comment-display');
    pComment.textContent = ramenList[idx].comment;
}

const frmNewRamen = document.getElementById('new-ramen');
frmNewRamen.addEventListener('submit', e => {
    //console.log(e)
    e.preventDefault();

    const ramenName = document.getElementById('new-name').value;
    const ramenRestaurant = document.getElementById('new-restaurant').value;
    const ramenImg = document.getElementById('new-image').value;
    const ramenRating = parseInt(document.getElementById('new-rating').value, 10);
    const ramenComment = document.getElementById('new-comment').value;
    ramenList.push({
        id: ramenList[ramenList.length-1].id + 1,
        name: ramenName,
        restaurant: ramenRestaurant,
        image: ramenImg,
        rating: ramenRating,
        comment: ramenComment,
    });
    displayRamenMenu();

    e.target.reset();
});
