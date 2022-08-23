    //upload and download image
    var canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const p = document.getElementById('p');
    const btn = document.getElementById('hidden');
    var imgUploaded = false;
    const imageLoader = document.getElementById('uploader');
    var image_workspace = document.querySelector('.image-workspace img')     
    var actionButton = document.querySelectorAll('.action-button button')
    var image_workspaceSpan = document.querySelector('.image-workspace span')
    var preview_containerSpan = document.querySelector('.preview-container span')
    canvas.width = p.width;
    canvas.height = p.height;
    ctx.drawImage(p,0,0);

    var reader = new FileReader();
    var img = new Image();

    imageLoader.onchange = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
        var file = imageLoader.files[0]
        var url = window.URL.createObjectURL(new Blob([file], { type : 'image/jpg' }))
        image_workspace.src = url
        
        image_workspace.onload = () => {      
                     
            ctx.drawImage(image_workspace,0,0,canvas.width,canvas.height);
            flag = true;
                           
        
        };  
    
        image_workspaceSpan.style.display = 'none'
        preview_containerSpan.style.display = 'none'
    
    
        var options = {
            dragMode: 'move',
            preview: '.img-preview',
            viewMode: 2,
            modal: false,
            background: false,
            ready: function(){
                actionButton[0].onclick = () => {
                    cropper.getCroppedCanvas().toBlob((blob) => {
                        var downloadUrl = window.URL.createObjectURL(blob)
                        var a = document.createElement('a')
                        a.href = downloadUrl
                        // a.download = 'cropped-image.jpg' // output image name
                        // a.click()
                        // actionButton[1].innerText = 'Listo' 
                        
                        img.src = a.href
        
                        img.onload = () => {      
                                    
                            ctx.drawImage(img,0,0,canvas.width,canvas.height);
                            imgRecortada = true;            
                        
                        };
                    })
                    pre.style.visibility="visible";
                    header.style.visibility="visible";
                    modal.style.visibility="hidden"; 
                }
    
                btn.onclick = () => {
                    btn.innerText = '...'
                    canvas2.toBlob((blob) => {
                        var downloadUrl = window.URL.createObjectURL(blob)
                        var a = document.createElement('a')
                        a.href = downloadUrl
                        a.download = 'cropped-image.jpg' // output image name
                        a.click()
                        btn.innerText = 'Descargar' 
                    })
                }
            }
        }
    
        var cropper = new Cropper(image_workspace, options);
    }

    
    

    function download() {
        const image = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = image;
        link.download = 'image.png';
        link.click();
    }

    document.querySelector('button').addEventListener('click', download);


    //Cropper

    inputFile.addEventListener('click', function (){
  
        if(flag == true){
            
            pre.style.visibility="hidden";
            header.style.visibility="hidden";
            modal.style.visibility="visible";
    
            
    
            // reader.onload = () => {
            //     img.onload = () => {      
            //             ctx.clearRect(0, 0, canvas.width, canvas.height);           
            //             ctx.drawImage(img,0,0,canvas.width,canvas.height);
            //     };
            //     img.src = reader.result;
            //     flag = true;
            // };
            // reader.readAsDataURL(e.target.files[0]);
    
            // upload image
                
           
        } else {
            alert('Escoja una imagen antes de recortarla');
        }
        
               
            
    });

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

