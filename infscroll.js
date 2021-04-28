const imageContainer = document.getElementById('imagesContainer');
const loader = document.getElementById('loader');
const apiKey = 'DhQ1XRvKzA-2kmy-rFjKGhWd0Hnx_-hhtPa1p68mwMk';
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray = [];
let totalImages = 0;
let loadedImage = 0;
let ready = false;

function loadedImages(){
	loadedImage++;
	if (loadedImage === totalImages){
		loader.hidden = true;
		ready = true;
		console.log('ready =', ready);
	}

}

function displayPhotos(){
	loadedImage = 0;
	totalImages = photosArray.length;
	console.log('Total images', totalImages);
	photosArray.forEach((photo) => {
		const item = document.createElement('a');
		item.setAttribute('href', photo.links.html);
		item.setAttribute('target', '_blank');

		const img = document.createElement('img');
		img.setAttribute('src', photo.urls.regular);
		img.setAttribute('alt', photo.alt_description);
		img.setAttribute('title', photo.alt_description);

		img.addEventListener('load', loadedImages);

		item.appendChild(img);
		imageContainer.appendChild(item);
	});
} 

async function getPhotos(){
	try{
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error){

	}
}

window.addEventListener('scroll', () => {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
		getPhotos();
	}
});

getPhotos();