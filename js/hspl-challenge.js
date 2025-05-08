// console.log("hello")

// ON SCROLL ANIMATION FOR CHALLENGES VIDEO AND TEXT  
const mychallengevideo = document.querySelector('#challenge-video');
const mychallengeobserver = new IntersectionObserver((entries) => {

    // look through all entries
    entries.forEach((entry) => {

    // if each is in view, play video, within timeout
    // play video at a time set at currentTime,
    // pause the video within 2seconds

        // console.log(entry.target);
        if (entry.isIntersecting) {

            if (entry.target.classList.contains('challenge-01')) {

                console.log("challenge-01 is in view");
                mychallengevideo.currentTime=0;
                mychallengevideo.play();
                setTimeout(function() {
                    mychallengevideo.pause();
                }, 2000);
                
            } else if (entry.target.classList.contains('challenge-02')) {

                console.log("challenge-02 is in view");
                mychallengevideo.currentTime=2;
                mychallengevideo.play();
                setTimeout(function() {
                    mychallengevideo.pause();
                }, 2000);
                
            } else if (entry.target.classList.contains('challenge-03')) {

                console.log("challenge-03 is in view");
                mychallengevideo.currentTime=3;
                mychallengevideo.play();
                setTimeout(function() {
                    mychallengevideo.pause();
                }, 2000);
                
            } else if (entry.target.classList.contains('challenge-04')) {

                console.log("challenge-04 is in view");
                mychallengevideo.currentTime=6;
                mychallengevideo.play();
                setTimeout(function() {
                    mychallengevideo.pause();
                }, 2000);
            };

        };
    });
    
  });
  
  const mychallenges = document.querySelectorAll('.observe-me-challenge');
  mychallenges.forEach((el) => {
    
      // observe every target
    mychallengeobserver.observe(el);
    
  });