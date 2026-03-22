const getErrorHTML = (message) => {
    return `
    <html>
    <head>
        <title>Verification Failed</title>
        
    </head>
    <body>
        <div class="card">
            
            <p>${message}</p>
        </div>
    </body>
    </html>
    `;
};


const getSuccessHTML = () => {
    return `
    <html>
    <head>
        <title>Verified</title>
       
    </head>
    <body>
        <div class="card">
            <p class="success">Email Verified Successfully </p>
            
        </div>
    </body>
    </html>
    `;
};

export { getErrorHTML, getSuccessHTML };