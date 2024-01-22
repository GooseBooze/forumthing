<script>
	function sendReply(id){
		x='document.form'+id;
		post_id = id;
		user_id = x.user_id.value;
		reply = x.user_reply.value;
		date = x.date.value;
		time = x.time.value;
		if(window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}else{
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
		
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				document.getElementById("div"+id).innerHTML = xmlhttp.responseText;
			}
		}
		xmlhttp.open('GET', 'reply.php?reply='+reply+'&post_id='+post_id+'&user_id='+user_id+'&time='+time+'&date='+date, true);
		xmlhttp.send();

	}
</script>