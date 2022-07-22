    //upload and download image
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const p = document.getElementById('p');
    const btn = document.getElementById('hidden');


    canvas.width = p.width;
    canvas.height = p.height;
    ctx.drawImage(p,0,0);

    const reader = new FileReader();
    const img = new Image();

    const uploadImage = (e) => {
        reader.onload = () => {
            img.onload = () => {

                if(img.width<canvas.width){
                    canvas.width = img.width;
                    canvas.height = img.height;
                }
                
                ctx.clearRect(0,0, canvas.width, canvas.height); 
                ctx.drawImage(img,0,0);
            };
            img.src = reader.result;
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

    //crop image


