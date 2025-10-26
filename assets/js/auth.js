// فقط در صفحه لاگین اجرا بشه
if (window.location.pathname.endsWith('index.html') || 
    window.location.pathname.endsWith('/') || 
    window.location.pathname === '' ||
    !window.location.pathname.includes('.html')) {
    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === 'admin' && password === '123456') {
            localStorage.setItem('userLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('نام کاربری یا رمز عبور اشتباه است!');
        }
    });
}

// در صفحات دیگه چک کن لاگین شده
if (window.location.pathname.endsWith('dashboard.html') || 
    window.location.pathname.endsWith('links.html')) {
    
    if (localStorage.getItem('userLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}