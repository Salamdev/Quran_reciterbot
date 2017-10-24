var ayah_count=[7,286,200];
$(document).ready(function(){
  $.get('surah-names.txt',function(data){
  var lines = data.split('\n');
         for(var i=0;i<lines.length;i++) {
          var el = $('<option value="'+i+'">'+lines[i]+'</option>');
            $('#surah-names').append(el);
        }
  })
  $('#surah-names').on('change',function(){
    
  })
  $('#ayah-from').attr('max',ayah_count[0]);
  $('#ayah-to').attr('max',ayah_count[0]);
})
