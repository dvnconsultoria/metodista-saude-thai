// Carry only campaign attribution, never personal information, into the guide form.
const campaign=new URLSearchParams(location.search);
document.querySelectorAll('a[href*="ebook.html"]').forEach(a=>{const u=new URL(a.href);for(const k of ['utm_source','utm_medium','utm_campaign'])if(campaign.has(k))u.searchParams.set(k,campaign.get(k));a.href=u.pathname+u.search;});
