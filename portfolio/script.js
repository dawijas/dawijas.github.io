document.addEventListener('DOMContentLoaded', function () {
    fetch('config.json')
        .then(response => response.json())
        .then(data => {
            const portfolioSection = document.getElementById('portfolio');
            const ratingsSection = document.getElementById('ratings');
            const skillsSection = document.getElementById('skills');
            const searchContainer = document.getElementById('search-container');
            const contactSection = document.getElementById('contact');

            // Function to create a modal for displaying images
            function createImageModal(imageSrc, imageAlt) {
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.innerHTML = `
                    <span class="close-modal" onclick="closeModal()">&times;</span>
                    <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
                `;
                document.body.appendChild(modal);

                // Close the modal when the user clicks outside the image
                modal.addEventListener('click', function (e) {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
            }

            // Function to close the modal
            function closeModal() {
                const modal = document.querySelector('.modal');
                if (modal) {
                    modal.remove();
                }
            }

            // Function to open the modal with the clicked image
            function openImageModal(imageSrc, imageAlt) {
                createImageModal(imageSrc, imageAlt);
            }

            data.portfolio.forEach(projekt => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('portfolio-item');

                // Add a click event listener to each image
             // Add a click event listener to each image
projectDiv.innerHTML = `
    <h3>${projekt.nazwa}</h3>
    <p>${projekt.opis}</p>
    <img src="${projekt.zdjecie}" alt="${projekt.nazwa}" class="portfolio-image">
    <p>${data.konfiguracja.nazwyPortfolio.tagi}: ${projekt.tagi.join(', ')}</p>
`;

// Add click event listener separately
const portfolioImage = projectDiv.querySelector('.portfolio-image');
portfolioImage.addEventListener('click', () => {
    openImageModal(projekt.zdjecie, projekt.nazwa);
});
                


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

                // Dodanie obsługi zdarzeń dla gwiazdek
                skillDiv.querySelectorAll('.star-rating label').forEach(label => {
                    label.addEventListener('mouseenter', function () {
                        this.classList.add('rotate-star');
                    });

                    label.addEventListener('mouseleave', function () {
                        this.classList.remove('rotate-star');
                    });
                });
            });

            searchContainer.innerHTML = `
                <input type="text" id="tagSearch" class="search-input" placeholder="Wyszukaj po tagu...">
                <button onclick="searchByTag()">Szukaj</button>
            `;

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
});
