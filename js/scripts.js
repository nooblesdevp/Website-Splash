//---navbar---
const navSlide = ()=>{
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.menu-nav');
  const navLinks = document.querySelectorAll('.menu-nav li');
  
  burger.addEventListener('click', () => {
      //toggle Nav
      nav.classList.toggle('nav-active');
      //animate links
      navLinks.forEach((link, index) => {
        if(link.style.animation) {
          link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5}s`
          }
      });
      //burger animation
      burger.classList.toggle('toggle');

  });
 
}

navSlide();

// ---form js---
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });
  // ----fun----
  (function ($) {
    $.fn.countTo = function (options) {
      options = options || {};
      
      return $(this).each(function () {
        // set options for current element
        var settings = $.extend({}, $.fn.countTo.defaults, {
          from:            $(this).data('from'),
          to:              $(this).data('to'),
          speed:           $(this).data('speed'),
          refreshInterval: $(this).data('refresh-interval'),
          decimals:        $(this).data('decimals')
        }, options);
        
        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;
        
        // references & variables that will change with each update
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data('countTo') || {};
        
        $self.data('countTo', data);
        
        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);
        
        // initialize the element with the starting value
        render(value);
        
        function updateTimer() {
          value += increment;
          loopCount++;
          
          render(value);
          
          if (typeof(settings.onUpdate) == 'function') {
            settings.onUpdate.call(self, value);
          }
          
          if (loopCount >= loops) {
            // remove the interval
            $self.removeData('countTo');
            clearInterval(data.interval);
            value = settings.to;
            
            if (typeof(settings.onComplete) == 'function') {
              settings.onComplete.call(self, value);
            }
          }
        }
        
        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };
    
    $.fn.countTo.defaults = {
      from: 0,               // the number the element should start at
      to: 0,                 // the number the element should end at
      speed: 1000,           // how long it should take to count between the target numbers
      refreshInterval: 100,  // how often the element should be updated
      decimals: 0,           // the number of decimal places to show
      formatter: formatter,  // handler for formatting the value before rendering
      onUpdate: null,        // callback method for every time the element is updated
      onComplete: null       // callback method for when the element finishes updating
    };
    
    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  }(jQuery));
  
  jQuery(function ($) {
    // custom formatting example
    $('.count-number').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
    });
    
    // start all the timers
    $('.timer').each(count);  
    
    function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
    }
  });