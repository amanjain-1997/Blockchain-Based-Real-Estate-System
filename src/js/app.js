
App = {
  web3Provider: null,
  contracts: {},
  

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: function() {
    App.web3Provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("LandRecord.json", function(data){
      var adoptionArtifact = data;
      App.contracts.adoption = TruffleContract(adoptionArtifact);
      App.contracts.adoption.setProvider(App.web3Provider);
    })
    return App.bindEvents();
  },


  bindEvents: function() {
    $(document).on('click', '.btn-submit', App.storeData);
    $(document).on('click', '.btn-cust', App.retrData);
    $(document).on('click', '.btn-list', App.retrList);
    $(document).on('click', '.btn-acc', App.retrAcc);
    $(document).on('click', '.btn-history', App.propertyhistory);
    $(document).on('click', '.btn-updateowner', App.upown);
    $(document).on('click', '.btn-updateproperty', App.upprop);
    $(document).on('click', '.btn-myproperty', App.displaymyprop);
    $(document).on('click', '.btn-updateprop', App.updatep);
    $(document).on('click', '.btn-details', App.details);
    $(document).on('click', '.btn-ipfs', App.ipfs);
    $(document).on('click', '.btn-updatemongoprop', App.updatemongop);
    $(document).on('click', '.btn-updatemongoimage', App.updatemongoimg);
    // $(document).ready(function() {
    //  alert("Docuement Ready"+ document.body);
    // });
  
  },
  

  displaymyprop: function(event){
    console.log("Hello World you have reached me");
    event.preventDefault();
    
    var list = document.getElementById("products");
      while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }

    var phone="amanjain1483@gmail.com";
    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error.message);
      }
      App.contracts.adoption.deployed().then(function(instance){
        return instance.searchMyProperty.call("amajain1483@gmail.com")
        }).then(function(result){
        var i=0;
        console.log('Land_ID-List'+result);
        for(var i=1;i<result.length;i++){
          fetchbylandid(result[i]);
        } 
 
        function fetchbylandid(result){            
        var landid_arr = result;
        App.contracts.adoption.deployed().then(function(instance){
          return instance.retsearchProperty.call(landid_arr)
          }).then( async function(leresult){
          console.log("Blockchain data"+leresult);      
          let data= await axios.get('/getpropertydata',{
          params: {
          lid: leresult[0]
          }
          });
          imglen=data.data.images.length;
          var $template = $($("#productTemplate").html()); 
          if(imglen==0){
            $template.find("#img").attr("src", "img/properties/notava.jpg");
          }
          else{
            $template.find("#img").attr("src", data.data.images[0]);
          }
          $template.find("#location").html(leresult[1]);
          $template.find("#price").html(leresult[3]);
          $template.find("#publickey").html(leresult[4]);
          $template.find("#status").html(leresult[5]);
          $template.find("#city").html(leresult[6]);
          $template.find("#propertydetails").attr("href", "./editproperty.html?id="+leresult[0]);
          $("#products").append($template);
          });
          } 
          }).catch(function(error){
          console.log(error.message);
          });
      })
  },
  
  storeData: function(event){
    event.preventDefault();
    var land_id=$("#land_id").val();
    var price=$("#price").val();
    var email=$("#email_id").val();
    console.log("emailid" +email);
    var land_name=$("#land_name").val();
    var owner=$("#owner_name").val();
    var status=$("#land_status").val();
    var city=$("#city").val();
    var mobile=$("#mobile_info").val();
    var moreaccess=$("#more_access").val();
    var document=$("#document_hash").val();
    var paddress=$("#paddress").val();
    var atposition=email.indexOf("@");  
    var dotposition=email.lastIndexOf(".");  
    var url = window.location.pathname;
    console.log(url);
    axios.post('/landinsert', {
      land_id,
      document
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    if(land_id=="" ||land_name=="" || paddress==="" || owner=="" ||status=="" ||city=="" ||mobile=="" ||moreaccess=="" ||document==""){
      alert('Please fill in the incomplete fields');
    }
    else if (atposition < 1 || dotposition<atposition+2 || dotposition+2>= email.length){  
     alert("Please enter a valid e-mail address ");   
    }  
    else{
    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error.message);
      }
      App.contracts.adoption.deployed().then(function(instance){
         console.log('hi');
        return instance.storeProperty.sendTransaction(land_id,land_name,paddress,owner,status,city,email,moreaccess,document,price,{from: accounts[0],gas:3000000})
      }).then(function(result){
        console.log('Data Sent Successfully');
        alert('Data Sent Successfully');
      }).catch(function(error){
        console.log(error.message);
      });
    })
  }
  },

  updatemongop: function(event){
    event.preventDefault();
    var desc=$("#desc").val();
    var room=$("#room").val();
    var sqrt=$("#sqrt").val();
    var price=$("#price").val();
    var currenturl = window.location.href	
    currenturl = currenturl.split("=").pop();

    axios.post('/landupdate', {
      currenturl,
      desc,
      room,
      sqrt,
      price
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });  
  },

  updatep: function(event){
    event.preventDefault();
   var newstatus=$("#newstatus").val();
   var newaccess=$("#newaccess").val();
   var currenturl = window.location.href	
   currenturl = currenturl.split("=").pop();

  web3.eth.getAccounts(function(error,accounts){
    if(error){
      console.log(error.message);
    }

    App.contracts.adoption.deployed().then(function(instance){
      return instance.updateProperty.sendTransaction(currenturl,newstatus,newaccess,{from: accounts[0],gas:3000000})
    }).then(function(result){
      alert('Updated Successfully');
    }).catch(function(error){
      console.log(error.message);
    });
    })
  },
  
  upown: function(event){
   event.preventDefault();
   var currentowner=$("#currentowner").val();
   var land_id=$("#land_id").val();
   var paddress= $("#paddress").val();
   var email =$("#email").val();
   web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error.message);
      }
      App.contracts.adoption.deployed().then(function(instance){
        var d = new Date();
        var doc="newDoc";
        return instance.updateOwnership.sendTransaction(currentowner,land_id,paddress,email, doc, d.toString(),{from: accounts[0],gas:3000000})
      }).then(function(result){
        console.log(result);
        alert('Updated Successfully');
      }).catch(function(error){
        console.log(error.message);
      });
    })
  },

  retrData: function(event){
    
    event.preventDefault();
    console.log("Reached");
    var e = document.getElementById("search");
    var sale = e.options[e.selectedIndex].text;
    e = document.getElementById("cityselect");
    var city=e.options[e.selectedIndex].text;
    var landname= document.getElementById("landname").value;
    window.open('./property-list.html?status='+sale+'&city='+city+'&name='+landname,'_self');
  },

  retrList: function(event){
    event.preventDefault();

    var list = document.getElementById("products");
    while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
    }

    var e = document.getElementById("search");
    var sale = e.options[e.selectedIndex].text;
    e = document.getElementById("cityselect");
    var city=e.options[e.selectedIndex].text;
    var landname= document.getElementById("landname").value;
    console.log(landname);

    if(sale=='Status'){
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      sale = urlParams.get('status');
      city = urlParams.get('city');
      landname = urlParams.get('name');
      console.log(sale);
    }
    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error.message);
      }

        App.contracts.adoption.deployed().then(function(instance){
        
          return instance.searchProperty.call(sale)
          }).then(function(result){
           var i=0;
           console.log('Land_ID-List'+result);
           for(var i=1;i<result.length;i++){
              fetchbylandid(result[i]);
          } 
          function fetchbylandid(result){            
          var landid_arr = result;
          
          App.contracts.adoption.deployed().then( function(instance){
          return instance.retsearchProperty.call(landid_arr)
          }).then(async function(leresult){
          console.log("Blockchain data"+leresult);      
              
          if((landname != "") && (city == "City")){
          if((landname == leresult[1]) && (city == leresult[5])){
          console.log("result kept");
          }
          else{
          console.log("result deleted"+j);
          }
          }
          else{
          let data= await axios.get('/getpropertydata',{
          params: {
          lid: leresult[0]
                  }
          });
          imglen=data.data.images.length;
          var $template = $($("#productTemplate").html()); 
          if(imglen==0){
            $template.find("#img").attr("src", "img/properties/notava.jpg");
          }
          else{
            $template.find("#img").attr("src", data.data.images[0]);
          }
          console.log(data.data.images);
          $template.find("#location").html(leresult[1]);
          $template.find("#price").html(leresult[3]);
          $template.find("#publickey").html(leresult[4]);
          $template.find("#status").html(leresult[5]);
          $template.find("#city").html(leresult[6]);
          $template.find("#propertydetails").attr("href", "./property-details.html?id="+leresult[0]);
          $("#products").append($template);
          }
          });
          } 
          }).catch(function(error){
          console.log(error.message);
          });
      })
  },

  details: async function(event){
    event.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    lid = urlParams.get('id');
    let data= await axios.get('/getpropertydata',{
      params: {
        lid: lid
      }
    });
    var imglen=data.data.images.length;
    if(imglen==0){

    $(document).find("#defimg").attr("src", "img/properties/notava.jpg");
    }
    else{
      $(document).find("#defimg").attr("src", data.data.images[0]);

    }
    console.log(data.data.images[1]);
    console.log("Land Id:"+data.data.landid);
    data.data.description = data.data.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
    document.getElementById("descrip").innerHTML = data.data.description = data.data.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
    document.getElementById("rooms").innerHTML = "Number of rooms: "+data.data.rooms;
    document.getElementById("sqrt").innerHTML = "Square feet: "+data.data.sqrt;
    document.getElementById("price").innerHTML = "Price: " + data.data.price;

    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error.message);
      }
     App.contracts.adoption.deployed().then(function(instance){
     return instance.retsearchProperty.call(lid)
     }).then(function(leresult){
     console.log(leresult);
     document.getElementById("publickey").innerHTML = leresult[4];
     document.getElementById("owner").innerHTML = leresult[2];
     document.getElementById("email").innerHTML = leresult[7];
     }).catch(function(error){
     console.log(error.message);
     });
    })
  },

  propertyhistory: function(event){
    event.preventDefault();
    var result = new Array();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    lid = urlParams.get('id');
    App.contracts.adoption.deployed().then( function(instance){
      console.log('hi');
      var i =  instance.Transferred({}, { fromBlock: 0, toBlock: 'latest'
    }).get(async function(error, eventResult) {
        
      if (!error) {
          var chainlen= eventResult.length;
          for(var i=0;i<chainlen;i++){
          if(eventResult[i].args.land_id== lid){
            result.push(eventResult[i].args);
          }
          }
          }
          
          await axios.post('/pdf',{result});
          console.log("Reached here");
          window.open('./output.pdf');


      })
    });
  },
  
  ipfs: function(event){
    event.preventDefault();
    var check=$("#check").val();
    console.log(check);
    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error.message);
      }
      App.contracts.adoption.deployed().then(function(instance){
      return instance.moreView.call(check)
      }).then(function(leresult){
      if(leresult==""){
      alert("Wrong Access Code");
      }
      else
      window.open("https://ipfs.io/ipfs/"+leresult);
      }).catch(function(error){
      console.log(error.message);
      });
    })
  },
};

function A(){
  console.log('Looping here');
  window.setTimeout(function(){
    $('#btn-myproperty').click();
}, 1000);
}

function B(){
  console.log('Looping here');
  window.setTimeout(function(){
    $('#btn-list').click();
}, 1000);
}

function C(){
  console.log('Looping here');
  window.setTimeout(function(){
    $('#btn-details').click();
}, 1000);
}

$(function() {
  $(window).load(function() {
    App.init();
  });
});