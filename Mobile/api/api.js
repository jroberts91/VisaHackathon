const processContact = (contact) => ({
  name: `${contact.name.first} ${contact.name.last}`,
  phone: contact.phone,
  picture: contact.picture.large,
});

export const fetchUsers = async () => {
  const response = await fetch('https://randomuser.me/api/?results=5&nat=us');
  const {results} = await response.json();
  return results.map(processContact);
};
