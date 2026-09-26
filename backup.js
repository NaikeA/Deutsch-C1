(()=>{
  const PREFIX='deutsch-c1-';
  const FORMAT='deutsch-c1-backup';
  const status=()=>document.querySelector('#appToolStatus');
  const setStatus=text=>{const element=status();if(element)element.textContent=text};
  const isNative=()=>!!(window.Capacitor?.isNativePlatform?.()&&window.Capacitor?.getPlatform?.()==='android');
  const pluginAvailable=plugin=>window.Capacitor?.isPluginAvailable?.(plugin)!==false;
  const nativeCall=(plugin,method,options)=>{
    const publicPlugin=window.Capacitor?.Plugins?.[plugin];
    if(publicPlugin&&typeof publicPlugin[method]==='function')return publicPlugin[method](options);
    if(typeof window.Capacitor?.nativePromise==='function')return window.Capacitor.nativePromise(plugin,method,options);
    return Promise.reject(new Error(`${plugin} ist in dieser APK nicht verfügbar`));
  };
  const missingPlugins=plugins=>plugins.filter(plugin=>!pluginAvailable(plugin));

  function collect(){
    const storage={};
    for(let index=0;index<localStorage.length;index++){
      const key=localStorage.key(index);
      if(key?.startsWith(PREFIX))storage[key]=localStorage.getItem(key);
    }
    return{format:FORMAT,version:1,exportedAt:new Date().toISOString(),storage};
  }

  function restore(text){
    const data=JSON.parse(text);
    if(data?.format!==FORMAT||!data.storage||typeof data.storage!=='object')throw new Error('invalid');
    const entries=Object.entries(data.storage).filter(([key,value])=>key.startsWith(PREFIX)&&typeof value==='string');
    if(!entries.length)throw new Error('empty');
    if(!confirm(`Dieses Backup enthält ${entries.length} gespeicherte Bereiche. Vorhandene Daten werden überschrieben. Fortfahren?`))return false;
    entries.forEach(([key,value])=>localStorage.setItem(key,value));
    return true;
  }

  function fromBase64(value){
    const bytes=Uint8Array.from(atob(String(value||'').replace(/\s/g,'')),character=>character.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  }

  async function exportBackup(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    const json=JSON.stringify(collect(),null,2);
    const date=new Date().toISOString().slice(0,10);
    const fileName=`deutsch-c1-backup-${date}.json`;

    if(isNative()){
      try{
        const missing=missingPlugins(['Filesystem','Share']);
        if(missing.length)throw new Error(`Fehlende Android-Plugins: ${missing.join(', ')}. APK neu erstellen und installieren.`);
        setStatus('Backup wird vorbereitet …');
        const saved=await nativeCall('Filesystem','writeFile',{path:fileName,data:json,directory:'CACHE',encoding:'utf8'});
        await nativeCall('Share','share',{title:'Deutsch-C1-Backup',files:[saved.uri],dialogTitle:'Backup speichern oder teilen'});
        setStatus('Backup erstellt ✓');
      }catch(error){
        const detail=String(error?.message||error||'Unbekannter Fehler');
        setStatus(`Export fehlgeschlagen: ${detail}`);
      }
      return;
    }

    const blob=new Blob([json],{type:'application/json'});
    if(typeof window.showSaveFilePicker==='function'){
      try{
        const handle=await window.showSaveFilePicker({suggestedName:fileName,types:[{description:'Deutsch-C1-Backup',accept:{'application/json':['.json']}}]});
        const writable=await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        setStatus('Backup gespeichert ✓');
        return;
      }catch(error){
        if(error?.name==='AbortError'){setStatus('Export abgebrochen');return}
      }
    }

    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;
    link.download=fileName;
    link.style.display='none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
    setStatus('Backup wurde heruntergeladen ✓');
  }

  async function importBackup(event){
    event.preventDefault();
    event.stopImmediatePropagation();

    if(isNative()){
      try{
        const missing=missingPlugins(['FilePicker']);
        if(missing.length)throw new Error(`Fehlende Android-Plugins: ${missing.join(', ')}. APK neu erstellen und installieren.`);
        setStatus('Backup-Datei auswählen …');
        const result=await nativeCall('FilePicker','pickFiles',{types:['application/json','application/octet-stream','text/plain'],limit:1,readData:true});
        const file=result?.files?.[0];
        if(!file){setStatus('Import abgebrochen');return}
        let text=file.data?fromBase64(file.data):'';
        if(!text&&file.path){
          const loaded=await nativeCall('Filesystem','readFile',{path:file.path,encoding:'utf8'});
          text=typeof loaded.data==='string'?loaded.data:'';
        }
        if(!restore(text)){setStatus('Import abgebrochen');return}
        setStatus('Backup importiert – App wird neu geladen …');
        setTimeout(()=>location.reload(),600);
      }catch(error){
        const message=String(error?.message||error||'').toLowerCase();
        setStatus(message.includes('cancel')?'Import abgebrochen':`Import fehlgeschlagen: ${String(error?.message||error||'Unbekannter Fehler')}`);
      }
      return;
    }

    const input=document.querySelector('#backupFile');
    if(!input){setStatus('Dateiauswahl konnte nicht geöffnet werden.');return}
    try{
      if(typeof input.showPicker==='function')input.showPicker();
      else input.click();
    }catch(error){
      input.click();
    }
  }

  async function fileSelected(event){
    const input=event.currentTarget;
    const file=input.files?.[0];
    if(!file)return;
    try{
      if(!restore(await file.text())){setStatus('Import abgebrochen');return}
      setStatus('Backup importiert – App wird neu geladen …');
      setTimeout(()=>location.reload(),600);
    }catch(error){
      setStatus('Diese Datei ist kein gültiges Deutsch-C1-Backup.');
    }finally{
      input.value='';
    }
  }

  const exportButton=document.querySelector('#exportBackup');
  const importButton=document.querySelector('#importBackup');
  const fileInput=document.querySelector('#backupFile');
  exportButton?.addEventListener('click',exportBackup,true);
  importButton?.addEventListener('click',importBackup,true);
  fileInput?.addEventListener('change',fileSelected,true);
})();
