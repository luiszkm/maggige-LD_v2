
// Define a type for a companion
interface Guest {
  name: string;
  photoUrl: string;
}

// Define a type for a present
interface Present {
  name: string;
  photoUrl: string;
}

// Define the main structure for the data


interface EventData {
  passwords: password[]
  presentList: Present[];
}

interface password {
  password: string;
  guests: Guest[]
  confirmed: string[]
  present: string[]
  email: string
}