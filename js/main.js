jQuery(document).ready(function($) {

	// If we are in the correct page
	if ($("#forth-systems").length) {

		$.get( "/ForthHub/wiki/wiki/Forth-Systems.md", function( data ) {

			var parsedData = $(micromarkdown.parse(data));

			// Creates a new column for the stars
			parsedData.find("tr:first").prepend('<th><i class="fa fa-star-o fa-lg"></i></th>');
			parsedData.find('tr:gt(0)').each(function() {

				var starCell = "";

				uri = $(this).find('a').uri();

				if (uri.domain() == "github.com") {
					github_user = uri.segment(0);
					github_repo = uri.segment(1);

					if (github_user == "search") {
						starCell = '<i class="fa fa-files-o">';

					} else if (github_repo === "undefined" ) {
						starCell = '<i class="fa fa-file-o">';

					} else {
						apiURI = "https://api.github.com/repos/"+github_user+"/"+github_repo;
						/*
						// TODO: use a cache system, and date field to no overcharge
						// the cache could be a special repo
						apiJSON = $.getJSON(apiURI);
						starCell = apiJSON.stargazers_count;
						*/
						starCell = "...";
					}
				}

				$(this).find('td').eq(0).before('<td>'+starCell+'</td>');
			});

			// Number of columns
			var colCount = 0;
			parsedData.find('tr:nth-child(1) td').each(function () {
				if ($(this).attr('colspan')) {
					colCount += +$(this).attr('colspan');
				} else {
					colCount++;
				}
			});
			//console.log(colCount);


			$( "#forth-systems" ).html( parsedData );

			$( "#forth-systems" ).find("hr");

			parsedData.closest("table").attr("class", "fs-table");
			$('.fs-table').dynatable({
				table: {
					headRowSelector: 'tr:first-child'
				}
			});
		});

		/*
		var dynatable = jQuery('#forth-systems').dynatable({
			features: {
				//paginate: true,
				recordCount: true,
				sorting: true
			}
		}).data('dynatable');
		*/



		/*
		jQuery('#search-type').change( function() {
			var value = jQuery(this).val();
			if (value === "") {
			dynatable.queries.remove("sort-type");
			} else {
			dynatable.queries.add("sort-type",value);
			}
			dynatable.process();
		});

		jQuery('#search-lang').change( function() {
			var value = jQuery(this).val();
			if (value === "") {
			dynatable.queries.remove("sort-lang");
			} else {
			dynatable.queries.add("sort-lang",value);
			}
			dynatable.process();
		});
*/

	}

});
