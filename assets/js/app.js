// چک کردن لاگین
if (localStorage.getItem('userLoggedIn') !== 'true') {
    window.location.href = 'index.html';
}

// نمایش اطلاعات کاربر
document.getElementById('userInfo').textContent = 'خوش آمدید!';

// مدیریت فرم کوتاه کردن لینک
document.getElementById('shortenForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const url = document.getElementById('url').value;
    
    try {
        // استفاده از localStorage موقت
        const shortCode = generateShortCode();
        const shortUrl = `https://https-tiny-link-pages-dev-jzzfcu.pages.dev/${shortCode}`;
        
        // نمایش نتیجه
        document.getElementById('shortUrl').value = shortUrl;
        document.getElementById('resultBox').style.display = 'block';
        showMessage('لینک با موفقیت کوتاه شد!', 'success');
        
        // ذخیره در localStorage
        const links = JSON.parse(localStorage.getItem('links') || '[]');
        links.push({
            original: url,
            short: shortCode,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('links', JSON.stringify(links));
        
    } catch (error) {
        showMessage('خطا در ایجاد لینک کوتاه', 'error');
    }
});

// توابع کمکی
function generateShortCode() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}

function copyToClipboard() {
    const shortUrl = document.getElementById('shortUrl');
    navigator.clipboard.writeText(shortUrl.value).then(() => {
        alert('لینک کپی شد!');
    });
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    window.location.href = 'index.html';

}
