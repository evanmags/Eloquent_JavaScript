function asTabs(node) {
  const tabs = node.querySelectorAll('[data-tabname]');
  
  function change_tab(e){
      document.querySelectorAll('button').forEach(b=>{
        b.style.color = b == e.target ? 'red' : '';
      });
    
    tabs.forEach(t=>{
        t.style.display =
        (t.getAttribute('data-tabname') == e.target.textContent)
            ? '' : 'none';
      })
  }
  
  tabs.forEach((t, i)=>{
    let button = document.createElement('button');
      button.textContent = t.getAttribute('data-tabname');
      button.addEventListener('click', change_tab);
      document.body.insertBefore(button, document.querySelector('tab-panel'));
      if( i > 0){
        t.style.display = 'none';
      }
  })
}