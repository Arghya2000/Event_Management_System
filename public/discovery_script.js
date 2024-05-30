var array=[
{
	id:"1",
	title:"Wedding",
	location:"Kolkata",
	date_time:"2010-10-10 10:10:00",
	ticket_price:"1000",
	description:"wedding"
},
{
	id:"2",
	title:"Anniversary",
	location:"Delhi",
	date_time:"2020-10-20 12:12:00",
	ticket_price:"2000",
	description:"anniversary"
},{
	id:"3",
	title:"Birthday",
	location:"Mumbai",
	date_time:"2010-10-30 11:11:00",
	ticket_price:"1500",
	description:"birthday"
},{
	id:"4",
	title:"Sports Event",
	location:"Kolkata",
	date_time:"2024-10-14 10:10:00",
	ticket_price:"5000",
	description:"sports"
}
// ,{
// 	id:"5",
// 	title:"love",
// 	location:"ahmedabad",
// 	date:"2024-10-14 10:10:00",
// 	ticket_price:"5000",
// 	description:"birthday"
// },
]

// show table data
function showtable(curarray) {
	document.getElementById("mytable").innerHTML =`
	<tr class="table_head_design">
	  <td>ID</td>
	  <td>Title</td>
	  <td>Location</td>
	  <td>Date & Time</td>
	  <td>Ticket Price</td>
	  <td>Description</td>
	</tr>
	`;

	//for checking array is empty
	if(curarray==""){
		document.getElementById("error").innerHTML=`<span class="text-danger">Not Found!</span>`
	}
	else{
		document.getElementById("error").innerHTML="";

		for(var i=0;i<curarray.length;i++){
			document.getElementById("mytable").innerHTML +=`
			<tr>
			<td>${curarray[i].id}</td>
			<td>${curarray[i].title}</td>
			<td>${curarray[i].location}</td>
			<td>${curarray[i].date_time}</td>
			<td>${curarray[i].ticket_price}</td>
			<td>${curarray[i].description}</td>
			</tr>
			`
		}
	}


}

//calling show table data method
showtable(array);

//take filtered data array
var newarray = [];

//for searching method
document.getElementById("search").addEventListener("keyup",function(){
	var search=this.value.toLowerCase();
	newarray=array.filter(function(val){
		if (val.id.includes(search) || val.title.includes(search) || val.location.includes(search) || val.date_time.includes(search) || val.ticket_price.includes(search) || val.description.includes(search)){
			var newobj={id : val.id, title : val.title, location : val.location, date_time : val.date_time, ticket_price : val.ticket_price, description : val.description};
			return newobj;
		}
	})

	showtable(newarray);
})
