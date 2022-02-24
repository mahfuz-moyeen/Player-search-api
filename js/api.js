
// spninner
var loadingDiv = document.getElementById('loading');

function showSpinner() {
  loadingDiv.style.visibility = 'visible';
}

function hideSpinner() {
  loadingDiv.style.visibility = 'hidden';
}


const displayResult = document.getElementById('search-result');
const searchButton = () => {
    displayResult.innerHTML= '';
    const inputId = document.getElementById('input-value');
    const inputValue = inputId.value;
    if(inputId.value ==""){
        displayResult.innerHTML= '';
        alert('you did not search anything');
    }
    else if(isNaN(inputValue)){

        const word = inputValue.split(' ');
        const inputUrl = word.join('%20');

        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputUrl}`
        showSpinner()
        fetch(url)
        .then(res => res.json())
        .then(data => displayPlayer(data.player))
    }
    else{
        displayResult.innerHTML= '';
        alert('enter player name')
    }
    
};

// display player 
const displayPlayer = players => { 
    hideSpinner();
    players.forEach(player => {
        console.log(player);
        const div = document.createElement('div');
        div.className = 'col'
        div.innerHTML = `
        <div class="card" style="width: 18rem; margin: 0 auto;">
            <img src="${player?.strThumb}" class="card-img-top" >
            <div class="d-flex flex-column align-items-center p-3">
                <h5 class="card-title">${player?.strPlayer}</h5>
                <p>Nationality: ${player?.strNationality}</p>
                <p>Sport: ${player?.strSport}</p>
                <p class="card-text text-center">${player.strDescriptionEN?.slice(0,50)} ...</p>
                <button class="btn btn-primary text-center">Read more</button>
            </div>
        </div>
        `
        displayResult.appendChild(div);
        
    });
};

