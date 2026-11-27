const form=document.querySelector('#ebook-form');
const params=new URLSearchParams(location.search);
const course=document.querySelector('#lead-course');
if(['oncologia','paliativos','geriatria','comparar'].includes(params.get('curso')))course.value=params.get('curso');
let requestId=crypto.randomUUID();
form?.addEventListener('submit',async event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const button=form.querySelector('button[type=submit]'),status=document.querySelector('#lead-status');
 button.disabled=true;button.textContent='Liberando seu guia…';status.textContent='';
 const data=new FormData(form);
 try{
  const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:data.get('name'),email:data.get('email'),course:data.get('course'),consent:data.get('consent')==='on',marketing:data.get('marketing')==='on',website:data.get('website'),source:params.get('origem')||document.referrer&&new URL(document.referrer).origin===location.origin&&new URL(document.referrer).pathname||'ebook',utm_source:params.get('utm_source')||'',utm_medium:params.get('utm_medium')||'',utm_campaign:params.get('utm_campaign')||'',requestId})});
  const result=await response.json();if(!response.ok)throw new Error(result.error||'Não foi possível registrar. Tente novamente.');
  document.querySelector('#lead-entry').hidden=true;const success=document.querySelector('#lead-success');success.hidden=false;success.focus();
 }catch(error){status.textContent=error.message||'Não foi possível concluir. Verifique sua conexão e tente novamente.';button.disabled=false;button.textContent='Liberar meu guia gratuito →';}
});
