$(document).ready(function() {
    preventSelection(document);
	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	var owl = $(".carousel");
	owl.owlCarousel({
		items : 4
	});

	$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

// text selection -
    function preventSelection(element){
        var preventSelection = false;

        function addHandler(element, event, handler){
            if (element.attachEvent)
                element.attachEvent('on' + event, handler);
            else
            if (element.addEventListener)
                element.addEventListener(event, handler, false);
        }
        function removeSelection(){
            if (window.getSelection) { window.getSelection().removeAllRanges(); }
            else if (document.selection && document.selection.clear)
                document.selection.clear();
        }
        function killCtrlA(event){
            var event = event || window.event;
            var sender = event.target || event.srcElement;

            if (sender.tagName.match(/INPUT|TEXTAREA/i))
                return;

            var key = event.keyCode || event.which;
            if (event.ctrlKey && key == 'A'.charCodeAt(0))  // 'A'.charCodeAt(0) можно заменить на 65
            {
                removeSelection();

                if (event.preventDefault)
                    event.preventDefault();
                else
                    event.returnValue = false;
            }
        }

        // не даем выделять текст мышкой
        addHandler(element, 'mousemove', function(){
            if(preventSelection)
                removeSelection();
        });
        addHandler(element, 'mousedown', function(event){
            var event = event || window.event;
            var sender = event.target || event.srcElement;
            preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
        });

        // борем dblclick
        // если вешать функцию не на событие dblclick, можно избежать
        // временное выделение текста в некоторых браузерах
        addHandler(element, 'mouseup', function(){
            if (preventSelection)
                removeSelection();
            preventSelection = false;
        });

        // борем ctrl+A
        // скорей всего это и не надо, к тому же есть подозрение
        // что в случае все же такой необходимости функцию нужно
        // вешать один раз и на document, а не на элемент
        addHandler(element, 'keydown', killCtrlA);
        addHandler(element, 'keyup', killCtrlA);
    }
    
    // tabs switch 
    
    function openTab(evt, tabName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
});