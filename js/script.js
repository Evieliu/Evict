var name,age,race,attorney,type,crime,classification,sentence,crimDisp,isFeat,neighborhood,borough,searches,tco,blurb,image,caption;
var today = new Date();


function readMore() {

	// Grab all the excerpt class
	$('.excerpt').each(function () {
  		//console.log("Here");

		// Run formatWord function and specify the length of words display to viewer
		$(this).html(formatWords($(this).html(), 50));
	//	console.log($(this).html(formatWords($(this).html(), 30)));
		// Hide the extra words
		$(this).children('span').hide();
	
	// Apply click event to read more link
	}).click(function () {

		// Grab the hidden span and anchor
		var more_text = $(this).children('span.more_text');
		var ellipsis = $(this).children('span.ellipsis');
		var more_link = $(this).children('a.more_link');
			
		// Toggle visibility using hasClass
		// I know you can use is(':visible') but it doesn't work in IE8 somehow...
		if (more_text.hasClass('hide')) {
			more_text.show();
			ellipsis.hide();
			more_link.html(' Read less');		
			more_text.removeClass('hide');
		} else {
			more_text.hide();
			ellipsis.show();
			more_link.html(' Read more');			
			more_text.addClass('hide');
		}

		return false;
	
	});
}

// Accept a paragraph and return a formatted paragraph with additional html tags
function formatWords(sentence, show) {

	// split all the words and store it in an array
	var words = sentence.split(' ');
  // var words = sentence;
	var new_sentence = '';

	// loop through each word
	for (i = 0; i < words.length; i++) {

		// process words that will visible to viewer
		if (i <= show) {
			new_sentence += words[i] + ' ';
			
		// process the rest of the words
		} else {
	
			// add a span at start
			if (i == (show + 1)) new_sentence += '<span class="ellipsis">... </span><span class="more_text hide">';		

			new_sentence += words[i] + ' ';
		
			// close the span tag and add read more link in the very end
			if (words[i+1] == null) new_sentence += '</span><a href="#" class="more_link"> Read more</a>';
		} 		
	} 

	return new_sentence;

}	

