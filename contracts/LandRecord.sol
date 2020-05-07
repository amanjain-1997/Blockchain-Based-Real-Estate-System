pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract LandRecord
{
    uint i=0;
    uint j=0;
    uint k=0;
    uint z=0;
    uint insertcount=0;
    string[20] Land_id;
    string[20] Land_name;
    string[20] Owner;
    string[20] paddress;
    string[20] status;
    string[20] city;
    string[20] phone;
    string[20] moreAccess;
    string[20] documents;
    string[20] price;
    
    string[] Land_id_arr;
    string[] Land_name_arr;
    string[] Owner_arr;
    string[] paddress_arr;
    string[] status_arr;
    string[] city_arr;
    string[] phone_arr;
    string[] moreAccess_arr;
    string[] documents_arr;
    string[] price_arr;

    event Transferred(string land_id, string current_owner, string current_paddress,string new_owner ,string new_paddress, string d );
    
    
    
    
    function storeProperty(string memory _Land_id,string memory _Land_name,string memory _paddress, string memory _Owner,string memory _status, string memory _city, string memory _phone,string memory _moreAccess,string memory _documents,string memory _price) public {
        
        Land_id[z]= _Land_id;
        Land_name[z] = _Land_name;
        paddress[z] = _paddress;
        Owner[z] = _Owner;
        status[z] = _status;
        city[z] = _city;
        phone[z] = _phone;
        moreAccess[z]= _moreAccess;
        documents[z]= _documents;
        price[z]= _price;

        z++;
        
        insertcount++;
    }    
    
    function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
		bytes storage a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;

		for (i = 0; i < a.length; i ++)
			if (a[i] != b[i])
				return false;
		return true;
	}
	
	
	

        
function searchProperty(string memory _status) public returns(string [] memory){
delete Land_id_arr;
   delete Land_name_arr;
    delete Owner_arr;
   delete paddress_arr;
    delete status_arr;
    delete city_arr;
   delete phone_arr;
   delete moreAccess_arr;
    delete documents_arr;   
for(j=0;j<insertcount;j++)
{

if(stringsEqual(status[j],_status))
{
    Land_id_arr.push(Land_id[j]);
   
}


}

Land_id_arr.push(Land_id[j]);

return (Land_id_arr);
}

function searchMyProperty(string memory _phone) public returns(string [] memory){
delete Land_id_arr;
   delete Land_name_arr;
    delete Owner_arr;
   delete paddress_arr;
    delete status_arr;
    delete city_arr;
   delete phone_arr;
   delete moreAccess_arr;
    delete documents_arr;   
for(j=0;j<insertcount;j++)
{

if(stringsEqual(phone[j],_phone))
{
Land_id_arr.push(Land_id[j]);

   
}

}
Land_id_arr.push(Land_id[j]);
return (Land_id_arr);
}

function accDetails(string memory _Owner) public returns(string [] memory){
 delete Land_id_arr;
   delete Land_name_arr;
    delete Owner_arr;
   delete paddress_arr;
    delete status_arr;
    delete city_arr;
   delete phone_arr;
   delete moreAccess_arr;
    delete documents_arr;
    
for(j=0;j<insertcount;j++)
{
if(stringsEqual(Owner[j],_Owner))
{
    Land_id_arr.push(Land_id[j]);
    Land_name_arr.push(Land_name[j]);
    paddress_arr.push(paddress[j]);
    status_arr.push(status[j]);
    city_arr.push(city[j]);
    phone_arr.push(phone[j]);
    moreAccess_arr.push(moreAccess[j]);
    documents_arr.push(documents[j]);
    price_arr.push(price[j]);


}

}

return (Land_id_arr);

}

function retsearchProperty(string memory _landid) public returns(string memory,string memory,string memory,string memory,string memory,string memory,string memory,string memory){

    
for(j=0;j<insertcount;j++)
{

if(stringsEqual(Land_id[j],_landid))
{
return (Land_id[j],Land_name[j],Owner[j],price[j],paddress[j],status[j],city[j],phone[j]);
}

}


}

function retaccDetails(string memory _landid) public returns(string memory,string memory,string memory,string memory,string memory,string memory,string memory,string memory){

    
for(j=0;j<insertcount;j++)
{

if(stringsEqual(Land_id[j],_landid))
{
return (Land_id[j],Land_name[j],paddress[j],status[j],city[j],phone[j],moreAccess[j],documents[j]);

}
}

}
function updateProperty(string memory _landid,string memory _status,string memory _moreAccess) public{

    
for(j=0;j<insertcount;j++)
{

 
    if(stringsEqual(Land_id[j],_landid)){
        status[j] = _status;
        moreAccess[j] = _moreAccess; 
    }


}
}

function updateOwnership(string memory _Owner,string memory _landid, string memory _paddress,  string memory _phone,string memory _document, string memory _d) public{

    
for(j=0;j<insertcount;j++)
{
     if(stringsEqual(Land_id[j],_landid)){
    
    emit Transferred(_landid, Owner[j], paddress[j] , _Owner , _paddress,_d);

               Owner[j]=_Owner;
               paddress[j]=_paddress;
               documents[j]=_document;
               phone[j]=_phone;
           }
}



}
function moreView(string memory _moreAccess) public returns(string memory){

    
for(j=0;j<insertcount;j++)
{

if(stringsEqual(moreAccess[j],_moreAccess))
{
    return (documents[j]);
}

}
}

         
}