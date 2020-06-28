var movies = {};
movies.scrolling = false;
movies.scrollOffset = 0;
movies.scrollWidth = window.innerWidth;
movies.scrollList = document.querySelectorAll('[data-role=scroll_item]');
movies.scrollChange = 0;
//~ -------------------------
//*     Event Listeners
//~ -------------------------

movies.addScrollEvents = function () {
    var scrollContainer = document.querySelector('.scrollContainer');

    scrollContainer.addEventListener('touchstart', function (e) {
        var eventDrag;
        var scrollStart = e.touches[0].clientX;
        var scrollPosition = 0

        scrollContainer.addEventListener('touchmove', function eventDrag(e) {

            if (!movies.scrolling) {
                movies.scrolling = true;

                movies.scrollChange = e.touches[0].clientX - scrollStart;

                scrollPosition = (movies.scrollWidth * movies.scrollOffset) + (movies.scrollChange * -1);

                scrollContainer.scroll({
                    left: scrollPosition,
                    behavior: 'smooth'
                });

                setTimeout(function () { movies.scrolling = false; }, 17);
            }

        });

        scrollContainer.addEventListener('touchend', function eventEnd() {
            console.log("distance changed: ", movies.scrollChange * -1)

            if (movies.scrollChange * -1 > movies.scrollWidth / 3) {
                movies.scrollOffset++;

                var el = movies.scrollList[movies.scrollOffset];

                el.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                });
            }
            else {
                var el = movies.scrollList[movies.scrollOffset];

                el.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                });
            }

            //- Reset 
            movies.scrollChange = 0;
            scrollContainer.removeEventListener('touchmove', eventDrag);
            scrollContainer.removeEventListener('touchend', eventEnd);
        });
    });
}

//~ -------------------------
//*         Init
//~ -------------------------

movies.init = function () {
    movies.addScrollEvents();
}

window.addEventListener('load', movies.init);



// movies.addScrollEvents = function () {
//     var scrollContainer = document.querySelector('.scrollContainer');
//     var eventDrag;

//     scrollContainer.addEventListener('touchstart', function (e) {

//         var scrollStart = e.touches[0].clientX;
//         console.log('Start- scrollStart: ', scrollStart);

//         var scrollPosition = 0
//         console.log('Start- scrollPosition: ', scrollPosition);

//         scrollContainer.addEventListener('touchmove', function eventDrag(e) {

//             if (!movies.scrolling) {
//                 movies.scrolling = true;

//                 movies.scrollChange = e.touches[0].clientX - scrollStart;
//                 console.log('scrollChange: ', movies.scrollChange)

//                 scrollPosition = (movies.scrollWidth * movies.scrollIndex) + (movies.scrollChange * -1);
//                 console.log('scrollPosition: ', scrollPosition)

//                 scrollContainer.scrollBy(scrollPosition, 0);

//                 setTimeout(function () { movies.scrolling = false }, 17);
//             }
//         });

//         scrollContainer.addEventListener('touchend', function eventEnd() {
//             console.log('eventEnd')
//             console.log('distance needed: ',  movies.scrollWidth / 3, "distance changed: ", movies.scrollChange * -1, movies.scrollChange * -1 > movies.scrollWidth / 3)

//             if (movies.scrollChange * -1 > movies.scrollWidth / 3) {
//                 movies.scrollIndex++;
//                 var el = movies.scrollList[movies.scrollIndex];

//                 el.scrollIntoView({
//                     behavior: 'smooth',
//                     inline: 'start'
//                 });
//             }

//             else {
//                 var el = movies.scrollList[movies.scrollIndex];

//                 el.scrollIntoView({
//                     behavior: 'smooth',
//                     inline: 'start'
//                 });
//             }

//             scrollContainer.removeEventListener('touchmove', eventDrag);
//             scrollContainer.removeEventListener('touchend', eventEnd);
//             movies.scrollChange = 0;

//         });
//     });
// }