function loadData(filter) {
  $('#main_content_feature').empty();
  $('#main_content_left').empty();
  $('#main_content_right').empty();

  $.getJSON('data/every.json', function(all_data) { //grab json file which is built via the database
        var data = [];
        var data_temp = [];

        if (filter != "All") {
              for (p=0; p<all_data.length;p++) {
                for (k=0; k<all_data[p].data.length;k++) {
                  if (all_data[p].data[k].crim_disp == filter) {
                    data_temp.push(all_data[p]);
                  }
                }
              }

              for (r=0; r<data_temp.length-1;r++) {
                if (data_temp[r].case_num != data_temp[r+1].case_num) {
                    data.push(data_temp[r]);
                }
              }

              if (data_temp[data_temp.length-1].case_num == data_temp[data_temp.length-2].case_num) {
                data.push(data_temp[data_temp.length-1]);
              } else {
                  data.push(data_temp[data_temp.length-1]);
              }
        } else {
          data = all_data;
        }
        
        

  			for (i=0;i<data.length;i++) {

          var item = data[i];
    			
          name = item.data[0]['name'];
          age = item.data[0]['age'];
          race = item.data[0]['race'];
          crime = item.data[0]['crime'];
          classification = item.data[0]['classification'];
          sentence = item.data[0]['sentence'];
          crimDisp = item.data[0]['crim_disp'];
          isFeat = item.featured;
          neighborhood = item.neighborhood;
          borough = item.borough;
          searches = item.searches;
          tco = item.tco;
          attorney = item.attorney;
          type = item.type;
          blurb = item.blurb;
          case_num = item.case_num;
          image = item.image;
          caption = item.caption;
    			
    			if (isFeat == "Y") {
      			
  				  if (item.data.length > 1) {
                        $("#main_content_feature").append("<div class='profile small-12 medium-12 large-12 columns'><div class='panel-body small-12 medium-12 large-12 columns card' id='"+case_num+"'><div class='small-12 medium-6 large-6 columns portrait'><img src='images/"+image+"' class='img-responsive' alt='photo' /><div class='caption'>"+caption+"</div></div><div class='info small-12 medium-6 large-6 columns'><div id='nf_names_"+i+"' class='row' data-equalizer></div><div class='feat_neighborhood'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div></div></div>");    
                      
                        for (var j = 0; j <= item.data.length-1; j++) {

                            name = item.data[j]['name'];
                            age = item.data[j]['age'];
                            race = item.data[j]['race'];
                            crime = item.data[j]['crime'];
                            classification = item.data[j]['classification'];
                            sentence = item.data[j]['sentence'];
                            crimDisp = item.data[j]['crim_disp'];
                            isFeat = item.featured;
                            neighborhood = item.neighborhood;
                            borough = item.borough;
                            searches = item.searches;
                            tco = item.tco;
                            attorney = item.attorney;
                            type = item.type;
                            blurb = item.blurb;
                            image = item.image;
                            caption = item.caption;
                                             
                            if (item.data[j]['age'] == "0" && item.data[j]['race'] == "Unknown") {
                              $('#nf_names_'+i).append("<div class='small-12 medium-12 large-12 columns name' data-equalizer-watch><div class='nf_name'>"+name+"</div><div class='nf_crim_disp'>"+crimDisp+"</div></div>");
                            } else if (item.data[j]['age'] == "0" && item.data[j]['race'] != "Unknown") {
                              $('#nf_names_'+i).append("<div class='small-12 medium-12 large-12 columns name' data-equalizer-watch><div class='nf_name'>"+name+", "+race+"</div><div class='nf_crim_disp'>"+crimDisp+"</div></div>");
                            } else if (item.data[j]['age'] != "0" && item.data[j]['race'] == "Unknown") {
                              $('#nf_names_'+i).append("<div class='small-12 medium-12 large-12 columns name' data-equalizer-watch><div class='nf_name'>"+name+", "+age+"</div><div class='nf_crim_disp'>"+crimDisp+"</div></div>");
                            } else {
                              $('#nf_names_'+i).append("<div class='small-12 medium-12 large-12 columns name' data-equalizer-watch><div class='nf_name'>"+name+", "+age+", "+race+"</div><div class='nf_crim_disp'>"+crimDisp+"</div></div>");
                            }
                        }

                } else {


                    if (item.data[0]['age'] == "0" && item.data[0]['race'] == "Unknown") {
                      $("#main_content_feature").append("<div class='profile small-12 medium-12 large-12 columns'><div class='panel-body small-12 medium-12 large-12 columns card' id='"+case_num+"'><div class='small-12 medium-6 large-6 columns portrait'><img src='images/"+image+"' class='img-responsive' alt='photo' /><div class='caption'>"+caption+"</div></div><div class='info small-12 medium-6 large-6 columns'><div class='nf_name'>"+name+"</div><div class='nf_crim_disp'>"+crimDisp+"</div><br /><div class='nf_address'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div></div></div>");
                    } else if (item.data[0]['age'] == "0" && item.data[0]['race'] != "Unknown") {
                      $("#main_content_feature").append("<div class='profile small-12 medium-12 large-12 columns'><div class='panel-body small-12 medium-12 large-12 columns card' id='"+case_num+"'><div class='small-12 medium-6 large-6 columns portrait'><img ssrc='images/"+image+"' class='img-responsive' alt='photo' /><div class='caption'>"+caption+"</div></div><div class='info small-12 medium-6 large-6 columns'><div class='nf_name'>"+name+", "+race+"</div><div class='nf_crim_disp'>"+crimDisp+"</div><br /><div class='nf_address'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div></div></div>");
                    } else if (item.data[0]['age'] != "0" && item.data[0]['race'] == "Unknown") {
                      $("#main_content_feature").append("<div class='profile small-12 medium-12 large-12 columns'><div class='panel-body small-12 medium-12 large-12 columns card' id='"+case_num+"'><div class='small-12 medium-6 large-6 columns portrait'><img src='images/"+image+"' class='img-responsive' alt='photo' /><div class='caption'>"+caption+"</div></div><div class='info small-12 medium-6 large-6 columns'><div class='nf_name'>"+name+", "+age+"</div><div class='nf_crim_disp'>"+crimDisp+"</div><br /><div class='nf_address'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div></div></div>");
                    } else {
                      $("#main_content_feature").append("<div class='profile small-12 medium-12 large-12 columns' ><div class='panel-body small-12 medium-12 large-12 columns card' id='"+case_num+"'><div class='small-12 medium-6 large-6 columns portrait'><img src='images/"+image+"' class='img-responsive' alt='photo' /><div class='caption'>"+caption+"</div></div><div class='info small-12 medium-6 large-6 columns'><div class='nf_name'>"+name+", "+age+", "+race+"</div><div class='nf_crim_disp'>"+crimDisp+"</div><br /><div class='nf_address'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div></div></div>");
                    }
               }
  				  
  				} else {

                var not_featured = [];

                for (q=0; q<data.length;q++) {
                  if (data[q].featured != "Y") {
                    not_featured.push(data[q])
                  }
                }

                var half = Math.floor(not_featured.length/2);

                if (i<=half+(data.length-not_featured.length)) {
                  $("#main_content_left").append("<div class='profile large-12 medium-12 small-12 columns' id='panel_"+i+"'></div>"); 
                } else {
                  $("#main_content_right").append("<div class='profile large-12 medium-12 small-12 columns' id='panel_"+i+"'></div>"); 
                }


                if (item.data.length > 1) {
                        $("#panel_"+i).append("<div class='panel-body card' id='"+case_num+"'><div id='nf_names_"+i+"' class='row' data-equalizer></div><div class='feat_neighborhood'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div>");


                        var victims = "";     
                      
                        for (var j = 0; j < item.data.length; j++) {

                            name = item.data[j]['name'];
                            age = item.data[j]['age'];
                            race = item.data[j]['race'];
                            crime = item.data[j]['crime'];
                            classification = item.data[j]['classification'];
                            sentence = item.data[j]['sentence'];
                            crimDisp = item.data[j]['crim_disp'];

                            if (item.data[j]['age'] == "0" && item.data[j]['race'] == "Unknown") {
                              victims += "<div class='small-12 medium-4 large-4 columns name' data-equalizer-watch><div class='nf_name'>"+name+"</div><div class='nf_crim_disp'>"+crimDisp+"</div></div>";
                            } else if (item.data[j]['age'] == "0" && item.data[j]['race'] != "Unknown") {
                              victims += "<div class='small-12 medium-4 large-4 columns name' data-equalizer-watch><div class='nf_name'>"+name+", "+race+"</div><div class='nf_crim_disp'>"+crimDisp+"</div></div>";
                            } else if (item.data[j]['age'] != "0" && item.data[j]['race'] == "Unknown") {
                              victims += "<div class='small-12 medium-4 large-4 columns name' data-equalizer-watch><div class='nf_name'>"+name+", "+age+"</div><div class='nf_crim_disp'>"+crimDisp+"</div></div>";
                            } else {
                              victims += "<div class='small-12 medium-4 large-4 columns name' data-equalizer-watch><div class='nf_name'>"+name+", "+age+", "+race+"</div><div class='nf_crim_disp'>"+crimDisp+"</div></div>";
                            };
                                             
                        }
                        
                        $('#nf_names_'+i).append(victims);
                } else {


                    if (item.data[0]['age'] == "0" && item.data[0]['race'] == "Unknown") {
                      $("#panel_"+i).append("<div class='panel-default'><div class='panel-body card' id='"+case_num+"'><div class='nf_name'>"+name+"</div><div class='nf_crim_disp'>"+crimDisp+"</div><br /><div class='nf_address'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div></div>");
                    } else if (item.data[0]['age'] == "0" && item.data[0]['race'] != "Unknown") {
                      $("#panel_"+i).append("<div class='panel-default'><div class='panel-body card' id='"+case_num+"'><div class='nf_name'>"+name+", "+race+"</div><div class='nf_crim_disp'>"+crimDisp+"</div><br /><div class='nf_address'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div></div>");
                    } else if (item.data[0]['age'] != "0" && item.data[0]['race'] == "Unknown") {
                      $("#panel_"+i).append("<div class='panel-default'><div class='panel-body card' id='"+case_num+"'><div class='nf_name'>"+name+", "+age+"</div><div class='nf_crim_disp'>"+crimDisp+"</div><br /><div class='nf_address'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div></div>");
                    } else {
                      $("#panel_"+i).append("<div class='panel-default'><div class='panel-body card' id='"+case_num+"'><div class='nf_name'>"+name+", "+age+", "+race+"</div><div class='nf_crim_disp'>"+crimDisp+"</div><br /><div class='nf_address'><span class='category'>Borough: </span>"+borough+"</div><div class='feat_others'><span class='category'>Type: </span>"+type+"</div><div class='feat_others'><span class='category'>Attorney: </span>"+attorney+"</div><div class='feat_others'><span class='category'>Temporary Closing Order: </span>"+tco+"</div><div class='feat_others'><span class='category'>Warrantless searches: </span>"+searches+"</div><br/><div class='excerpt'>"+blurb+"</div></div></div></div>");
                    }
      			   }
      			   
          }
  		
    };


      $(".card").append("<div class='back'><a>Back to top</a></div>");

      $(".back").click(function(){
        $("html, body").animate({ scrollTop: 0}, "slow");
        $('.card').css("background-color","white");
      });

       readMore();
       $('.ellipsis').show();


          $(document).foundation({
              equalizer : {
              equalize_on_stack: true
              }
          });

  });
};

