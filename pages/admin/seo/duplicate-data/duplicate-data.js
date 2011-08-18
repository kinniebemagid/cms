$(function() {
	
	table = $('#table').val();
	
	$('.filter').die().live('click',function() {
		$this = $(this);
		filter = $this.attr('filter');
		$this.css('border-bottom', 'none');
		$('#'+filter).slideDown('fast');
		$(this).removeClass('filter').addClass('filter-on');
	});
	
	$('.filter-on').die().live('click',function() {
		$this = $(this);
		filter = $this.attr('filter');
		$('#'+filter).slideUp('fast',function() {
			$this.css('border-bottom', '2px solid #999');
		});
		$(this).removeClass('filter-on').addClass('filter');
		
	});
	
	$('.filter_cb').die().live('click focusout',function(e) {
		if (e.type == 'focusout') {
			$('.filter-area').slideUp('fast',function() {
				('.filter-on').css('border-bottom', '2px solid #999').removeClass('filter-on').addClass('filter');
			});
		}
		else {
			value = $(this).val()
			filter = $(this).attr('filter');
			or = $('#or').val();
			type = $(this).attr('type');
			if ($(this).attr('checked')) sw = 'on';
			else sw = 'off';
			$.post('/admin/seo/duplicate-data/ajax/filter-listing',{ sw: sw, filter: filter, type: type, value: value, or: or }, function(data){
				$('#listing').html(data);
			});
		}
	});
	
	vals = new Array();
	$('.listing_radio').die().live('click',function() {
		checked = $(this).attr('checked');
		phrase = $(this).attr('phrase');
		val = '';
		$('.listing_radio').each(function() {
			for (var i = 0; i < vals.length; i++) {
				if (checked) {
					if (vals[i] == phrase) alert('Already Selected');
					else { 
						vals.push($(this).attr('phrase'));
						val += ' '+$(this).attr('phrase');
					}
				} else {
					if (vals[i] == phrase) vals.splice(i,1);
				}
			}
		});
		
		$('#final-phrase').val(val);
	})
	
});