export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const code = url.pathname.slice(1); // حذف اسلش اول
    
    // اگر آدرس دقیقاً ۶ کاراکتر داشت (کد لینک)
    if (code.length === 6) {
        try {
            // از localStorage شبیه‌سازی میکنیم
            // در حالت واقعی باید از KV استفاده کنیم
            const links = [
                // اینجا لینک‌های تست رو میتونی قرار بدی
                { short: "abc123", original: "https://google.com" }
            ];
            const link = links.find(l => l.short === code);
            
            if (link) {
                return Response.redirect(link.original, 302);
            }
        } catch (error) {
            console.error('Error redirecting:', error);
        }
    }
    
    // اگر کد پیدا نشد، به صفحه اصلی برو
    return Response.redirect('https://tiny-link.pages.dev', 302);
}