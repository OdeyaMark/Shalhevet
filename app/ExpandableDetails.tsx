


const DetailsCard = ({ contact }) => {
  return (
    
        <div>
          <div className="font-medium">{contact.location === 'Israel'? "Israeli Participant": "Diasphora Participant" } {contact.name}</div>
          <div className="text-sm">Email: {contact.email}</div>
          <div className="text-sm">Phone: {contact.phone}</div>
          <div className="text-sm">Location: {contact.location}</div>
        </div>
  );
}

const ExpandableDetails = ({ contact1, contact2 }) => {
  console.log(contact1, contact2);
  return (
    <tr className="bg-gray-50 ">
      <td className="px-4 py-4 flex w-auto">
    
          {/* Israeli Participant Details */}
          <div className="bg-teal-600 rounded-lg p-4 text-white mr-10 ml-10">
        
              <DetailsCard contact={contact1} />
          </div>
          
          {/* Diaspora Participant Details */}
          <div className="bg-teal-600 rounded-lg p-4 text-white mr-10 ml-10">
  
              <DetailsCard contact={contact2} />
            </div>
  
      </td>
    </tr>
  );
};

export default ExpandableDetails;