/*
	Paradigm Shift by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		default:   ['1681px',   null       ],
		xlarge:    ['1281px',   '1680px'   ],
		large:     ['981px',    '1280px'   ],
		medium:    ['737px',    '980px'    ],
		small:     ['481px',    '736px'    ],
		xsmall:   ['361px',    '480px'    ],
		xxsmall:   [null,       '360px'    ]
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Hack: Enable IE workarounds.
	if (browser.name == 'ie')
		$body.addClass('is-ie');

	// Mobile?
	if (browser.mobile)
		$body.addClass('is-mobile');

	// Scrolly.
	$('.scrolly')
		.scrolly({
			offset: 100
		});

	// Polyfill: Object fit.
	if (!browser.canUse('object-fit')) {
		$('.image[data-position]').each(function() {
			var $this = $(this),
				$img = $this.children('img');
			$this
				.css('background-image', 'url("' + $img.attr('src') + '")')
				.css('background-position', $this.data('position'))
				.css('background-size', 'cover')
				.css('background-repeat', 'no-repeat');
			$img.css('opacity', '0');
		});

		$('.gallery > a').each(function() {
			var $this = $(this),
				$img = $this.children('img');
			$this
				.css('background-image', 'url("' + $img.attr('src') + '")')
				.css('background-position', 'center')
				.css('background-size', 'cover')
				.css('background-repeat', 'no-repeat');
			$img.css('opacity', '0');
		});
	}

	// Gallery.
	$('.gallery')
		.on('click', 'a', function(event) {
			var $a = $(this),
				$gallery = $a.parents('.gallery'),
				$modal = $gallery.children('.modal'),
				$modalImg = $modal.find('img'),
				href = $a.attr('href');

			if (!href.match(/\.(jpg|gif|png|mp4)$/)) return;
			event.preventDefault();
			event.stopPropagation();
			if ($modal[0]._locked) return;
			$modal[0]._locked = true;
			$modalImg.attr('src', href);

			// Preencher dados adicionais (título, descrição e preço)
			$modal.find('.modal-title').text($a.data('title') || '');
			$modal.find('.modal-description').text($a.data('description') || '');
			$modal.find('.modal-price').text($a.data('price') ? 'R$ ' + parseFloat($a.data('price')).toFixed(2) : '');

			$modal.addClass('visible');
			$modal.focus();

			setTimeout(function() {
				$modal[0]._locked = false;
			}, 600);
		})
		.on('click', '.modal', function(event) {
			var $modal = $(this),
				$modalImg = $modal.find('img');
			if ($modal[0]._locked || !$modal.hasClass('visible')) return;
			event.stopPropagation();
			$modal[0]._locked = true;
			$modal.removeClass('loaded');
			setTimeout(function() {
				$modal.removeClass('visible');
				setTimeout(function() {
					$modalImg.attr('src', '');
					$modal[0]._locked = false;
					$body.focus();
				}, 475);
			}, 125);
		})
		.on('keypress', '.modal', function(event) {
			if (event.keyCode == 27)
				$(this).trigger('click');
		})
		.on('mouseup mousedown mousemove', '.modal', function(event) {
			event.stopPropagation();
		})
		.prepend(`
			<div class="modal" tabIndex="-1">
				<div class="inner" style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
					<img src="" style="max-width: 600px; width: 100%; height: auto;" />
					<div class="info" style="max-width: 300px;">
						<h2 class="modal-title"></h2>
						<p class="modal-description"></p>
						<p class="modal-price" style="font-weight: bold;"></p>
					</div>
				</div>
			</div>
		`)
		.find('img')
			.on('load', function(event) {
				var $modalImg = $(this),
					$modal = $modalImg.parents('.modal');
				setTimeout(function() {
					if (!$modal.hasClass('visible')) return;
					$modal.addClass('loaded');
				}, 275);
			});

})(jQuery);
