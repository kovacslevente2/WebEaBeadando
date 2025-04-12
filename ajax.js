code="DSOCWPefg456";
url="http://gamf.nhely.hu/ajax2/";

async function read() {
  document.getElementById("code").innerHTML="code="+code;
  let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  str="<H1>Read</H1>";
  str+="<p>Rekordok száma: "+data.rowCount+"</p>";
  str+="<p> Utolsó "+data.maxNum+" rekord:</p>";
  str+="<table><tr><th>id</th><th>név</th><th>magasság</th><th>súly</th><th>code</th></tr>";
  
  let totalHeight = 0;
  let maxHeight = 0;
  
  for(let i=0; i<list.length; i++) {
    str += "<tr><td>"+list[i].id+"</td><td>"+list[i].name+"</td><td>"+list[i].height+"</td><td>"+list[i].weight+"</td><td>"+list[i].code+"</td></tr>";
    totalHeight += parseFloat(list[i].height) || 0;
    maxHeight = Math.max(maxHeight, parseFloat(list[i].height) || 0);
  }
  
  str +="</table>";
  
  if (list.length > 0) {
    str += "<h2>Magasság statisztika</h2>";
    str += "<p>Össz magasság: " + totalHeight + "</p>";
    str += "<p>Átlag magasság: " + (totalHeight / list.length).toFixed(2) + "</p>";
    str += "<p>Maximum magasság: " + maxHeight + "</p>";
  }
  
  document.getElementById("readDiv").innerHTML=str;
}

async function create(){
  nameStr = document.getElementById("name1").value;
  height = document.getElementById("height1").value;
  weight = document.getElementById("weight1").value;
  
  if(nameStr.length>0 && nameStr.length<=30 && 
     height.length>0 && height.length<=30 && 
     weight.length>0 && weight.length<=30 && 
     code.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=create&name="+nameStr+"&height="+height+"&weight="+weight
    });
    let data = await response.text(); 
    if(data>0)
      str="Create successful!";
    else
      str="Create NOT successful!";
    document.getElementById("createResult").innerHTML=str;
    document.getElementById("name1").value="";
    document.getElementById("height1").value="";
    document.getElementById("weight1").value="";
    read();
  }
  else
    document.getElementById("createResult").innerHTML="Validation error! All fields must be between 1-30 characters!";
}

async function getDataForId() {
  let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  for(let i=0; i<list.length; i++)
    if(list[i].id==document.getElementById("idUpd").value){
      document.getElementById("name2").value=list[i].name;
      document.getElementById("height2").value=list[i].height;
      document.getElementById("weight2").value=list[i].weight;
    }
}

async function update(){
  id = document.getElementById("idUpd").value;
  nameStr = document.getElementById("name2").value;
  height = document.getElementById("height2").value;
  weight = document.getElementById("weight2").value;
  
  if(id.length>0 && id.length<=30 && 
     nameStr.length>0 && nameStr.length<=30 && 
     height.length>0 && height.length<=30 && 
     weight.length>0 && weight.length<=30 && 
     code.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=update&id="+id+"&name="+nameStr+"&height="+height+"&weight="+weight
    });
    let data = await response.text(); 
    if(data>0)
      str="Update successful!";
    else
      str="Update NOT successful!";
    document.getElementById("updateResult").innerHTML=str;
    document.getElementById("idUpd").value="";
    document.getElementById("name2").value="";
    document.getElementById("height2").value="";
    document.getElementById("weight2").value="";
    read();
  }
  else
    document.getElementById("updateResult").innerHTML="Validation error! All fields must be between 1-30 characters!";
}

async function deleteF(){
  id = document.getElementById("idDel").value;
  if(id.length>0 && id.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=delete&id="+id
    });
    let data = await response.text(); 
    if(data>0)
      str="Delete successful!";
    else
      str="Delete NOT successful!";
    document.getElementById("deleteResult").innerHTML=str;
    document.getElementById("idDel").value="";
    read();
  }
  else
    document.getElementById("deleteResult").innerHTML="Validation error! ID must be between 1-30 characters!";
}

window.onload = function() {
    read();
};