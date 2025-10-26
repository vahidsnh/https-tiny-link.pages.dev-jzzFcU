// چک کردن لاگین
if (localStorage.getItem('userLoggedIn') !== 'true') {
    window.location.href = 'index.html';
}

// بارگذاری لینک‌ها
document.addEventListener('DOMContentLoaded', loadLinks);

function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links') || '[]');
    
    if (links.length === 0) {
        document.getElementById('emptyState').style.display = 'block';
        document.getElementById('linksTable').style.display = 'none';
    } else {
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('linksTable').style.display = 'block';
        
        const tbody = document.getElementById('linksTbody');
        tbody.innerHTML = '';
        
        links.forEach((link, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="original-url">
                    <a href="${link.original}" target="_blank">
                        ${link.original.length > 50 ? link.original.substring(0, 50) + '...' : link.original}
                    </a>
                </td>
                <td class="short-url">
                    <a href="https://https-tiny-link-pages-dev-jzzfcu.pages.dev/redirect.html?code=${link.short}" target="_blank">
                        https://https-tiny-link-pages-dev-jzzfcu.pages.dev/redirect.html?code=${link.short}
                    </a>
                </td>
                <td class="date">
                    ${new Date(link.createdAt).toLocaleDateString('fa-IR')}
                </td>
                <td class="actions">
                    <button onclick="copyLink('https://https-tiny-link-pages-dev-jzzfcu.pages.dev/redirect.html?code=${link.short}')" class="btn-copy">کپی</button>
                    <button onclick="deleteLink(${index})" class="btn-delete">حذف</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

function copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        showMessage('لینک کپی شد!', 'success');
    });
}

function deleteLink(index) {
    if (confirm('آیا از حذف این لینک مطمئن هستید؟')) {
        const links = JSON.parse(localStorage.getItem('links') || '[]');
        links.splice(index, 1);
        localStorage.setItem('links', JSON.stringify(links));
        loadLinks();
        showMessage('لینک با موفقیت حذف شد!', 'success');
    }
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

function logout() {
    localStorage.removeItem('userLoggedIn');
    window.location.href = 'index.html';
}

