
fetch('config.json')
    .then(response => response.json())
    .then(data => {

        const portfolioSection = document.getElementById('portfolio');
        data.portfolio.forEach(projekt => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('portfolio-item');
            projectDiv.innerHTML = `
                <h3>${projekt.nazwa}</h3>
                <p>${projekt.opis}</p>
                <img src="${projekt.zdjecie}" alt="${projekt.nazwa}">
                <p>${data.konfiguracja.nazwyPortfolio.tagi}: ${projekt.tagi.join(', ')}</p>
            `;
            portfolioSection.appendChild(projectDiv);
        });

    
        const ratingsSection = document.getElementById('ratings');
        data.oceny.forEach(ocena => {
            const ratingDiv = document.createElement('div');
            ratingDiv.classList.add('rating-item');
            ratingDiv.innerHTML = `
                <h3>${ocena.nazwa}</h3>
                <div class="star-rating">
                    ${generateStarRating(ocena.ocena)}
                </div>
            `;
            ratingsSection.appendChild(ratingDiv);
        });

        
        const skillsSection = document.getElementById('skills');
        data.umiejetnosci.forEach((umiejetnosc, index) => {
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skill-item');
            skillDiv.innerHTML = `
                <h3>${umiejetnosc.nazwa}</h3>
                <div class="star-rating" id="rating_${index}">
                    ${generateStarRating(umiejetnosc.ocena, index)}
                </div>
            `;
            skillsSection.appendChild(skillDiv);
        });


       
        const searchContainer = document.getElementById('search-container');
        searchContainer.innerHTML = `
            <input type="text" id="tagSearch" class="search-input" placeholder="Wyszukaj po tagu...">
            <button onclick="searchByTag()">Szukaj</button>
        `;

        const contactSection = document.getElementById('contact');
        contactSection.innerHTML = `
            <h2>Kontakt</h2>
            <p>Email: ${data.kontakt.email}</p>
            <p>Telefon: ${data.kontakt.telefon}</p>
            <p>Adres: ${data.kontakt.adres}</p>
        `;
    })
    .catch(error => console.error('Błąd ładowania danych:', error));


    function generateStarRating(liczbaGwiazdek, id) {
        const maxStars = 5;
        let starsHTML = '';
    
        for (let i = 1; i <= maxStars; i++) {
            const checked = i <= liczbaGwiazdek ? 'checked' : '';
            starsHTML += `<input type="radio" name="rating_${id}" value="${i}" ${checked} disabled><label></label>`;
        }
    
        return starsHTML;
    }





function searchByTag() {
    const tagSearchInput = document.getElementById('tagSearch');
    const searchValue = tagSearchInput.value.toLowerCase();


    document.querySelectorAll('.skill-item, .rating-item').forEach(item => {
        item.style.display = 'none';
    });


    document.querySelectorAll('.skill-item, .rating-item').forEach(item => {
        const tags = item.querySelector('h3').innerText.toLowerCase(); 
        if (tags.includes(searchValue)) {
            item.style.display = 'block';
        }
    });
}
