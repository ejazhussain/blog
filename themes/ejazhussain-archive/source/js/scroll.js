/* eslint-disable */
var customSearch;
(function ($) {

	
	//aside nav
	$(window).scroll(function () {
		var windscroll = $(window).scrollTop();
		findHeadPosition(windscroll)
		if (windscroll >= 360) {
			$(".aside-anchors").addClass("is-pinned")

		} else {
			$('.aside-anchors').removeClass("is-pinned");
		}

	});

	// find head position & add active class
	function findHeadPosition(top) {
		
		// assume that we are not in the post page if no TOC link be found,
		// thus no need to update the status
		if ($('.post-toc-link').length === 0) {
			return;
		}

		if (top < 200) {
			$('.post-toc-link').removeClass('active')
			$('.toc-child').hide()
		}
		var list = $('h1,h2,h3,h4,h5,h6')
		var currentId = ''
		list.each(function () {
			var head = $(this)
			if (top > head.offset().top - 25 - 70) {
				currentId = '#' + $(this).attr('id')
			}
		})
		var currentActive = $('.post-toc-link.active')
		if (currentId && currentActive.attr('href') !== currentId) {
			updateAnchor(currentId)

			$('.post-toc-link').removeClass('active')
			var _this = $('.post-toc-link[href="' + currentId + '"]')
			_this.addClass('active')
			var parents = _this.parents('.toc-child')
			if (parents.length > 0) {
				var child
				parents.length > 1 ? child = parents.eq(parents.length - 1).find('.toc-child') : child = parents
				if (child.length > 0 && child.is(':hidden')) {
					expandToc(child)
				}
				parents.eq(parents.length - 1).closest('.toc-item').siblings('.toc-item').find('.toc-child').hide()
			} else {
				if (_this.closest('.toc-item').find('.toc-child').is(':hidden')) {
					expandToc(_this.closest('.toc-item').find('.toc-child'))
				}
				_this.closest('.toc-item').siblings('.toc-item').find('.toc-child').hide()
			}
		}
	}

	function updateAnchor(anchor) {
        if (window.history.replaceState && anchor !== window.location.hash) {
            window.history.replaceState(undefined, undefined, anchor)
        }
    }

})(jQuery);