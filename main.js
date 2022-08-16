    //upload and download image
    var canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const p = document.getElementById('p');
    const btn = document.getElementById('hidden');
    var imgUploaded = false;

    canvas.width = p.width;
    canvas.height = p.height;
    ctx.drawImage(p,0,0);

    const reader = new FileReader();
    const img = new Image();

    const uploadImage = (e) => {
        reader.onload = () => {
            img.onload = () => {                
                ctx.clearRect(0,0, canvas.width, canvas.height); 
                ctx.drawImage(img,0,0, canvas.width, canvas.height);
            };
            img.src = reader.result;
            imgUploaded = true;
        };
        reader.readAsDataURL(e.target.files[0]);
        btn.style.visibility= "visible";

    };

    const imageLoader = document.getElementById('uploader');
    imageLoader.addEventListener('change', uploadImage);

    function download() {
        const image = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = image;
        link.download = 'image.png';
        link.click();
    }

    document.querySelector('button').addEventListener('click', download);

    //input range value

    const size = document.getElementById("size");

    size.onchange = () => {
        document.getElementById('rangeValue').innerHTML = size.value + " px";
        canvas.width = size.value;
        canvas.height = size.value;

        if(imgUploaded == true){
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
        } else if (imgInverted == true){
            ctx.globalCompositeOperation = 'difference';
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        
    }

    size.onmousemove = () => {
        document.getElementById('rangeValue').innerHTML = size.value + " px";
        canvas.width = size.value;
        canvas.height = size.value;

        if(imgUploaded == true){
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
        } else if (imgInverted == true){
            ctx.globalCompositeOperation = 'difference';
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        
    }

    //make the article draggable

    const article = document.querySelector('article');
    const move = document.getElementById('move');
    const body = document.querySelector('body')
    const imgHolder = document.getElementById('imgHolder');

    move.addEventListener('mousedown', () => {
        body.addEventListener('mousemove',update);

        window.addEventListener('mouseup', () => {
            body.removeEventListener('mousemove',update);
        });
    });

    function update(ev) {
        article.style.setProperty('left', `${ev.x - 10}px`);
        article.style.setProperty('top', `${ev.y - 10}px`);
    }

    //invert color
    var negative = document.getElementById('invert');
    var imgInverted = false;
    negative.addEventListener('click',
    function () {
        // Aplicamos el negativo de la imagen
        ctx.globalCompositeOperation = 'difference';
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        imgInverted = true;
        
    });

