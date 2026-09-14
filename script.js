(function(){
  // Manila live clock
  function updateManilaTime() {

    const now = new Date();

    const time = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).format(now);

    document.querySelectorAll(".local-time").forEach((element) => {
        element.textContent = `${time} GMT+8`;
    });
}

updateManilaTime();

setInterval(updateManilaTime, 1000);

  // Home intro curtain
 	const curtain = document.querySelector(".intro-curtain");
	const introVideo = document.querySelector("#intro-video");

	if (curtain && introVideo) {

   	 introVideo.addEventListener("ended", () => {

        setTimeout(() => {
            curtain.classList.add("exit");
        }, 150);

    });

}


  // Service carousel — keeps three main cards visible at all times on desktop
  const track=document.querySelector('.carousel-track');
  if(track){
    const cards=[...track.querySelectorAll('.service-card')];
    const dots=[...document.querySelectorAll('.dot')];
    let active=0;
    const prev=document.querySelector('[data-prev]');
    const next=document.querySelector('[data-next]');
    const classes=['pos-center','pos-left','pos-right','pos-outer-left','pos-outer-right'];

    function circularDelta(i,a,n){
      let d=(i-a+n)%n;
      if(d>n/2)d-=n;
      return d;
    }

    function render(){
      const n=cards.length;
      cards.forEach((card,i)=>{
        classes.forEach(c=>card.classList.remove(c));
        const d=circularDelta(i,active,n);
        if(d===0) card.classList.add('pos-center');
        else if(d===-1) card.classList.add('pos-left');
        else if(d===1) card.classList.add('pos-right');
        else if(d===-2) card.classList.add('pos-outer-left');
        else if(d===2) card.classList.add('pos-outer-right');
      });
      dots.forEach((d,i)=>d.classList.toggle('active',i===active));
    }

    prev?.addEventListener('click',()=>{active=(active-1+cards.length)%cards.length;render()});
    next?.addEventListener('click',()=>{active=(active+1)%cards.length;render()});
    cards.forEach((card,i)=>card.addEventListener('click',()=>{active=i;render()}));
    render();
  }
})();

