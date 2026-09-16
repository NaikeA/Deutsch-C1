(function(){
  const toolbar=document.querySelector('#selectedTextToolbar');
  const read=document.querySelector('#readSelectedText');
  const stop=document.querySelector('#stopSelectedText');
  const status=document.querySelector('#selectedTextStatus');
  if(!toolbar||!read||!stop||!status)return;
  let savedSelection='',playbackRun=0;
  const currentSelection=()=>{
    const field=document.activeElement;
    if(field&&['TEXTAREA','INPUT'].includes(field.tagName)&&typeof field.selectionStart==='number')return field.value.slice(field.selectionStart,field.selectionEnd).trim();
    return (window.getSelection?.().toString()||'').trim()
  };
  const rememberSelection=()=>{const text=currentSelection();if(text)savedSelection=text};
  const chunks=(text,max=220)=>{
    const result=[];
    for(const sentence of (text.replace(/\s+/g,' ').trim().match(/[^.!?;:]+[.!?;:]?|.+$/g)||[text])){
      let rest=sentence.trim();
      while(rest.length>max){let cut=rest.lastIndexOf(' ',max);if(cut<60)cut=max;result.push(rest.slice(0,cut).trim());rest=rest.slice(cut).trim()}
      if(rest)result.push(rest)
    }
    return result
  };
  const nativeBridge=()=>typeof window.Capacitor?.nativePromise==='function'?window.Capacitor:null;
  const browserSpeak=(parts,index,run)=>{
    if(run!==playbackRun)return;
    if(index>=parts.length){read.classList.remove('speaking');status.textContent='Vorlesen beendet ✓';return}
    const utterance=new SpeechSynthesisUtterance(parts[index]);utterance.lang='de-DE';utterance.rate=.9;
    const voices=speechSynthesis.getVoices?.()||[];utterance.voice=voices.find(v=>(v.lang||'').toLowerCase().startsWith('de'))||null;
    utterance.onstart=()=>{status.textContent=`Vorlesen: Teil ${index+1} von ${parts.length}`;read.classList.add('speaking')};
    utterance.onend=()=>browserSpeak(parts,index+1,run);
    utterance.onerror=event=>{read.classList.remove('speaking');status.textContent=`Sprachausgabe fehlgeschlagen${event.error?' ('+event.error+')':''}.`};
    speechSynthesis.speak(utterance)
  };
  document.addEventListener('selectionchange',rememberSelection);
  document.addEventListener('select',rememberSelection,true);
  document.addEventListener('mouseup',rememberSelection,true);
  document.addEventListener('keyup',rememberSelection,true);
  document.addEventListener('touchend',()=>setTimeout(rememberSelection,0),true);
  read.onclick=async event=>{
    event.stopImmediatePropagation();rememberSelection();
    const text=savedSelection;if(!text){status.textContent='Bitte zuerst einen Text markieren.';return}
    const parts=chunks(text),run=++playbackRun;read.classList.add('speaking');status.textContent='Sprachausgabe wird gestartet …';
    const capacitor=nativeBridge();
    if(capacitor){
      try{
        await capacitor.nativePromise('TextToSpeech','stop',{}).catch(()=>{});
        for(let i=0;i<parts.length&&run===playbackRun;i++){status.textContent=`Vorlesen: Teil ${i+1} von ${parts.length}`;await capacitor.nativePromise('TextToSpeech','speak',{text:parts[i],lang:'de-DE',rate:.9,pitch:1,volume:1,voice:-1,queueStrategy:1})}
        if(run===playbackRun)status.textContent='Vorlesen beendet ✓'
      }catch(error){status.textContent='Android-Sprachausgabe fehlgeschlagen. Bitte installiere oder aktiviere eine deutsche Stimme.'}
      finally{if(run===playbackRun)read.classList.remove('speaking')}
      return
    }
    if(!('speechSynthesis'in window)){read.classList.remove('speaking');status.textContent='Dieser Browser stellt keine Sprachausgabe bereit.';return}
    speechSynthesis.cancel();setTimeout(()=>browserSpeak(parts,0,run),80)
  };
  stop.onclick=event=>{event.stopImmediatePropagation();playbackRun++;const capacitor=nativeBridge();if(capacitor)capacitor.nativePromise('TextToSpeech','stop',{}).catch(()=>{});if('speechSynthesis'in window)speechSynthesis.cancel();read.classList.remove('speaking');status.textContent='Sprachausgabe gestoppt.'};
  const reserve=()=>{document.body.style.paddingBottom=`${toolbar.getBoundingClientRect().height+40}px`};reserve();window.addEventListener('resize',reserve);
  status.textContent='Bereit: Text markieren und Vorlesen wählen.'
})();
