document.documentElement.style.setProperty('--blur', 0 + 'px');
document.documentElement.style.setProperty('--invert', 0 + '%');
document.documentElement.style.setProperty('--sepia', 0 + '%');
document.documentElement.style.setProperty('--saturate', 100 + '%');
document.documentElement.style.setProperty('--hue-rotate', 0 + 'deg');

const inputs = document.querySelectorAll('.filters input');
const reset = document.querySelector('.btn-reset').addEventListener('click', resUp);
const ranges = document.querySelectorAll('input[type=range]')
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const nextClick = document.querySelector('.btn-next');
let i = 0;
const download = document.getElementById('btn-save').addEventListener('click', downloadUp);
const dataURL = canvas.toDataURL("image/jpeg");
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
nextClick.addEventListener('click', getImage);
nextClick.addEventListener('click', handleUpdate);

let fill = document.documentElement.style.getPropertyValue('--blur');
console.log(fill)

function getImage() {
  const index = i % images.length;
  const imageSrc = base + images[index];
  drawImageStack(imageSrc);
  i++;
} 


function drawImageStack(src) {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.filter = fill;
      ctx.drawImage(img, 0, 0);
    };  
}

getImage();


function resUp(){
	const suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty('--blur', 0 + 'px');
	document.documentElement.style.setProperty('--invert', 0 + '%');
	document.documentElement.style.setProperty('--sepia', 0 + '%');
	document.documentElement.style.setProperty('--saturate', 100 + '%');
	document.documentElement.style.setProperty('--hue-rotate', 0 + 'deg');
	getImage()
	function getImage() {
  		const index = i % images.length - 1;
  		const imageSrc = base + images[index];
  		drawImageStack(imageSrc);
	} 
	function drawImageStack(src) {
	    const img = new Image();
	    img.src = src;
	    img.setAttribute('crossOrigin', 'anonymous');
	    img.onload = function() {
	      canvas.width = img.width;
	      canvas.height = img.height;
	      const ctx = canvas.getContext("2d");
			ctx.filter = 'blur(0px) invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg)';
			console.log(ctx.filter)
	      ctx.drawImage(img, 0, 0);
	    };
	}
	ranges.forEach((item) => {
		item.value = item.attributes.value.value;
		useSlider(item);
	});
}




function handleUpdate(){
	const suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
	let zn = document.documentElement.style.getPropertyValue('--blur');
	let invert = document.documentElement.style.getPropertyValue('--invert');
	let sepia = document.documentElement.style.getPropertyValue('--sepia');
	let saturate = document.documentElement.style.getPropertyValue('--saturate');
	let hue = document.documentElement.style.getPropertyValue('--hue-rotate');
	getImage()
	function getImage() {
  		const index = i % images.length - 1;
  		const imageSrc = base + images[index];
  		drawImageStack(imageSrc);
  		i = i;
	} 
	function drawImageStack(src) {
	    const img = new Image();
	    img.src = src;
	    img.setAttribute('crossOrigin', 'anonymous');
	    img.onload = function() {
	      canvas.width = img.width;
	      canvas.height = img.height;
	      const ctx = canvas.getContext("2d");
			ctx.filter = `blur(` + `${zn}` + `)` + '' + `invert(` + `${invert}` + `)` + '' + `sepia(` + `${sepia}` + `)` + '' + `saturate(` + `${saturate}` + `)` + '' + `hue-rotate(` + `${hue}` + `)`;
	      ctx.drawImage(img, 0, 0);
	    };
	}
}

function downloadUp(e){
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

function valueUp(){
	this.nextSibling.nextSibling.innerHTML = this.value;
}

let handleUp = inputs.forEach(input => input.addEventListener('input', valueUp))


inputs.forEach(input => input.addEventListener('input', handleUpdate));

const filtList = {
  blur: 0,
  invert: 0,
  sepia: 0,
  saturate: 100,
  hue: 0,
}

function useSlider(item){
	if(item.type !== "range"){
		return;
	}
	const value = item.valueAsNumber;
	item.nextElementSibling.value = value;

	if(item.attributes.name.value === "blur"){
		filtList.blur = value;
	}
	if(item.attributes.name.value === "invert"){
		filtList.invert = value;
	}
	if(item.attributes.name.value === "sepia"){
		filtList.sepia = value;
	}
	if(item.attributes.name.value === "saturate"){
		filtList.saturate = value;
	}
	if(item.attributes.name.value === "hue-rotate"){
		filtList.hue = value;
	}

}

const fullscreenbtn = document.querySelector('.fullscreen')
fullscreenbtn.addEventListener('click', function () {
  if(document.fullscreen){
    document.exitFullscreen()
  }else{
    document.documentElement.requestFullscreen();
  }
});
