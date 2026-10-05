


   $('.without-caption').magnificPopup({
     type: 'image',
     closeOnContentClick: true,
     closeBtnInside: false,
     mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     image: {
         verticalFit: true
     },
     zoom: {
         enabled: true,
         duration: 300 // don't foget to change the duration also in CSS
     }
     });

     $('.with-caption').magnificPopup({
     type: 'image',
     closeOnContentClick: true,
     closeBtnInside: false,
     mainClass: 'mfp-with-zoom mfp-img-mobile',
     image: {
         verticalFit: true,
         titleSrc: function(item) {
           return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank"></a>';
         }
     },
     zoom: {
         enabled: true
     }
   });
 

         $('.nav-link-custom').on('click',function (e) {
           // e.preventDefault();
         
           var target = this.hash,
           $target = $(target);
         
          $('html, body').stop().animate({
            'scrollTop': $target.offset().top-70
           }, 500, 'swing', function () {
            window.location.hash = target;
           });
         });
         


   $(document).ready(function(){
     $(".nav-item-2").click(function(){
       $(".collapse").removeClass("show");
     });
   });


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

      $(document).ready(function() {
    // Function to handle the smooth scroll animation
    function animateScrollContent() {
      $(".scroll-content").each(function(index) {
        // Check if the element is in the viewport
        if ($(this).offset().top < $(window).scrollTop() + $(window).height() && !$(this).hasClass("animated")) {
          // Add animation class and remove opacity
          $(this).addClass("animated");
          smoothScroll(this);
        }
      });
    }

    // Smooth scroll function using requestAnimationFrame
    function smoothScroll(element) {
      let start = null;
      const duration = 500;

      function step(timestamp) {
        if (!start) start = timestamp;

        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        element.style.opacity = percentage;
        element.style.transform = `translateX(${(-1 + percentage) * 100}%)`;

        if (progress < duration) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    // Call the function on page load
    animateScrollContent();

    // Call the function on scroll
    $(window).scroll(function() {
      animateScrollContent();
    });

    // Add class to trigger the left animation
    $(".trigger-left-animation").click(function() {
      $(".scroll-content.slide_left").addClass("triggered");
      // Call the function after adding the class
      animateScrollContent();
    });

    // Add class to trigger the right animation
    $(".trigger-right-animation").click(function() {
      $(".scroll-content.slide_right").addClass("triggered");
      // Call the function after adding the class
      animateScrollContent();
    });
  });

   $(window).scroll(function(){
       if ($(this).scrollTop() > 50) {
          $('#header_menu').addClass('newClass');
       } else {
          $('#header_menu').removeClass('newClass');
       }
   });

$(document).ready(function () {
  "use strict";

  // Function to close the form
  function closeForm() {
    $(".stickyForm").stop().hide(300);
    $(".enquiryBtn").show();
  }

  // Function to open the form
  function openForm() {
    $(".stickyForm").stop().show(300);
    $(".enquiryBtn").hide();
  }

  // Initial setup for tooltips and button click events
  $('[data-toggle="tooltip"]').tooltip();

  // Close form initially
  closeForm();

  $(".form-close").click(function() {
    closeForm();
  });

  // Click event to toggle form when clicking the button
  $(".enquiryBtn").click(function() {
    openForm();
  });

});
   $(window).scroll(function(){
       if ($(this).scrollTop() > 250) {
          $('.enquiryBtn').addClass('show-form');
       } else {
          $('.enquiryBtn').removeClass('show-form');
       }
   })



function openNav() {
  document.getElementById("mySidenav").style.height = "100%";
}


function closeNav() {
  var sideNav = document.getElementById("mySidenav");
  sideNav.style.transition = 'none'; // Disable transition
  sideNav.style.height = "0";
  // Re-enable transition after a short delay (to ensure it doesn't affect other transitions)
  setTimeout(function() {
    sideNav.style.transition = ''; // Re-enable transition
  }, 500); // Delay should match transition duration
}

