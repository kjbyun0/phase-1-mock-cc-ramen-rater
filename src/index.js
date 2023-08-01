// write your code here
let ramenList;
let idxRamen = -1;

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(ramens => {
        //console.log(ramens);
        
        ramenList = ramens;
        displayRamenMenu();
        if (ramenList.length > 0) {
            idxRamen = 0;
            displayRamenDetail();
        }
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
    idxRamen = parseInt(e.target.nextSibling.textContent, 10);
    displayRamenDetail();
}

function displayRamenDetail() {
    const divRamenDetail = document.getElementById('ramen-detail');
    if (ramenList.length === 0) {
        divRamenDetail.children[0].src = "./assets/image-placeholder.jpg";
        divRamenDetail.children[0].alt = "Insert Name Here";
        divRamenDetail.children[1].textContent = "-";
        divRamenDetail.children[2].textContent = "-";
    
        const spanRating = document.getElementById('rating-display');
        spanRating.textContent = "-";
        const pComment = document.getElementById('comment-display');
        pComment.textContent = "-";
    } else {
        divRamenDetail.children[0].src = ramenList[idxRamen].image;
        divRamenDetail.children[0].alt = ramenList[idxRamen].name;
        divRamenDetail.children[1].textContent = ramenList[idxRamen].name;
        divRamenDetail.children[2].textContent = ramenList[idxRamen].restaurant;
    
        const spanRating = document.getElementById('rating-display');
        spanRating.textContent = ramenList[idxRamen].rating;
        const pComment = document.getElementById('comment-display');
        pComment.textContent = ramenList[idxRamen].comment;
    }
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

document.getElementById('edit-ramen').addEventListener('submit', e => {
    e.preventDefault();

    ramenList[idxRamen].rating = parseInt(document.getElementById('edit-rating').value, 10);
    ramenList[idxRamen].comment = document.getElementById('edit-comment').value;
    displayRamenDetail();

    e.target.reset();
});

document.getElementById('delete-ramen').addEventListener('click', e => {
    console.log(e);
    ramenList.splice(idxRamen, 1);
    displayRamenMenu();
    idxRamen = (ramenList.length > 0) ? 0 : -1;
    displayRamenDetail();
});
