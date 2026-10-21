/* Quality-first exercise-bank normalization.
   Do not inflate totals by renaming the same verb, person or sentence frame.
   Every displayed total must reflect actual source items. */
(function(){
  const dedupe=(list,key)=>{
    const seen=new Set();
    return (Array.isArray(list)?list:[]).filter(item=>{
      const value=key(item);
      if(seen.has(value))return false;
      seen.add(value);
      return true;
    });
  };

  if(Array.isArray(window.GERMAN_NOUNS)){
    window.GERMAN_NOUNS=dedupe(window.GERMAN_NOUNS,item=>item[1]);
  }
  if(Array.isArray(window.GERMAN_VERBS)){
    window.GERMAN_VERBS=dedupe(window.GERMAN_VERBS,item=>item.v);
  }
  if(Array.isArray(window.GERMAN_CORRECTIONS)){
    window.GERMAN_CORRECTIONS=dedupe(
      window.GERMAN_CORRECTIONS,
      item=>item.wrong+'|'+item.correct+'|'+item.rule
    );
  }
  if(window.ERROR_LAB){
    window.ERROR_LAB.spelling=dedupe(window.ERROR_LAB.spelling,item=>item.join('|'));
    window.ERROR_LAB.endings=dedupe(window.ERROR_LAB.endings,item=>item.join('|'));
    window.ERROR_LAB.natural=dedupe(window.ERROR_LAB.natural,item=>item.join('|'));
    window.ERROR_LAB.connectors=dedupe(window.ERROR_LAB.connectors,item=>item.join('|'));
  }
})();
