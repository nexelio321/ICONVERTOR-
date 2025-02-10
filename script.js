document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const file = document.getElementById('imageInput').files[0];
    const format = document.getElementById('formatSelect').value;

    if (file) {
        convertImage(file, format);
    }
});

function convertImage(file, format) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                link.download = `converted-image.${format}`;
                link.href = URL.createObjectURL(blob);
                link.click();
            }, `image/${format}`, 1.0);
        };
    };
    reader.readAsDataURL(file);
}