$.getJSON("data/every.geojson",function(data){

      var pending = {"type": "FeatureCollection","features":[]};
      var convicted = {"type": "FeatureCollection","features":[]};
      var not_convicted = {"type": "FeatureCollection","features":[]};
      var not_prosecuted = {"type": "FeatureCollection","features":[]};
      var violation = {"type": "FeatureCollection","features":[]};
      var all = data;

      for (i=0;i<data.features.length;i++) {
        if (data.features[i].properties.CrimeDisp == "Pending") {
          pending.features.push(data.features[i]);
        } else if (data.features[i].properties.CrimeDisp == "Convicted") {
          convicted.features.push(data.features[i]);
        } else if (data.features[i].properties.CrimeDisp == "Not convicted") {
          not_convicted.features.push(data.features[i]);
        } else if (data.features[i].properties.CrimeDisp == "Not prosecuted") {
          not_prosecuted.features.push(data.features[i]);
        } else if (data.features[i].properties.CrimeDisp == "Violation") {
          violation.features.push(data.features[i]);
        }
      }


    var loadMap = function () {
        window.map = L.map("map-container",{
            scrollWheelZoom: false
        }).setView([40.731625,-73.9935087], 11);
        // L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibnlkbm1hcHMiLCJhIjoiM1dZem9aWSJ9.x22rTAWkRpNy2bOTlVe1jg', {
        //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        //     maxZoom: 14,
        //     minZoom: 11
        // }).addTo(map);

        L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
          maxZoom: 14,
          minZoom: 11
        }).addTo(map);


        window.geojsonMarkerOptions = {
        radius: 3,
        fillColor: "#F78181",
        color: "#F78181",
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.8
        };

    };

    function onEachFeature(feature, layer) {
        layer.on({
            click: scroll
        });
    };    

    function scroll(e) {
        var layer = e.target;
        var clicked = layer.feature.properties.UniqueID;

        $.getJSON('data/every.json', function(data) { 
          for (i=0;i<data.length;i++) {
            if (data[i].case_num == clicked) {
              $("html, body").animate({ scrollTop: $('#'+clicked).offset().top}, "slow");
              $('.card').css("background-color","white");
              $('#'+clicked).css("background-color","#eeeeee");
            }
          }
        });
        
    };


    loadMap();

    var dots = L.geoJson(all, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: onEachFeature
    }).addTo(map);

    $('.btn').on('click', function (e) {
      var filter = $(this).html().split('<br>')[0];
      map.removeLayer(dots);
      if (filter == "Pending") {
        dots = L.geoJson(pending, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeature
        }).addTo(map);
      } else if (filter == "Convicted") {
        dots = L.geoJson(convicted, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeature
        }).addTo(map);
      } else if (filter == "Not convicted") {
        dots = L.geoJson(not_convicted, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeature
        }).addTo(map);
      } else if (filter == "Not prosecuted") {
        dots = L.geoJson(not_prosecuted, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeature
        }).addTo(map);
      } else if (filter == "Violation") {
        dots = L.geoJson(violation, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeature
        }).addTo(map);
      } else if (filter == "All") {
        dots = L.geoJson(all, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: onEachFeature
        }).addTo(map);
      } 


    }); 

});

$(document).ready(function(){


  loadData("All");

  var windowsize = $(window).width();

  if (windowsize > 641) {
      var sticky = new Waypoint.Sticky({
          element: $('#btn_container')[0]
      });
  }



  $(".read_more").bind( "click", function() {
    
    $(".blurb_more").show();
    
  });
  
  
  $('.btn').on('click', function (e) {
    var filter = $(this).html().split('<br>')[0];
    loadData(filter);
  });
  
});