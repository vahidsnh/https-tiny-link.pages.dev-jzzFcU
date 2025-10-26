export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const code = url.pathname.slice(1); // حذف اسلش اول
    
    // اگر آدرس دقیقاً ۶ کاراکتر داشت (کد لینک)
    if (code.length === 6) {
        try {
            // TODO: جایگزین با KV واقعی
            // فعلاً از localStorage شبیه‌سازی میکنیم
            const links = JSON.parse(await env.LINKS.get('links') || '[]');
            const link = links.find(l => l.short === code);
            
            if (link) {
                return Response.redirect(link.original, 302);
            }
        } catch (error) {
            console.error('Error redirecting:', error);
        }
    }
    
    // اگر کد پیدا نشد، به صفحه اصلی برو
    return Response.redirect('https://tiny-app-fa.pages.dev', 302);
}