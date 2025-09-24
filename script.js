/* ======= Precios & cálculo ======= */
    const PRICE_VIRILEX = 65000;
    const PRICE_TARDOMAX = 25000;
    const qty = document.getElementById('qtyVirilex');
    const upsell = document.getElementById('addTardomax');
    const totalSpan = document.getElementById('grandTotal');
    const hiddenTotal = document.getElementById('hiddenTotal');

    function fmt(n){return new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n)}
    function calc(){
      let q = parseInt(qty.value)||1;
      let total = q * PRICE_VIRILEX;
      if(upsell.value==='si'){ total += PRICE_TARDOMAX }
      totalSpan.textContent = fmt(total);
      hiddenTotal.value = total;
    }
    qty?.addEventListener('input',calc);
    upsell?.addEventListener('change',calc);
    calc();

   /* ======= Animaciones al entrar en viewport ======= */
    (function(){
      const els = document.querySelectorAll('.reveal');
      if(!('IntersectionObserver' in window) || !els.length) {
        els.forEach(el=>el.classList.add('is-visible'));
        return;
      }

      const io = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, {root:null, threshold:0.15, rootMargin:'0px 0px -10% 0px'});

      // Auto-stagger por contenedor
      const groups = new Map();
      document.querySelectorAll('.reveal').forEach(el=>{
        const parent = el.closest('.section') || el.parentElement;
        if(!groups.has(parent)) groups.set(parent, 0);
        const idx = groups.get(parent);
        if(!el.style.getPropertyValue('--delay')) el.style.setProperty('--delay', (idx*120)+'ms');
        groups.set(parent, idx+1);
        io.observe(el);
      });
    })();


        /* ======= Drawer ======= */
    const backdrop=document.getElementById('backdrop');
    const drawer=document.getElementById('drawer');
    function openDrawer(){drawer.classList.add('open');backdrop.classList.add('show');calc();}
    function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('show');}
    document.getElementById('openDrawer2').onclick=openDrawer;
    document.getElementById('closeDrawer').onclick=closeDrawer;
    backdrop.onclick=closeDrawer;
