var header=document.querySelector('.site-header');
var menu=document.querySelector('.menu');
if(menu&&header){menu.addEventListener('click',function(){var open=header.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰';});}

var navLinks=document.querySelectorAll('.site-header nav a');
for(var i=0;i<navLinks.length;i++){navLinks[i].addEventListener('click',function(){header.classList.remove('open');if(menu){menu.setAttribute('aria-expanded','false');menu.textContent='☰';}});}

var pageParams=new URLSearchParams(window.location.search);
var campaignParts=['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].map(function(key){return pageParams.get(key)||'';}).filter(Boolean);
var affiliateLinks=document.querySelectorAll('.outbound-offer');

for(var j=0;j<affiliateLinks.length;j++){
  (function(link){
    var destination=new URL(link.href);
    var placement=link.getAttribute('data-placement')||'unknown';
    var trackingId=['ps',placement].concat(campaignParts).join('_').replace(/[^a-zA-Z0-9_-]/g,'-').slice(0,100);
    destination.searchParams.set('tid',trackingId);
    link.href=destination.toString();

    link.addEventListener('click',function(){
      var eventData={event:'affiliate_click',link_url:this.href,link_text:this.textContent.replace(/^\s+|\s+$/g,''),link_placement:placement};
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push(eventData);
      if(window.gtag){window.gtag('event','affiliate_click',{link_url:eventData.link_url,link_text:eventData.link_text,link_placement:placement});}
    });
  })(affiliateLinks[j]);
}
